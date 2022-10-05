from django.urls import path
from .views import *


urlpatterns = [
    path('', HomeNews.as_view(), name='admin'),
]
