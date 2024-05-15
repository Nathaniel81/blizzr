from django.urls import path
from store.views import order_views as views


urlpatterns = [

    path('', views.GetOrdersView.as_view(), name='orders'),
    path('add/', views.AddOrderItemsView.as_view(), name='orders-add'),
    path('myorders', views.GetMyOrdersView.as_view(), name='myorders'),
    path('<str:pk>/deliver', views.UpdateOrderToDeliverdView.as_view(), name='order-delivered'),
    path('<str:pk>/', views.GetOrderView.as_view(), name='user-order'),
    path('<str:pk>/pay', views.UpdateOrderToPaidView.as_view(), name='pay'),
]
