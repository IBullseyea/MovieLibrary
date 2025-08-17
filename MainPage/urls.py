from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('movies/', views.movies, name='movies'),
    path('series/', views.series, name='series'),
    path('movie/<int:movie_id>/', views.movie_detail, name='movie_detail'),
    path('series/<int:series_id>/', views.series_detail, name='series_detail'),
    path('episode/<int:episode_id>/', views.episode_detail, name='episode_detail'),
    path('search/', views.search, name='search'),
    path('toggle-movie/<int:movie_id>/', views.toggle_movie_watched, name='toggle_movie_watched'),
    path('toggle-episode/<int:episode_id>/', views.toggle_episode_watched, name='toggle_episode_watched'),
]
