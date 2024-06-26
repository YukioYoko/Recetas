from django.db import models
from django.contrib.auth.models import User
from django.utils import timezone

def profileDirectoryPath(instance, filename): 
  
    # file will be uploaded to MEDIA_ROOT / title /<filename> 
    return 'Profile_Images/{0}/{1}'.format(instance.user, filename) 

class CustomUser(models.Model):
    user = models.OneToOneField(User, null=True, on_delete=models.CASCADE )
    age = models.IntegerField()
    phone = models.CharField(max_length=10)
    image = models.ImageField(upload_to=profileDirectoryPath)
    auth = models.BooleanField(default=False)
    def __str__(self):
        return str(self.user)
    
class Recipe(models.Model):
    title = models.CharField(max_length=100)
    valoration = models.FloatField(default=0.0)
    valorationCount = models.IntegerField(default=0)
    description = models.TextField(blank=True)
    duration = models.IntegerField(default=0)
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)

    def __str__(self):
        return self.title + " - " + str(self.user)

class Category(models.Model):
    recipe = models.ForeignKey(Recipe, on_delete=models.CASCADE)
    name = models.CharField(max_length=30)

    def __str__(self):
        return f'{self.recipe.title} - {self.name}'

class Like(models.Model):
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    category = models.ForeignKey(Category, on_delete=models.CASCADE)

    def __str__(self):
        return f'{self.user} - {self.category.name}'
    
class Collection(models.Model):
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    name = models.CharField(max_length=50)

    def __str__(self):
        return f'{self.user} - {self.name}'
    
class Comment(models.Model):
    recipe = models.ForeignKey(Recipe, on_delete=models.CASCADE)
    content = models.CharField(max_length=500)
    username = models.CharField(max_length=50, default="")
    created_at = models.DateTimeField(default=timezone.now)

    def __str__(self):
        return f'{self.recipe} - {self.content}'
    
class Ingredient(models.Model):
    recipe = models.ForeignKey(Recipe, on_delete=models.CASCADE)
    name = models.CharField(max_length=100)

    def __str__(self):
        return f'{self.recipe.title} - {self.name}'

def recipeDirectoryPath(instance, filename): 
  
    # file will be uploaded to MEDIA_ROOT / title /<filename> 
    return 'Recipe_Images/{0}/{1}'.format(instance.recipe.title, filename) 

class RecipePhoto(models.Model):
    recipe = models.ForeignKey(Recipe, on_delete=models.CASCADE)
    photo = models.ImageField(upload_to=recipeDirectoryPath)

    def __str__(self):
        return f'{self.recipe.title} - {self.photo}'
    
class SavedRecipe(models.Model):
    collection = models.ForeignKey(Collection, on_delete=models.CASCADE)
    recipe = models.ForeignKey(Recipe, on_delete=models.CASCADE)

    def __str__(self):
        return f'{self.collection.name} - {self.recipe.title}'
    