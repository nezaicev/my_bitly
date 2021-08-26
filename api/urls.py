from django.contrib import admin
from django.urls import path
from api.views import GetMapLinkView, index

urlpatterns = [
    path('', index, name='index_api'),
    path('links/', GetMapLinkView.as_view()),
]
