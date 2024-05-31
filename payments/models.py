from django.db import models


class Order(models.Model):
    class StatusChoices(models.TextChoices):
        INCOMPLETE = 'incomplete', 'Incomplete'
        CANCELED = 'canceled', 'Canceled'
        COMPLETE = 'complete', 'Complete'
    order_number = models.CharField(max_length=100, unique=True)
    status = models.CharField(max_length=30, default=StatusChoices.INCOMPLETE)
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = 'Pedido'

    def __str__(self):
        return f"{self.order_number}"


class Item(models.Model):
    name = models.CharField(max_length=100)
    price_id = models.CharField(max_length=100, unique=True)
    out_of_stock = models.BooleanField(default=False)
    description = models.TextField()

    class Meta:
        verbose_name = 'Artículo'

    def __str__(self):
        return f"{self.name}"


class OrderItem(models.Model):
    order = models.ForeignKey(
        Order, on_delete=models.CASCADE, related_name='order_items')
    item = models.ForeignKey(
        Item, on_delete=models.CASCADE, related_name='order_items')
    quantity = models.PositiveIntegerField()
    price = models.PositiveIntegerField()

    class Meta:
        verbose_name = 'Artículos de pedido'
        verbose_name_plural = 'Artículos de pedido'

    def __str__(self):
        return f"{self.order} - {self.item} - {self.quantity}"
