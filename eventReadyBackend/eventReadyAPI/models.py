from django.db import models

class EventGeneralInfo(models.Model):
    id = models.IntegerField(primary_key=True, editable=False)
    
    name = models.CharField("Name", unique=True, max_length=256)
    doe = models.DateField("Day of Event", blank=True)
    start_time = models.TimeField("Start Time", blank=True) 
    end_time = models.TimeField("End Time", blank=True)
    location = models.CharField("Location", max_length=100, blank=True)
    description = models.CharField("Description", max_length=1024, blank=True)
    created = models.DateField(auto_now_add=True)
    active = models.BooleanField(default=True)

    def __str__(self):
        return self.name    