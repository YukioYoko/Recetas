# Generated by Django 4.1.7 on 2024-05-14 16:10

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('tastopia', '0011_customuser_alter_collection_user_alter_like_user_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='customuser',
            name='first_name',
            field=models.CharField(default=1, max_length=30),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='customuser',
            name='last_name',
            field=models.CharField(default=None, max_length=40),
            preserve_default=False,
        ),
    ]
