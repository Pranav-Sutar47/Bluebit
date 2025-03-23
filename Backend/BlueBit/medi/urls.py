from django.urls import path
from . import views  

urlpatterns = [
    path('', views.home, name='home'),
    path('process_ocr/', views.process_ocr, name='process_ocr'),
]
