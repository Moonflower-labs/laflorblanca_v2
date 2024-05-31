from django.urls import include, path


from .views import *


urlpatterns = [
    path('create-payment-intent/', PaymentIntentView.as_view()),
    path('subscriptions/', SubscriptionView.as_view()),
    path('customers/', CustomerView.as_view()),
    path('products/', ProductPriceListView.as_view()),
    path('test/', ProductsView.as_view()),
    path('webhooks/', WebhookView.as_view()),

]
