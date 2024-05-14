from django.urls import path,  include
from rest_framework.documentation import include_docs_urls
from rest_framework import routers
from tastopia import views

router = routers.DefaultRouter()
router.register(r'users', views.UserView, 'users')
router.register(r'recipes', views.RecipeView, 'recipes')
router.register(r'categories', views.CategoryView, 'categories')
router.register(r'likes', views.LikeView, 'likes')
router.register(r'collections', views.CollectionView, 'collections')
router.register(r'ingredients', views.IngredientView, 'ingredients')
router.register(r'recipe-photos', views.RecipePhotoView, 'recipe-photos')
router.register(r'saved-recipes', views.SavedRecipeView, 'saved-recipes')
    
urlpatterns = [
    path("api/v1/", include(router.urls)),
    path('docs/', include_docs_urls(title="Tastopia API"))
]