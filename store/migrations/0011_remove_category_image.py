# Generated by Django 5.0.1 on 2024-05-12 20:34

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('store', '0010_remove_product_image_4'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='category',
            name='image',
        ),
    ]