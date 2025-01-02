# C:\Users\KIIT\OneDrive\Desktop\djangoProject\users\admin.py
from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import User

class CustomUserAdmin(UserAdmin):
    model = User
    list_display = ['username', 'email', 'first_name', 'last_name', 'date_joined', 'last_updated']
    search_fields = ['username', 'email']

admin.site.register(User, CustomUserAdmin)
