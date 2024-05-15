# Generated by Django 5.0.1 on 2024-01-28 23:17

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('eventReadyAPI', '0005_alter_eventgeneralinfo_description_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='eventgeneralinfo',
            name='description',
            field=models.CharField(blank=True, max_length=1024, null=True, verbose_name='Description'),
        ),
        migrations.AlterField(
            model_name='eventgeneralinfo',
            name='doe',
            field=models.DateField(blank=True, null=True, verbose_name='Day of Event'),
        ),
        migrations.AlterField(
            model_name='eventgeneralinfo',
            name='end_time',
            field=models.TimeField(blank=True, null=True, verbose_name='End Time'),
        ),
        migrations.AlterField(
            model_name='eventgeneralinfo',
            name='location',
            field=models.CharField(blank=True, max_length=100, null=True, verbose_name='Location'),
        ),
        migrations.AlterField(
            model_name='eventgeneralinfo',
            name='start_time',
            field=models.TimeField(blank=True, null=True, verbose_name='Start Time'),
        ),
    ]