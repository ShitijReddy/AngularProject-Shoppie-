# Generated by Django 4.2.2 on 2023-06-13 07:52

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('myapp', '0008_alter_user_password_alter_user_username'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='role',
            field=models.CharField(choices=[('customer', 'Customer'), ('vendor', 'Vendor')], max_length=20, null=True),
        ),
    ]