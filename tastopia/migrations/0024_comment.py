# Generated by Django 4.1.7 on 2024-05-23 05:02

from django.db import migrations, models
import django.db.models.deletion
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        ('tastopia', '0023_alter_recipe_valoration'),
    ]

    operations = [
        migrations.CreateModel(
            name='Comment',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('content', models.CharField(max_length=500)),
                ('created_at', models.DateTimeField(default=django.utils.timezone.now)),
                ('recipe', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='tastopia.recipe')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='tastopia.customuser')),
            ],
        ),
    ]
