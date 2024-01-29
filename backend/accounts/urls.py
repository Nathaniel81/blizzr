from django.urls import path
from . import views
# from rest_framework_simplejwt.views import (
#     TokenObtainPairView,
#     TokenRefreshView,
# )
    
urlpatterns = [
    path('', views.GetAllUsers.as_view(), name='users'),
    path('delete/<str:pk>/', views.DeleteUserView.as_view(), name='user-delete'),
    # path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    # path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('login', views.MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('register', views.RegistrationView.as_view(), name='register'),
    
    path('profile', views.GetUserProfile.as_view(), name='user-profile'),
    path('update', views.UpdateUserProfile.as_view(), name='update-profile'),
    path('update/<str:pk>/', views.UpdateUserView.as_view(), name='user-update'),
    path('<str:pk>/', views.GetUserByIdView.as_view(), name='user'),

]
