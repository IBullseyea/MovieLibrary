from django.shortcuts import render, get_object_or_404
from .models import Movie, Series, Episode

def index(request):
    movies = Movie.objects.all()[:6]
    series = Series.objects.all()[:6]
    context =  {
        'movies' : movies,
        'series' : series
    }
    return render(request, 'index.html', context)


def movies(request):
    movies = Movie.objects.all()
    return render(request, 'movies.html', {'movies':movies})

def series(request):
    series = Series.objects.all()
    return render(request, 'series.html', {'series':series})


def movie_detail(request, movie_id):
    movie = get_object_or_404(Movie, id=movie_id)
    return render(request, 'movie_detail.html',{'movie':movie})

def series_detail(request, series_id):
    series = get_object_or_404(Series, id=series_id)
    episodes = series.episodes.all().order_by('season_number', 'episode_number')  # episodes_number değil episode_number!
    return render (request, 'series_detail.html', {'series': series, 'episodes':episodes})

def episode_detail(request, episode_id):
    episode = get_object_or_404(Episode, id=episode_id)
    other_episodes = episode.series.episodes.all().order_by('season_number', 'episode_number')
    return render(request, 'episode_detail.html', {
        'episode' : episode,
        'series' : episode.series,
        'other_episodes' : other_episodes
    })