from django.contrib import admin
from .models import *


# You can also use StackedInline for a different display style
class OrderItemInline(admin.TabularInline):
    model = OrderItem
    extra = 0  # Controls the number of empty forms to display


class OrderAdmin(admin.ModelAdmin):
    inlines = [OrderItemInline]


admin.site.register(OrderItem)
admin.site.register(Item)
admin.site.register(Order, OrderAdmin)
