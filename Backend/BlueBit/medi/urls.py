from django.urls import path
from .views import home
from .views import process_ocr

urlpatterns = [
    path('', home, name='home'),
    # path('process_ocr/', views.process_ocr, name='process_ocr'),
    path('api/process_ocr/', process_ocr, name='process_ocrendpoint')
]
