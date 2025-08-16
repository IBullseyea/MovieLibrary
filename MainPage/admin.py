from django.contrib import admin
from .models import Movie, Series, Episode

# Register your models here.

@admin.register(Movie)
class MovieAdmin(admin.ModelAdmin):
    list_display = ['title', 'release_year', 'duration']
    list_filter = ['release_year']
    search_fields = ['title']
    
@admin.register(Series)
class SeriesAdmin(admin.ModelAdmin):
    list_display = ['title', 'release_year']
    list_filter = ['release_year']
    search_fields = ['title']

@admin.register(Episode)
class EpisodeAdmin(admin.ModelAdmin):
    list_display = ['title', 'series', 'season_number', 'episode_number', 'duration']
    list_filter = ['series', 'season_number']
    search_fields = ['title', 'series__title']
    ordering = ['series', 'season_number', 'episode_number']  # Sıralama ekledik