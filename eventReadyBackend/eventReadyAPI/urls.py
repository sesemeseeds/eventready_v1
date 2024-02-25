from django.urls import path, include
from .views import * 
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register('event', EventViewset, 'event')
router.register('marketingPoster', MarketingPosterViewset, basename='marketingPoster')
router.register('marketingReminders', MarketingRemindersViewset, basename='marketingReminders')
router.register('marketingPhotos', MarketingRecapPhotoViewset, basename='marketingPhotos')
router.register('goals', GoalsViewset, basename='goals')

urlpatterns = router.urls
