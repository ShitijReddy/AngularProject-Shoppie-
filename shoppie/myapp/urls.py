from django.urls import path

from myapp import views
from myapp.views import usersignup,userlogin
urlpatterns = [
    # Product endpoints
    path('api/products/', views.product_list, name='product_list'),
    path('api/products/<str:pk>/', views.product_detail, name='product_detail'),

    # # Order endpoints
    path('api/orders/', views.order_list, name='order_list'),
    path('api/orders/<str:pk>/', views.order_detail, name='order_detail'),

    # # User endpoints
    # path('api/users/', views.user_list, name='user_list'),
    # path('api/users/<str:pk>/', views.user_detail, name='user_detail'),

    # # Review endpoints
    path('api/reviews/', views.review_list, name='review_list'),
    path('api/reviews/<str:pk>/', views.review_detail, name='review_detail'),

    # User Endpoints
    path('api/signup/',views.usersignup,name='usersignup'),
    path('api/login/',views.userlogin,name='userlogin'),
]
