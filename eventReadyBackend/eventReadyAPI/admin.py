from django.contrib import admin
from .models import *

# Register your models here.
class MarketingAdmin(admin.ModelAdmin):
    readonly_fields = ('id',)
    
admin.site.register(MarketingPoster, MarketingAdmin)