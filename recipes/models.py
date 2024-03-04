from django.db import models

# Create your models here.
class Colection(models.Model):
    title = models.CharField(max_length=20)
    recipes = models.ForeignKey(Recipe, on_delete=models.CASCADE)

class User(models.Model):
    username = models.CharField(max_length=50)
    password = models.CharField(max_length=20)
    email = models.EmailField()
    colections = models.ForeignKey(Colection, on_delete=models.CASCADE)

class Recipe(models.Model):
    title = models.CharField(max_length=100)
    description = models.TextField(blank=True)
    author = models.ForeignKey(User, on_delete=models.CASCADE)