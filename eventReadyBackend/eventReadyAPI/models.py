from django.db import models

class EventGeneralInfo(models.Model):
    id = models.IntegerField(primary_key=True, editable=False)
    
    name = models.CharField("Name", unique=True, max_length=256)
    doe = models.DateField("Day of Event", null=True, blank=True)
    start_time = models.TimeField("Start Time", null=True, blank=True) 
    end_time = models.TimeField("End Time", null=True, blank=True)
    location = models.CharField("Location", max_length=100, null=True, blank=True)
    description = models.CharField("Description", max_length=1024, null=True, blank=True)
    created = models.DateField(auto_now_add=True)
    active = models.BooleanField(default=True)

    def __str__(self):
        return self.name    
    
class MarketingPoster(models.Model):
    # TODO: event_id = models.IntegerField(primary_key=True, editable=False)
    # TODO: need a way to link each model in the repository to the root event_id
    id = models.IntegerField(primary_key=True, editable=False)

    name = models.CharField("Name", max_length=256)
    caption = models.CharField("Caption", max_length=1024, null=True, blank=True)
    image = models.ImageField(upload_to='images')
    
    def __str__(self):
        return self.name

class MarketingReminders(models.Model):
    # TODO: event_id = models.IntegerField(primary_key=True, editable=False)
    id = models.IntegerField(primary_key=True, editable=False)

    name = models.CharField("Name", max_length=256)
    date = models.DateField("Date", null=True, blank=True)
    time = models.TimeField("Time", null=True, blank=True)
    
    def __str__(self):
        return self.name
    
class MarketingRecapPhotos(models.Model):
    id = models.IntegerField(primary_key=True, editable=False)

    name = models.CharField("Name", max_length=256)
    image = models.ImageField(upload_to='images/recap')
    
    def __str__(self):
        return self.name