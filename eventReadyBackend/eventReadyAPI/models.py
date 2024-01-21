from django.db import models

class EventGeneralInfo(models.Model):
    id = models.IntegerField(primary_key=True, editable=False)
    
    name = models.CharField("Name", unique=True, max_length=256)
    doe = models.DateField("Day of Event")
    start_time = models.TimeField("Start Time") 
    end_time = models.TimeField("End Time")
    location = models.CharField("Location", max_length=100)
    description = models.CharField("Description", max_length=1024)
    created = models.DateField(auto_now_add=True)
    active = models.BooleanField(default=True)

    def __str__(self):
        return self.name    