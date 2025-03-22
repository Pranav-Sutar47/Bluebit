from django.contrib.auth.models import AbstractUser
from django.db import models

class User(AbstractUser):
    firebase_uid = models.CharField(max_length=255, unique=True, null=True, blank=True)
    email = models.EmailField(unique=True)
    name = models.CharField(max_length=255, null=True, blank=True)

    # Medical Fields optional fields
    current_disease = models.TextField(null=True, blank=True)
    past_disease = models.TextField(null=True, blank=True)
    allergy_information = models.TextField(null=True, blank=True)
    surgical_procedure = models.TextField(null=True, blank=True)

    groups = models.ManyToManyField(
        "auth.Group",
        related_name="authentication_users",
        blank=True
    )
    user_permissions = models.ManyToManyField(
        "auth.Permission",
        related_name="authentication_users_permissions",
        blank=True
    )

    def save(self, *args, **kwargs):
        if not self.username:  # Ensure username is set
            self.username = self.email
        super().save(*args, **kwargs)

    def __str__(self):
        return self.email