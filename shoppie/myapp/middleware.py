# # myapp/middleware.py

# from django.contrib.auth import get_user_model

# User = get_user_model()

# class CustomUserMiddleware:
#     def __init__(self, get_response):
#         self.get_response = get_response

#     def __call__(self, request):
#         user_name = request.headers.get('X-User-ID')
#         if user_name:
#             try:
#                 user = User.objects.get(username=user_name)
#                 request.user = user
#             except User.DoesNotExist:
#                 pass

#         response = self.get_response(request)
#         return response
