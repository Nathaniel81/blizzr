from django.urls import path
from store.views import product_views as views

urlpatterns = [
	path('', views.ProductList.as_view(), name='products'),
	path('detail/<str:pk>/', views.ProductDetail.as_view(), name='product-detail'),
	path('<str:pk>/review/', views.CreateProductReviewView.as_view(), name="create-review"),

 
]
