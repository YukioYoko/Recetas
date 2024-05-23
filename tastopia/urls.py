from django.urls import path, include
from rest_framework.documentation import include_docs_urls
from rest_framework import routers
from tastopia import views
from .views import RegisterUserView, LoginUserView, SavedRecipeByCollectionView, UserDeleteView

router = routers.DefaultRouter()
router.register(r'users', views.CustomUserView, 'users')
router.register(r'recipes', views.RecipeView, 'recipes')
router.register(r'categories', views.CategoryView, 'categories')
router.register(r'likes', views.LikeView, 'likes')
router.register(r'collections', views.CollectionView, 'collections')
router.register(r'ingredients', views.IngredientView, 'ingredients')
router.register(r'recipe-photos', views.RecipePhotoView, 'recipe-photos')
router.register(r'saved-recipes', views.SavedRecipeView, 'saved-recipes')

urlpatterns = [
    path("api/v1/", include(router.urls)),
    path('register/', RegisterUserView.as_view(), name='register'),
    path('login/', LoginUserView.as_view(), name='login'),
    path('coleccionesinternas/<int:collection_id>/', SavedRecipeByCollectionView.as_view(), name='saved-recipes-by-collection'),
    path('api/v1/auth/users/<int:pk>/', UserDeleteView.as_view(), name='user-delete'),
    path('docs/', include_docs_urls(title="Tastopia API"))
]
