from django.urls import path,  include
from rest_framework.documentation import include_docs_urls
from rest_framework import routers
from tastopia import views

router = routers.DefaultRouter()
router.register(r'recipes', views.RecipeView, 'recipes')

urlpatterns = [
    path("api/v1/", include(router.urls)),
    path('docs/', include_docs_urls(title="Tastopia API"))
]