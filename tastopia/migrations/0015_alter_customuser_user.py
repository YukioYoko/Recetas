# Generated by Django 4.1.7 on 2024-05-19 02:36

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('tastopia', '0014_merge_20240518_2029'),
    ]

    operations = [
        migrations.AlterField(
            model_name='customuser',
            name='user',
            field=models.CharField(max_length=100),
        ),
    ]
