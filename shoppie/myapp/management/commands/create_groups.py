from django.core.management.base import BaseCommand
from django.contrib.auth.models import Group, Permission
from django.contrib.contenttypes.models import ContentType

class Command(BaseCommand):
    help = 'Create groups and assign permissions'

    def handle(self, *args, **options):
        # Create the groups
        customer_group, _ = Group.objects.get_or_create(name='customer')
        vendor_group, _ = Group.objects.get_or_create(name='vendor')

        # Assign permissions to the customer group
        customer_permissions = [
            'view_product',
            'view_order',
            'add_order',
            'change_order',
            'delete_order',
            'view_review',
            'add_review',
            'change_review',
            'delete_review',
        ]
        for permission in customer_permissions:
            perm = Permission.objects.get(codename=permission)
            customer_group.permissions.add(perm)

        # Assign permissions to the vendor group
        vendor_permissions = [
            'view_product',
            'add_product',
            'change_product',
            'delete_product',
            'view_order',
            'view_review'
        ]
        for permission in vendor_permissions:
            perm = Permission.objects.get(codename=permission)
            vendor_group.permissions.add(perm)

        self.stdout.write(self.style.SUCCESS('Groups and permissions created successfully.'))
