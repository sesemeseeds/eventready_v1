from django.db import models

# Create your models here.

class MarketingPoster(models.Model):
    id = models.IntegerField(primary_key=True, editable=False)
    name = models.CharField("Name", max_length=256)
    image = models.ImageField(upload_to='files/posters')