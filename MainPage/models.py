from django.db import models

# Create your models here.

class Movie(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField()
    release_year = models.IntegerField()
    duration = models.IntegerField()
    poster = models.ImageField(upload_to='M_posters/')
    video_file = models.FileField(upload_to='M_videos/')
    is_watched = models.BooleanField(default=False)
    
    def __str__(self):
        return self.title
    
    class Meta:
        verbose_name_plural = "Movies"

class Series(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField()
    release_year = models.IntegerField()
    poster = models.ImageField(upload_to='S_posters/')
    
    def __str__(self):
        return self.title
    
    class Meta:
        verbose_name_plural = "Series"  # Bu önemli!

class Episode(models.Model):
    series = models.ForeignKey(Series, on_delete=models.CASCADE, related_name='episodes')
    title = models.CharField(max_length=200)
    episode_number = models.IntegerField()
    season_number = models.IntegerField()
    video_file = models.FileField(upload_to='S_videos/')
    duration = models.IntegerField()
    is_watched = models.BooleanField(default=False)
    
    def __str__(self):
        return f"{self.series.title} - S{self.season_number}E{self.episode_number}"
    
    class Meta:
        verbose_name_plural = "Episodes"