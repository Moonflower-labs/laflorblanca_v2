from django.shortcuts import get_object_or_404

import logging

from .stripe_initializer import stripe
from members.models import User, Plan, Membership

# Configure the root logger
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)


class StripeEventHandler:
    def get_user_by_customer_id(self, customer_id):
        """Retrieve a user based on the customer_id."""
        return get_object_or_404(User, customer_id=customer_id)

    def handle_customer_created(event):
        customer = event.data.object
        customer_id = customer['id']
        email = customer.email
        user = get_object_or_404(User, email=email)
        user.customer_id = customer_id
        user.save()
        logger.info(f"Customer id for {user.username} saved.")

    def handle_payment_intent_succeeded(event):
        payment_intent = event.data.object  # contains a stripe.PaymentIntent
        # TODO: retrieve order_number from metadata, update order status to complete and send email.
        # print(payment_intent)

    def handle_payment_method_attached(event):
        payment_method = event.data.object    # contains a stripe.PaymentMethod
        # print(payment_method)

    """  Store the product.id, subscription.id, and subscription.status """

    def handle_customer_subscription_created(self, event):
        subscription = event.data.object
        subscription_plan = stripe.Product.retrieve(
            subscription.plan.product)
        new_plan, created = Plan.objects.get_or_create(
            name=subscription_plan.name, price_id=subscription.plan.id, description=subscription_plan.description)
        user = self.get_user_by_customer_id(subscription.customer)

        if not Membership.objects.filter(user=user).exists():
            # Create a new membership for the user
            membership = Membership.objects.create(
                user=user,
                status=subscription.status,
                plan=new_plan,
                subscription_id=subscription.id
                # Add other fields as needed
            )
            membership.save()
            logger.info(f"new membership created for {user.username}")
        else:
            logger.info(f"Membership for {user.username} already exists.")
        # print('subscription.id ', subscription.id)
        # print('subscription.status ', subscription.status)
        # print('subscription.customer ', subscription.customer)

    def handle_customer_subscription_updated(self, event):
        subscription = event.data.object
        subscription_plan = stripe.Product.retrieve(
            subscription.plan.product)
        updated_plan, created = Plan.objects.get_or_create(
            name=subscription_plan.name,
            price_id=subscription.plan.id,
            description=subscription_plan.description
        )
        user = self.get_user_by_customer_id(subscription.customer)
        try:
            # Attempt to get the existing membership for the user
            membership = Membership.objects.get(user=user)
            # Update the existing membership with the new plan
            membership.plan = updated_plan
            membership.status = subscription.status  # Update the status
            membership.subscription_id = subscription.id
            # Update other fields as needed
            membership.save()
            logger.info(f"Updated membership for user {user.username}")
        except Membership.DoesNotExist:
            # If no membership exists, create a new membership for the user
            new_membership = Membership.objects.create(
                user=user,
                status=subscription.status,
                plan=updated_plan,
                subscription_id=subscription.id)
            new_membership.save()
            logger.info(f"new membership created for user {user.username}")

    def handle_customer_subscription_deleted(self, event):
        subscription = event.data.object
        user = self.get_user_by_customer_id(subscription.customer)
        try:
            membership = Membership.objects.get(user=user)
            # Delete the membership
            membership.delete()
            logger.info(f"Membership for {user.username} deleted.")
        except Membership.DoesNotExist:
            logger.info(f"No membership found for {user.username}")


# Usage:
# StripeEventHandler.Customer.handle_subscription_created(event)
# StripeEventHandler.Payments.handle_payment_intent_succeeded(event)
