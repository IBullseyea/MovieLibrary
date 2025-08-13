from django.shortcuts import render
from django.http import HttpResponse

def index(request):
    return HttpResponse('This is in my MainPage')
# Create your views here.
