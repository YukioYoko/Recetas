# Generated by Django 4.1.7 on 2024-05-14 03:58

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('tastopia', '0006_alter_user_image'),
    ]

    operations = [
        migrations.AddField(
            model_name='recipe',
            name='duration',
            field=models.IntegerField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='recipe',
            name='valoration',
            field=models.IntegerField(blank=True),
        ),
    ]