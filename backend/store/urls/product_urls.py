from django.urls import path
from store.views import product_views as views

urlpatterns = [
	path('', views.ProductList.as_view(), name='products'),
]
