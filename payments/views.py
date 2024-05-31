from django.shortcuts import get_object_or_404, render
from django.views import View
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
from django.http import HttpResponse, JsonResponse
from rest_framework.response import Response
from rest_framework.views import APIView
from concurrent.futures import ThreadPoolExecutor
import json
import os
import uuid
from .stripe_initializer import stripe
import logging

from members.models import Plan
from .handlers import *
from .serializers import *
from .utils import create_order, update_order, OrderManager

# Create your views here.
logger = logging.getLogger(__name__)
logging.basicConfig(level=logging.INFO)

executor = ThreadPoolExecutor(max_workers=10)


class ProductsView(View):
    def get(self, request, *args, **kwargs):

        # products = stripe.Product.list(limit=10)
        # # products = stripe.Product.search(
        # #     query=" metadata['app']:'florblanca'")

        # logger.info(products)
        # order = Order.objects.all()
        print('request.LANGUAGE_CODE ', request.LANGUAGE_CODE)
        print(request.META['HTTP_ACCEPT_LANGUAGE'])
        order = get_object_or_404(Order,
                                  order_number='order_1df2c33640a84af79780b787bd986a19 ')
        o = OrderSerializer(order).data
        return JsonResponse(o, safe=False)


class ProductPriceListView(APIView):
    permission_classes = []

    def get(self, request, *args, **kwargs):
        product_data_list = stripe.Product.search(
            query="active:'true' AND metadata['app']:'florblanca'")
        price_data_list = stripe.Price.list(limit=100)

        product_map = {
            product_data['id']: product_data for product_data in product_data_list}
        price_map = {}
        for price_data in price_data_list:
            if price_data['product'] in price_map:
                price_map[price_data['product']].append(price_data)
            else:
                price_map[price_data['product']] = [price_data]
        # print(price_map)
        merged_data_list = []
        for product_id, product_data in product_map.items():
            if product_id in price_map:
                product_serializer = ProductSerializer(data=product_data)
                price_serializer = PriceSerializer(
                    data=price_map[product_id], many=True)

                if product_serializer.is_valid() and price_serializer.is_valid():
                    merged_data = {
                        'product': product_serializer.data,
                        'prices': price_serializer.data  # Use 'prices' instead of 'price'
                    }
                    merged_data_list.append(merged_data)
                else:
                    errors = {}
                    if not product_serializer.is_valid():
                        errors.update(product_serializer.errors)
                    if not price_serializer.is_valid():
                        errors.update(price_serializer.errors)
                    return Response(errors, status=400)
            else:
                # Handle the case where prices are not found for a product
                # You can skip the product or handle this scenario based on your requirements
                pass

        merged_serializer = ProductPriceSerializer(
            data=merged_data_list, many=True)  # Set many=True
        if merged_serializer.is_valid():
            return Response(merged_serializer.data)
        else:
            # print(merged_serializer.errors)
            return Response(merged_serializer.errors, status=400)


class PaymentIntentView(View):
    def __init__(self):
        self.order_manager = OrderManager()
        super(PaymentIntentView, self).__init__()

    def calculate_order_amount(self, items, discount=None):
        total_amount = sum(item.get("quantity", 0) *
                           item.get("amount", 0) for item in items)

        if discount is not None:
            discounted_amount = total_amount - (total_amount * discount / 100)
            return discounted_amount
        else:
            return total_amount

    def create_payment_intent(self, amount, order_number):
        intent = stripe.PaymentIntent.create(
            amount=amount,
            currency='gbp',
            automatic_payment_methods={
                'enabled': True,
            },
            metadata={
                'order_number': order_number,
            }
        )
        return intent

    def update_payment_intent(self, payment_intent_id, items):
        intent = stripe.PaymentIntent.modify(
            payment_intent_id,
            amount=self.calculate_order_amount(items),
        )
        return intent

    def post(self, request, *args, **kwargs):
        try:
            data = json.loads(request.body)
            order_number = f"order_{uuid.uuid4().hex}"

            # Create a new PaymentIntent
            new_intent = self.create_payment_intent(
                self.calculate_order_amount(data['items']), order_number)

            # * Call create order in background
            executor.submit(
                self.order_manager.create_order, order_number, data['items'])
            # executor.submit(create_order, order_number, data['items'])
            return JsonResponse({
                'clientSecret': new_intent.client_secret,
                'amount': new_intent.amount,
                'id': new_intent.id
            })
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=403)

    def patch(self, request, *args, **kwargs):
        try:
            data = json.loads(request.body)

            if 'paymentIntentId' in data:
                # Update the existing PaymentIntent with the provided PaymentIntent ID
                updated_intent = self.update_payment_intent(
                    data['paymentIntentId'], data['items'])

                # * Call update order in background
                executor.submit(
                    self.order_manager.update_order, updated_intent.metadata.order_number, data['items'])
                # executor.submit(
                #     update_order, updated_intent.metadata.order_number, data['items'])
                return JsonResponse({
                    'clientSecret': updated_intent.client_secret,
                    'amount': updated_intent.amount,
                })
            else:
                return JsonResponse({'error': 'PaymentIntentId not provided for update'}, status=400)
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=403)


#  Create a customer
class CustomerView(View):
    def get(self, request, *args, **kwargs):

        products = stripe.Product.list(limit=10)
        # products = stripe.Product.search(
        #     query=" metadata['app']:'florblanca'")
        # products = stripe.Product.search(
        #     query="active:'true' AND metadata['app']:'florblanca'")
        logger.info(products)
        return JsonResponse(products)

    def post(self, request, *args, **kwargs):

        user = kwargs.get("user")
        print(f'creating user {user.username}')
        try:
            cust = stripe.Customer.create(
                email=user.email,
                name=user.username,
            )
            print(cust)
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=400)


class SubscriptionView(View):
    """create, update and cancel a subscription"""

    def get(self, request, *args, **kwargs):
        subscription_id = request.GET.get('subscriptionId')

        if not subscription_id:
            return JsonResponse({'error': 'Missing subscription ID'}, status=400)
        try:
            subscription = stripe.Subscription.retrieve(subscription_id)
            invoice = stripe.Invoice("in_1PFHqNAEZk4zaxmw6Rt3JKAQ")
            return JsonResponse({'subscription': subscription, 'invoice': invoice})

        except Exception as e:
            return JsonResponse({'error': str(e)}, status=400)

    def post(self, request, *args, **kwargs):

        if not request.user.is_authenticated:
            return JsonResponse({'error': 'You must login to buy a subscription'}, status=403)
        data = json.loads(request.body)
        customer_id = request.user.customer_id

        price_id = data['priceId']

        try:
            # Create the subscription. Note we're expanding the Subscription's
            # latest invoice and that invoice's payment_intent
            # so we can pass it to the front end to confirm the payment
            subscription = stripe.Subscription.create(
                customer=customer_id,
                items=[{
                    'price': price_id,
                }],
                payment_behavior='default_incomplete',
                payment_settings={
                    'save_default_payment_method': 'on_subscription'},
                expand=['latest_invoice.payment_intent'],

            )

            return JsonResponse({'subscriptionId': subscription.id, 'clientSecret': subscription.latest_invoice.payment_intent.client_secret})

        except Exception as e:
            return JsonResponse({'error': str(e)}, status=400)

    def delete(self, request, *args, **kwargs):
        """cancel a subscription"""
        data = json.loads(request.data)
        try:
            # Cancel the subscription by deleting it
            deletedSubscription = stripe.Subscription.delete(
                data['subscriptionId'])
            return JsonResponse({deletedSubscription})
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=403)


@method_decorator(csrf_exempt, name='dispatch')
class WebhookView(View):
    def post(self, request, *args, **kwargs):
        webhook_secret = os.getenv('WEBHOOK_SIGNING_SECRET')
        payload = request.body
        sig_header = request.META['HTTP_STRIPE_SIGNATURE']
        event = None

        try:
            event = stripe.Webhook.construct_event(
                payload, sig_header, webhook_secret
            )
        except ValueError as e:
            # Invalid payload
            logger.error('Error parsing payload: {}'.format(str(e)))
            return HttpResponse(status=400)

        except stripe.error.SignatureVerificationError as e:
            # Invalid signature
            logger.error(
                'Error verifying webhook signature: {}'.format(str(e)))
            return HttpResponse(status=400)

        event_handler = StripeEventHandler()
        # Handle the event
        if event.type == 'customer.created':
            event_handler.handle_customer_created(event)
        if event.type == 'payment_intent.succeeded':
            payment_intent = event.data.object
            # print(payment_intent)
            # contains a stripe.PaymentIntent
            # Then define and call a method to handle the successful payment intent.
            # handle_payment_intent_succeeded(payment_intent)
        elif event.type == 'payment_method.attached':
            payment_method = event.data.object  # contains a stripe.PaymentMethod
            # print(payment_method)
            # Then define and call a method to handle the successful attachment of a PaymentMethod.
            # handle_payment_method_attached(payment_method)
        # ... handle other event types

        elif event.type == 'customer.subscription.created':
            subscription = event.data.object
            # Store the product.id, subscription.id and subscription.status along with the customer.id.
            # Check this record when determining which features to enable for the user in your application.
            event_handler.handle_customer_subscription_created(event)
        elif event.type == 'customer.subscription.updated':
            subscription = event.data.object
            event_handler.handle_customer_subscription_updated(event)
        elif event.type == 'customer.subscription.deleted':
            subscription = event.data.object

        else:
            logger.info('Unhandled event type {}'.format(event.type))

        return HttpResponse(status=200)
#  stripe.Customer.create(
#                 email=email,
#                 name=name,
#                 shipping={
#                     "address": {
#                         "city": "Brothers",
#                         "country": "US",
#                         "line1": "27 Fredrick Ave",
#                         "postal_code": "97712",
#                         "state": "CA",
#                     },
#                     "name": name,
#                 },
#                 address={
#                     "city": "Brothers",
#                     "country": "US",
#                     "line1": "27 Fredrick Ave",
#                     "postal_code": "97712",
#                     "state": "CA",
#                 },
#
#             )
