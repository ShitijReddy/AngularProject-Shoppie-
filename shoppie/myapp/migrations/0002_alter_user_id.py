# Generated by Django 4.2.2 on 2023-06-13 05:52

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('myapp', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='id',
            field=models.CharField(max_length=50, primary_key=True, serialize=False, unique=True),
        ),
    ]
