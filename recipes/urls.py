from django.urls import path,  include
from rest_framework import routers
from recipes import views

router = routers.DefaultRouter()
router.register(r'recipes', views.RecipeView, 'recipes')

urlpatterns = [
    path("api/v1/", include(router.urls) )
]

