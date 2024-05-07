# Generated by Django 4.1.7 on 2024-05-04 04:33

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('tastopia', '0002_categories_collections_ingredients_likes_and_more'),
    ]

    operations = [
        migrations.RenameModel(
            old_name='Categories',
            new_name='Categorie',
        ),
        migrations.RenameModel(
            old_name='Collections',
            new_name='Collection',
        ),
        migrations.RenameModel(
            old_name='Ingredients',
            new_name='Ingredient',
        ),
        migrations.RenameModel(
            old_name='Likes',
            new_name='Like',
        ),
        migrations.RenameModel(
            old_name='Recipes',
            new_name='Recipe',
        ),
        migrations.RenameModel(
            old_name='RecipePhotos',
            new_name='RecipePhoto',
        ),
        migrations.RenameModel(
            old_name='SavedRecipes',
            new_name='SavedRecipe',
        ),
        migrations.RenameModel(
            old_name='UploadedRecipes',
            new_name='UploadedRecipe',
        ),
        migrations.RenameModel(
            old_name='Users',
            new_name='User',
        ),
    ]