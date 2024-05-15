from django.urls import path
from store.views import product_views as views

urlpatterns = [
	path('', views.ProductList.as_view(), name='products'),
	path('detail/<str:pk>/', views.ProductDetail.as_view(), name='product-detail'),
	path('<str:pk>/review/', views.CreateProductReviewView.as_view(), name="create-review"),
    path('create/', views.CreateProductView.as_view(), name="product-create"),
 
    path('delete/<str:pk>/', views.DeleteProductView.as_view(), name="product-delete"),
	path('update/<str:pk>/', views.UpdateProductView.as_view(), name="product-update"),
	path('upload/', views.UploadImageView.as_view(), name="image-upload"),
    path('categories/', views.CategoryListView.as_view(), name="categories"), 
    path('top/', views.TopProductsAPIView.as_view(), name="top-products"), 
]
