from django.apps import AppConfig

class AuthenticationConfig(AppConfig):
    name = 'authentication'
    verbose_name = 'Authentication'
    
    def ready(self):
        try:
            import authentication.signals  # noqa F401
        except ImportError:
            pass