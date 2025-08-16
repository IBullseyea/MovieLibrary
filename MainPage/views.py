from django.shortcuts import render

def index(request):
    return render(request, 'index.html')

def movies(request):
    return render(request, 'movies.html')

def series(request):
    return render(request, 'series.html')
