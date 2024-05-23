from rest_framework import viewsets
from rest_framework import generics
from .serializer import *
from .models import *
from rest_framework import generics, permissions
from django.http import JsonResponse
from django.contrib.auth.hashers import make_password
from django.contrib.auth.models import User
from rest_framework.authtoken.models import Token
from rest_framework.authtoken.views import obtain_auth_token
from django.contrib.auth import authenticate
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
from .models import CustomUser
from django.core.mail import send_mail
from django.urls import reverse

from django.contrib.auth.tokens import default_token_generator
from django.utils.http import urlsafe_base64_encode
from django.utils.encoding import force_bytes

from django.contrib.auth.tokens import default_token_generator
from django.utils.http import urlsafe_base64_encode
from django.utils.encoding import force_bytes
from django.core.mail import send_mail, EmailMessage

class GetUserByEmail(APIView):
    def get(self, request):
        email = request.query_params.get('email')
        try:
            user = User.objects.get(email=email)
            custom_user = CustomUser.objects.get(user=user) 
            # Serializa el usuario si es necesario
            return Response({'user_id': custom_user.pk}, status=status.HTTP_200_OK)
        except CustomUser.DoesNotExist:
            return Response({'error': 'User not found'}, status=status.HTTP_404_NOT_FOUND)

class EmailAPIView(APIView):
    def post(self, request):
        try:
            to_email = request.data.get('email')
            subject = "Correo de autenticacion de cuenta"
            message = "Bienvenido {}\nPor favor, haz clic en el siguiente enlace para verificar tu cuenta:\n\n{}".format(to_email, f'http://localhost:5173/verify/{to_email}')
            email = EmailMessage(subject, message, to=[to_email])
            email.send()
            return Response({'message': 'Correo enviado'}, status=status.HTTP_200_OK)
        except Exception as e:
            error_message = str(e)
            return Response({'message': 'Error al enviar correo'}, status=status.HTTP_400_BAD_REQUEST)


class RegisterUserView(APIView):
    serializer_class = CustomUserSerializer
    queryset = CustomUser.objects.all()

    def post(self, request):
        # Extract registration data from request
        email = request.data.get('email')
        password = request.data.get('password')
        firstName = request.data.get('firstName')
        lastName = request.data.get('lastName')
        age = request.data.get('age')
        phone = request.data.get('phone')

        # Validate registration data
        if not email or not password or not firstName or not lastName or not age or not phone:
            return Response({'error': 'All fields are required'}, status=status.HTTP_400_BAD_REQUEST)

        # Check if user already exists
        if User.objects.filter(email=email).exists():
            return Response({'error': 'Email is already registered'}, status=status.HTTP_400_BAD_REQUEST)

        # Create new user
        user = User.objects.create_user(username=email, password=password, first_name=firstName,
            last_name=lastName, email=email)
        customuser = CustomUser.objects.create(
            user=user,
            age=age,
            phone=phone
        )

        # Generate token for the newly registered user
        token = Token.objects.create(user=user)

        return Response({'message': 'User registered successfully', 'token': token.key}, status=status.HTTP_201_CREATED)


class CustomObtainAuthToken(APIView):
    def post(self, request, *args, **kwargs):
        response = obtain_auth_token(request, *args, **kwargs)
        # You can customize the response here if needed
        return response

class LoginUserView(APIView):
    def post(self, request):
        email = request.data.get('email')
        password = request.data.get('password')

        if not all([email, password]):
            return Response({'error': 'Email and password are required'}, status=status.HTTP_400_BAD_REQUEST)

        user = authenticate(username=email, password=password)
        
        if user is not None:
            token, created = Token.objects.get_or_create(user=user)
            custom_user = CustomUser.objects.get(user=user) 
                
            return Response({
                'token': token.key,
                'user_id': custom_user.pk, 
                'auth_id': user.pk,
                'email': user.email,
                'first_name': user.first_name,
                'last_name': user.last_name,
                'age' : custom_user.age,
                'phone' : custom_user.phone,
                
            }, status=status.HTTP_200_OK)
        else:
            return Response({'error': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)


class UserDeleteView(APIView):
    def delete(self, request, pk):
        try:
            # Eliminar el usuario de la tabla User (auth)
            user = User.objects.get(pk=pk)
            user.delete()
            
            # Eliminar el usuario de la tabla CustomUser
            custom_user = CustomUser.objects.get(user=user)
            custom_user.delete()
            
            return Response({"message": "User deleted successfully"}, status=status.HTTP_204_NO_CONTENT)
        except User.DoesNotExist:
            return Response({"error": "User does not exist"}, status=status.HTTP_404_NOT_FOUND)
        except CustomUser.DoesNotExist:
            return Response({"error": "CustomUser does not exist"}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

from rest_framework import viewsets
from django.contrib.auth.models import User

class CustomUserView(viewsets.ModelViewSet):
    serializer_class = CustomUserSerializer
    queryset = CustomUser.objects.all()


class RecipeView(viewsets.ModelViewSet):
    serializer_class = RecipeSerializer
    queryset = Recipe.objects.all()

class CategoryView(viewsets.ModelViewSet):
    serializer_class = CategorySerializer
    queryset = Category.objects.all()

class LikeView(viewsets.ModelViewSet):
    serializer_class = LikeSerializer
    queryset = Like.objects.all()

class CollectionView(viewsets.ModelViewSet):
    serializer_class = CollectionSerializer
    queryset = Collection.objects.all()
    def get_queryset(self):
        user_id = self.request.query_params.get('user', None)
        if user_id is not None:
            return Collection.objects.filter(user__id=user_id)
        return super().get_queryset()

class CommentView(viewsets.ModelViewSet):
    serializer_class = CommentSerializer
    queryset = Comment.objects.all()

class IngredientView(viewsets.ModelViewSet):
    serializer_class = IngredientSerializer
    queryset = Ingredient.objects.all()

class RecipePhotoView(viewsets.ModelViewSet):
    serializer_class = RecipePhotoSerializer
    queryset = RecipePhoto.objects.all()

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)

class SavedRecipeView(viewsets.ModelViewSet):
    serializer_class = SavedRecipeSerializer
    queryset = SavedRecipe.objects.all()

class SavedRecipeByCollectionView(generics.ListAPIView):
    serializer_class = SavedRecipeSerializer

    def get_queryset(self):
        collection_id = self.kwargs['collection_id']
        return SavedRecipe.objects.filter(collection_id=collection_id)