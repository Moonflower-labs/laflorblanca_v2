import logging
from django.db import transaction
from .models import *


logger = logging.getLogger(__name__)


class OrderManager:
    def create_order(self, order_number, items_data):
        with transaction.atomic():
            existing_items = self._get_existing_items(items_data)
            items_to_create_instances = self._get_items_to_create(
                existing_items, items_data)
            self._create_new_items(items_to_create_instances)

            order = self._create_order(order_number)
            self._create_order_items(order, existing_items, items_data)

    def update_order(self, order_number, items_data):
        try:
            order = Order.objects.get(order_number=order_number)
            with transaction.atomic():
                existing_items = self._get_existing_items(items_data)
                new_items_to_create = self._get_new_items_to_create(
                    existing_items, items_data)
                self._create_new_items(new_items_to_create)

                self._remove_and_create_order_items(
                    order, existing_items, items_data)
        except Order.DoesNotExist:
            logger.error(
                f" Order {order_number} does not exist. Unable to update.")

    def _get_existing_items(self, items_data):
        item_price_ids = [item['id'] for item in items_data]
        return Item.objects.filter(price_id__in=item_price_ids)

    def _get_items_to_create(self, existing_items, items_data):
        existing_items_price_ids = {item.price_id for item in existing_items}
        return [Item(name=item['name'], price_id=item['id'], description=item.get('description', ''))
                for item in items_data if item['id'] not in existing_items_price_ids]

    def _create_new_items(self, items_to_create_instances):
        if items_to_create_instances:
            Item.objects.bulk_create(items_to_create_instances)
            logger.info(f" {len(items_to_create_instances)} New items created")

    def _create_order(self, order_number):
        try:
            order = Order.objects.create(order_number=order_number)
            logger.info(f" Order {order_number} created")
            return order

        except Exception as e:
            logger.error(f" Error creating the order: {str(e)}")

    def _create_order_items(self, order, existing_items, items_data):
        order_items_instances = []
        existing_items_dict = {item.price_id: item for item in existing_items}

        for item_data in items_data:
            price_id = item_data['id']
            if price_id in existing_items_dict:
                item_instance = existing_items_dict[price_id]
            else:
                item_instance = Item.objects.get(price_id=price_id)

            order_item = OrderItem(order=order, item=item_instance,
                                   quantity=item_data['quantity'], price=item_data['amount'])
            order_items_instances.append(order_item)

        if order_items_instances:
            OrderItem.objects.bulk_create(order_items_instances)
            logger.info(" OrderItems bulk created")

    def _get_new_items_to_create(self, existing_items, items_data):
        existing_items_dict = {item.price_id: item for item in existing_items}
        return [Item(name=item['name'], price_id=item['id'], description=item.get('description', ''))
                for item in items_data if item['id'] not in existing_items_dict]

    def _remove_and_create_order_items(self, order, existing_items, items_data):
        new_items_to_create = self._get_new_items_to_create(
            existing_items, items_data)
        if new_items_to_create:
            Item.objects.bulk_create(new_items_to_create)
            logger.info(f" {len(new_items_to_create)} New items created")

        order.order_items.all().delete()
        logger.info(" Order items deleted")

        self._create_order_items(order, existing_items, items_data)


def create_order(order_number, items_data):
    item_price_ids = [item['id'] for item in items_data]

    existing_items = Item.objects.filter(price_id__in=item_price_ids)
    # Use price id as a unique key
    existing_items_price_ids = [item.price_id for item in existing_items]

    items_to_create_instances = [
        Item(name=item['name'], price_id=item['id'],
             description=item.get('description', ''))
        for item in items_data if item['id'] not in existing_items_price_ids
    ]

    with transaction.atomic():
        if items_to_create_instances:
            # Create the Items
            Item.objects.bulk_create(items_to_create_instances)
            existing_items = Item.objects.filter(price_id__in=item_price_ids)

            logger.info(f" {len(items_to_create_instances)} New items created")
        try:
            # Attempt to create the order
            order = Order.objects.create(order_number=order_number)
            logger.info(f"Order {order_number} created")
        except Exception as e:
            logger.error(f" Error creating the order: {str(e)}")

        # Create OrderItems for all items
        order_items_instances = []
        # Create a dictionary using price_id as the key
        existing_items_dict = {item.price_id: item for item in existing_items}
        for item_data in items_data:
            price_id = item_data['id']

            if price_id in existing_items_dict:
                # Fetch the Item instance using the price_id
                item_instance = existing_items_dict[price_id]
                order_item = OrderItem(
                    order=order,
                    item=item_instance,
                    quantity=item_data['quantity'],
                    price=item_data['amount']
                )
                order_items_instances.append(order_item)
        # Bulk create OrderItems
        if order_items_instances:
            OrderItem.objects.bulk_create(order_items_instances)
            logger.info(" OrderItems bulk created")


def update_order(order_number, items_data):
    try:
        order = Order.objects.get(order_number=order_number)
        logger.info(
            f" Order {order_number} already exists. Updating the order.")

        item_price_ids = [item['id'] for item in items_data]

        existing_items = Item.objects.filter(price_id__in=item_price_ids)
        existing_items_dict = {item.price_id: item for item in existing_items}

        new_items_to_create = [
            Item(name=item['name'], price_id=item['id'],
                 description=item.get('description', ''))
            for item in items_data if item['id'] not in existing_items_dict
        ]
        logger.info(
            f" new_items_to_create {new_items_to_create} ")
        with transaction.atomic():
            if new_items_to_create:
                # Create the new items
                Item.objects.bulk_create(new_items_to_create)
                logger.info(f"{len(new_items_to_create)} New items created")

            # Remove existing order items to be updated
            order.order_items.all().delete()
            logger.info(" order items deleted")

            order_items_instances = [
                OrderItem(
                    order=order,
                    item=existing_items_dict[item_data['id']] if item_data['id'] in existing_items_dict else Item.objects.get(
                        price_id=item_data['id']),
                    quantity=item_data['quantity'],
                    price=item_data['amount']
                )
                for item_data in items_data
            ]
            logger.info(f" {len(order_items_instances)
                            } Order items to creates")
            # Bulk create the updated order items
            if order_items_instances:
                OrderItem.objects.bulk_create(order_items_instances)
                logger.info(" OrderItems bulk updated")

    except Order.DoesNotExist:
        logger.error(
            f" Order {order_number} does not exist. Unable to update.")
