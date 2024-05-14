from rest_framework import viewsets
from .serializer import *
from .models import *

from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.hashers import make_password
from .models import User

@csrf_exempt
def register_user(request):
    if request.method == 'POST':
        email = request.POST.get('email')
        firstName = request.POST.get('firstName')
        lastName = request.POST.get('lastName')
        age = request.POST.get('age')
        phone = request.POST.get('phone')
        password = request.POST.get('password')

        # Validar campos
        if not email or not firstName or not lastName or not age or not phone or not password:
            return JsonResponse({'error': 'Todos los campos son requeridos.'}, status=400)

        # Verificar si el usuario ya existe
        if User.objects.filter(email=email).exists():
            return JsonResponse({'error': 'El correo electrónico ya está registrado.'}, status=400)

        # Hashear la contraseña
        hashed_password = make_password(password)

        # Crear y guardar el nuevo usuario en la base de datos
        user = User.objects.create(
            email=email,
            firstName=firstName,
            lastName=lastName,
            age=age,
            phone=phone,
            password=hashed_password
        )

        return JsonResponse({'message': 'Usuario registrado correctamente.'})
    else:
        return JsonResponse({'error': 'Solo se permite el método POST.'}, status=405)

class UserView(viewsets.ModelViewSet):
    serializer_class = UserSerializer
    queryset = User.objects.all()

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

class IngredientView(viewsets.ModelViewSet):
    serializer_class = IngredientSerializer
    queryset = Ingredient.objects.all()

class RecipePhotoView(viewsets.ModelViewSet):
    serializer_class = RecipePhotoSerializer
    queryset = RecipePhoto.objects.all()

class SavedRecipeView(viewsets.ModelViewSet):
    serializer_class = SavedRecipeSerializer
    queryset = SavedRecipe.objects.all()

class UploadedRecipeView(viewsets.ModelViewSet):
    serializer_class = UploadedRecipeSerializer
    queryset = UploadedRecipe.objects.all()