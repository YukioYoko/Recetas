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
            last_name=lastName, email = email)
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
                'email': user.email,
                'first_name': user.first_name,
                'last_name': user.last_name,
                'age' : custom_user.age,
                'phone' : custom_user.phone,
            }, status=status.HTTP_200_OK)
        else:
            return Response({'error': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)




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