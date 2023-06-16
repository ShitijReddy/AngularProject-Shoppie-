import uuid
from django.forms import model_to_dict
from django.shortcuts import get_object_or_404
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.http import HttpResponse
from .models import Product, Order, Review
from rest_framework.views import APIView
from rest_framework.decorators import api_view
from myapp.serializers import ShoppieUserSerializer, ProductSerializer, OrderSerializer, ReviewSerializer
from myapp.models import ShoppieUser
from rest_framework import status
# @csrf_exempt
# def product_list(request):
#     if request.method == 'GET':
#         products = Product.objects.all()
#         data = {'products': list(products.values())}
#         return JsonResponse(data)

#     elif request.method == 'POST':
#         data = {
#             'prodName': request.POST.get('prodName'),
#             'prodDesc': request.POST.get('prodDesc'),
#             'image': request.POST.get('image'),
#             'sideImg': request.POST.get('sideImg'),
#             'price': request.POST.get('price'),
#             'quant': request.POST.get('quant'),
#             'id': request.POST.get('id'),
#             'category': request.POST.get('category'),
#             'custName': request.POST.get('custName'),
#             'vendorName': request.POST.get('vendorName'),
#             'tags': request.POST.get('tags'),
#         }
#         product = Product.objects.create(**data)
#         return JsonResponse({'message': 'Product created successfully', 'product': model_to_dict(product)})


@csrf_exempt
def product_detail(request, pk):
    product = get_object_or_404(Product, pk=pk)

    if request.method == 'GET':
        data = {'product': model_to_dict(product)}
        return JsonResponse(data)

    elif request.method == 'PUT':
        data = {
            'prodName': request.POST.get('prodName'),
            'prodDesc': request.POST.get('prodDesc'),
            'image': request.POST.get('image'),
            'sideImg': request.POST.get('sideImg'),
            'price': request.POST.get('price'),
            'quant': request.POST.get('quant'),
            'id': request.POST.get('id'),
            'category': request.POST.get('category'),
            'custName': request.POST.get('custName'),
            'vendorName': request.POST.get('vendorName'),
            'tags': request.POST.get('tags'),
        }
        for key, value in data.items():
            setattr(product, key, value)
        product.save()
        return JsonResponse({'message': 'Product updated successfully'})

    elif request.method == 'DELETE':
        product.delete()
        return JsonResponse({'message': 'Product deleted successfully'})


@api_view(['GET','POST'])
def order_list(request):
    if request.method == 'GET':
        orders = Order.objects.all().values()
        return JsonResponse(list(orders), safe=False)

    if request.method == 'POST':
        orderserializer = OrderSerializer(data = request.data)
        if(orderserializer.is_valid()):
            orderserializer.save()
        return HttpResponse({'message': 'Order created successfully'})

@api_view(['GET','POST'])
def review_list(request):
    if request.method == 'GET':
        reviews = Review.objects.all().values()
        # data = {'reviews': list(reviews.values())}
        return JsonResponse(list(reviews), safe=False)

    if request.method == 'POST':
        review_serializer = ReviewSerializer(data = request.data)
        if(review_serializer.is_valid()):
            review_serializer.save()
        return HttpResponse({'message': 'Review Added successfully'})
        # data = {
        #     'rating': request.POST.get('rating'),
        #     'content': request.POST.get('content'),
        #     'id': request.POST.get('id'),
        #     'createdAt': request.POST.get('createdAt'),
        # }
        # review = Review.objects.create(**data)
    
@csrf_exempt
def order_detail(request, pk):
    order = get_object_or_404(Order, pk=pk)

    if request.method == 'GET':
        data = {'order': model_to_dict(order)}
        return JsonResponse(data)

    elif request.method == 'PUT':
        data = {
            'prodName': request.POST.get('prodName'),
            'prodDesc': request.POST.get('prodDesc'),
            'image': request.POST.get('image'),
            'sideImg': request.POST.get('sideImg'),
            'price': request.POST.get('price'),
            'quant': request.POST.get('quant'),
            'id': request.POST.get('id'),
            'category': request.POST.get('category'),
            'custName': request.POST.get('custName'),
            'vendorName': request.POST.get('vendorName'),
            'tags': request.POST.get('tags'),
        }
        for key, value in data.items():
            setattr(order, key, value)
        order.save()
        return JsonResponse({'message': 'Order updated successfully'})

    elif request.method == 'DELETE':
        order.delete()
        return JsonResponse({'message': 'Order deleted successfully'})


# @csrf_exempt
# def user_list(request):
#     if request.method == 'GET':
#         users = User.objects.all()
#         data = {'users': list(users.values())}
#         return JsonResponse(data)

#     elif request.method == 'POST':
#         data = {
#             'username': request.POST.get('username'),
#             'password': request.POST.get('password'),
#             'role': request.POST.get('role'),
#             'id': uuid.uuid4()
#             # print
#         }
#         print('Username is:- ',data['username'])
#         print('Pass is:- ',data['password'])
#         print('Role is:- ',data['role'])
#         print('ID is:- ',data['id'])
#         user = User.objects.create(**data)
#         return JsonResponse({'message': 'User created successfully'})
        # return JsonResponse({'message': 'User created successfully', 'user': model_to_dict(user)})

# def create_user(request):
#     if request.method == 'POST':
#         username = request.POST.get('username')
#         password = request.POST.get('password')
#         role = request.POST.get('role')

#         # Perform validation and error handling if necessary

#         user = User.objects.create(username=username, password=password, role=role)
#         user.save()

# @csrf_exempt
# def user_detail(request, pk):
#     user = get_object_or_404(User, pk=pk)

#     if request.method == 'GET':
#         data = {'user': model_to_dict(user)}
#         return JsonResponse(data)

#     elif request.method == 'PUT':
#         data = {
#             'username': request.POST.get('username'),
#             'password': request.POST.get('password'),
#             'role': request.POST.get('role'),
#             'id': request.POST.get('id'),
#         }
#         for key, value in data.items():
#             setattr(user, key, value)
#         user.save()
#         return JsonResponse({'message': 'User updated successfully'})

#     elif request.method == 'DELETE':
#         user.delete()
#         return JsonResponse({'message': 'User deleted successfully'})





@csrf_exempt
def review_detail(request, pk):
    review = get_object_or_404(Review, pk=pk)

    if request.method == 'GET':
        data = {'review': model_to_dict(review)}
        return JsonResponse(data)

    elif request.method == 'PUT':
        data = {
            'rating': request.POST.get('rating'),
            'content': request.POST.get('content'),
            'id': request.POST.get('id'),
            'createdAt': request.POST.get('createdAt'),
        }
        for key, value in data.items():
            setattr(review, key, value)
        review.save()
        return JsonResponse({'message': 'Review updated successfully'})

    elif request.method == 'DELETE':
        review.delete()
        return JsonResponse({'message': 'Review deleted successfully'})
    
@api_view(['GET','POST'])
def usersignup(request):
    if request.method == 'GET':
        users = ShoppieUser.objects.all()
        serializer = ShoppieUserSerializer(users, many=True)
        print("users:", len(users))
        # return JsonResponse(serializer.data)
        # products = Product.objects.all()
        data = {'users': list(users.values())}
        return JsonResponse(data)
    if request.method == 'POST':
        print(request.data)
        userserializer=ShoppieUserSerializer(data=request.data)
        if(userserializer.is_valid()):
            userserializer.save()
            return HttpResponse({'message':'success'},status=status.HTTP_201_CREATED)
        return HttpResponse({'message':'not successful'},status=status.HTTP_404_NOT_FOUND)

@api_view(['GET','POST'])
def product_list(request):
    if request.method == 'GET':
        products = Product.objects.all()
        data = {'products': list(products.values())}
        return JsonResponse(data)

    elif request.method == 'POST':
        product_serializer =  ProductSerializer(data = request.data)
        if(product_serializer.is_valid()):
            product_serializer.save()
        # product = Product.objects.create(**data)
# @api_view(['GET'])
# def usersignup(request):
#     print(request.data)
#     userserializer=ShoppieUserSerializer(data=request.data)
#     if(userserializer.is_valid()):
#         userserializer.save()
#         return HttpResponse({'message':'success'},status=status.HTTP_201_CREATED)
#     return HttpResponse({'message':'not successful'},status=status.HTTP_404_NOT_FOUND)

@api_view(['POST'])
def userlogin(request):
    username=request.data['username']
    password=request.data['password']
    userobj=ShoppieUser.objects.get(username=username,password=password)
    if(userobj):
        return HttpResponse({'login':'success'},status=status.HTTP_201_CREATED)
    

    return HttpResponse({'login':'not successful'},status=status.HTTP_404_NOT_FOUND)

