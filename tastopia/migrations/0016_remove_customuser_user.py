# Generated by Django 4.1.7 on 2024-05-19 02:37

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('tastopia', '0015_alter_customuser_user'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='customuser',
            name='user',
        ),
    ]
