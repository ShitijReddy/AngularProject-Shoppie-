# Generated by Django 4.2.2 on 2023-06-16 05:07

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('myapp', '0015_remove_order_tags_remove_product_tags'),
    ]

    operations = [
        migrations.AlterField(
            model_name='review',
            name='id',
            field=models.AutoField(primary_key=True, serialize=False),
        ),
    ]
