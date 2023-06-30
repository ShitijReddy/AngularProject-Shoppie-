from django.contrib.auth.models import User
import uuid
from django.forms import model_to_dict
from django.shortcuts import get_object_or_404
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.http import HttpResponse
from rest_framework.response import Response
from .models import Product, Order, Review
from rest_framework.views import APIView
from rest_framework.decorators import api_view
from myapp.serializers import ShoppieUserSerializer, ProductSerializer, OrderSerializer, ReviewSerializer
from myapp.models import ShoppieUser
from rest_framework import status

from django.contrib.auth.models import Permission, Group
from django.contrib.contenttypes.models import ContentType
from myapp.models import ShoppieUser, Order
from django.contrib.auth.decorators import user_passes_test
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework.authentication import SessionAuthentication
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth.decorators import permission_required
from django.contrib.auth import authenticate, login
from rest_framework.authtoken.models import Token
from django.contrib.auth.decorators import login_required

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


def user_belongs_to_customer_group(user):
    print(user.groups)
    return user.groups.filter(name='customer').exists()

@api_view(['GET', 'POST'])
# @login_required
# @permission_required('myapp.add_order', raise_exception=True)
def order_list(request):
    user = request.user
    print("username in order_list is", user)
    print('user groups:',user.groups.all())
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
#     if request.method == 'POST':user(
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


class SubmitReviewView(APIView):
    # permission_classes=[AllowAny]
    def post(self, request):
        product_title = request.data.get('productTitle')
        author = request.data.get('author')
        rating = request.data.get('rating')
        comment = request.data.get('comment')
        media = request.data.get('media')
        serializer = ReviewSerializer(data={
        'product_title': product_title,
        'author': author,
        'rating': rating,
        'comment': comment,
        'media': media
    })

        if serializer.is_valid():
             serializer.save()
             return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            print(serializer.errors)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    

from rest_framework import generics

class ReviewListView(APIView):
    # permission_classes=[AllowAny]
    def get(self,request,productTitle):
        queryset = Review.objects.filter(product_title=productTitle)
        serialzer=ReviewSerializer(queryset,many=True)
        return Response(serialzer.data)



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
        User.objects.create(username=request.data['username'],password=request.data['password'])
        user=User.objects.get(username=request.data['username'])
        if(request.data['role'] == "customer"):
            group = Group.objects.get(name='customer')
        else:
           group = Group.objects.get(name='vendor')
        user.groups.set([group])
        user.is_staff=True
        user.save() 
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

# @api_view(['POST'])
# def userlogin(request):
#     username=request.data['username']
#     password=request.data['password']
#     userobj=ShoppieUser.objects.get(username=username,password=password)
#     if(userobj):
#         return HttpResponse({'login':'success'},status=status.HTTP_201_CREATED)
    

#     return HttpResponse({'login':'not successful'},status=status.HTTP_404_NOT_FOUND)

# @api_view(['POST'])
# def userlogin(request):
#     username = request.data.get['username']
#     password = request.data.get['password']
#     print("username in userlogin is:", username)
#     user = authenticate(request, username=username, password=password, role="customer")

#     if user is not None:
#         login(request, user)
#         return HttpResponse({'login': 'success'}, status=status.HTTP_200_OK)
#     else:
#         return HttpResponse({'login': 'not successful'}, status=status.HTTP_401_UNAUTHORIZED)

@api_view(['GET','POST'])
def userlogin(request):
    username = request.data.get('username')
    password = request.data.get('password')
    user = authenticate(request, username=username, password=password)
    if user is not None:
        login(request, user)
        return JsonResponse({'login': 'success'})
    else:
        return JsonResponse({'login': 'not successful'}, status=401)

# @csrf_exempt
@api_view(['POST'])
def loginUser(request):
    print("going into loginUser")
    print(request.data)
    user = authenticate(request, username=request.data['username'], password=request.data['password'])
    if user is not None:
        login(request, user)
        return Response({'message': 'Login successful'})
    else:
        return Response({'message': 'Login unsuccessful'})

@api_view(['GET'])
def loginBackend(request,username,password):
    user=User.objects.get(username=username)
    print(user)
    if user is not None:
        user_id = user.id
        group_ids = user.groups.values_list('id', flat=True)
        group_id_list = list(group_ids)
        print("User ID:", user_id)
        print("Group IDs:", group_id_list)
        if group_id_list[0] == 1:
            return Response({'result': 'customer'})
        elif group_id_list[0]==2:
            stud=ShoppieUser.objects.get(username=username)
            if(password==stud.password):
                return Response({'result': 'vendor'})
            else:
                return Response({'result': 'Password Incorrect'})
        else:
            return Response({'result':'nonexist'})

def add_shoppie_user_to_group(request):
    orders_content_type = ContentType.objects.get_for_model(Order)
    permission_add_orders = Permission.objects.get(codename='add_orders', content_type=orders_content_type)
    permission_change_orders = Permission.objects.get(codename='change_orders', content_type=orders_content_type)

    group, created = Group.objects.get_or_create(name='CustomerGroup')
    group.permissions.add(permission_add_orders, permission_change_orders)

    shoppie_user = ShoppieUser.objects.get(username='shitij')

    # Add the ShoppieUser to the group
    group.user_set.add(shoppie_user)

    # Your additional code or response handling here
