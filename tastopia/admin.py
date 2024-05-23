from django.contrib import admin
from .models import *

# Register your models here.
admin.site.register(CustomUser)
admin.site.register(Recipe)
admin.site.register(Category)
admin.site.register(Like)
admin.site.register(Collection)
admin.site.register(Comment)
admin.site.register(Ingredient)
admin.site.register(RecipePhoto)
admin.site.register(SavedRecipe)
