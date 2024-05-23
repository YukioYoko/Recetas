from rest_framework import serializers
from .models import *

from rest_framework import serializers
from django.contrib.auth.models import User
from .models import CustomUser

class CustomUserSerializer(serializers.ModelSerializer):
    username = serializers.CharField(source='user.username', read_only=False)
    email = serializers.EmailField(source='user.email', read_only=False)
    first_name = serializers.CharField(source='user.first_name', read_only=False)
    last_name = serializers.CharField(source='user.last_name', read_only=False)

    class Meta:
        model = CustomUser
        fields = ['age', 'phone', 'image', 'username', 'email', 'first_name', 'last_name']

    def update(self, instance, validated_data):
        # Update CustomUser fields
        instance.age = validated_data.get('age', instance.age)
        instance.phone = validated_data.get('phone', instance.phone)
        instance.image = validated_data.get('image', instance.image)
        
        # Update User fields
        user_data = validated_data.pop('user', {})  # Extract user data
        user = instance.user  # Get associated user instance
        user.username = user_data.get('username', user.username)
        user.email = user_data.get('email', user.email)
        user.first_name = user_data.get('first_name', user.first_name)
        user.last_name = user_data.get('last_name', user.last_name)
        user.save()  # Save user changes
        
        instance.save()  # Save CustomUser changes
        return instance


class RecipeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Recipe
        fields = '__all__'

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = '__all__'

class LikeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Like
        fields = '__all__'

class CollectionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Collection
        fields = '__all__'

class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = '__all__'

class IngredientSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ingredient
        fields = '__all__'

class RecipePhotoSerializer(serializers.ModelSerializer):
    class Meta:
        model = RecipePhoto
        fields = '__all__'

class SavedRecipeSerializer(serializers.ModelSerializer):
    class Meta:
        model = SavedRecipe
        fields = '__all__'
