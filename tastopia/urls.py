from django.urls import path, include
from rest_framework.documentation import include_docs_urls
from rest_framework import routers
from tastopia import views
from .views import RegisterUserView, LoginUserView

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
    path('register/', RegisterUserView.as_view(), name='register'),  # RegisterUserView as a regular view
    path('login/', LoginUserView.as_view(), name='login'),
    #path('profile/', ProfileView.as_view(), name='profile'),
    #path('profile/<int:user_id>/', ProfileView.as_view(), name='profile'),
    path('docs/', include_docs_urls(title="Tastopia API"))
]

