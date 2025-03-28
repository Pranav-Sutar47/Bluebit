# from django.contrib.auth.models import AbstractUser
# from django.db import models

# class User(AbstractUser):
#     firebase_uid = models.CharField(max_length=255, unique=True, null=True, blank=True)
#     email = models.EmailField(unique=True)
#     name = models.CharField(max_length=255, null=True, blank=True)

#     # Medical Fields optional fields
#     current_disease = models.TextField(null=True, blank=True)
#     past_disease = models.TextField(null=True, blank=True)
#     allergy_information = models.TextField(null=True, blank=True)
#     surgical_procedure = models.TextField(null=True, blank=True)

#     groups = models.ManyToManyField(
#         "auth.Group",
#         related_name="authentication_users",
#         blank=True
#     )
#     user_permissions = models.ManyToManyField(
#         "auth.Permission",
#         related_name="authentication_users_permissions",
#         blank=True
#     )

#     def save(self, *args, **kwargs):
#         if not self.username:  # Ensure username is set
#             self.username = self.email
#         super().save(*args, **kwargs)

#     def __str__(self):
#         return self.email

from mongoengine import Document, fields
from django.contrib.auth.hashers import make_password, check_password
from django.contrib.auth.models import PermissionsMixin
from django.utils.translation import gettext_lazy as _

class User(Document):
    email = fields.EmailField(_('email address'), unique=True, required=True)
    firebase_uid = fields.StringField(max_length=255, unique=True, null=True, blank=True)
    name = fields.StringField(max_length=255, null=True, blank=True)
    role = fields.StringField(max_length=20,blank=True,null=True)
    
    # Medical fields
    current_disease = fields.StringField(null=True, blank=True)
    past_disease = fields.StringField(null=True, blank=True)
    allergy_information = fields.StringField(null=True, blank=True)
    surgical_procedure = fields.StringField(null=True, blank=True)
    
    # Auth Fields
    is_active = fields.BooleanField(default=True) 
    is_superuser = fields.BooleanField(default=False)
    
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []
    
    meta = {
        'collection': 'users',
        'indexes': ['email', 'firebase_uid'],
    }

    def __str__(self):
        return self.email

    def set_password(self, raw_password):
        self.password = make_password(raw_password)
        self.save()

    def check_password(self, raw_password):
        return check_password(raw_password, self.password)

    def has_perm(self, perm, obj=None):
        return self.is_superuser

    def has_module_perms(self, app_label):
        return self.is_superuser

    @property
    def is_authenticated(self):
        return True

    @property
    def is_anonymous(self):
        return False

    def get_full_name(self):
        return self.name

    def get_short_name(self):
        return self.name