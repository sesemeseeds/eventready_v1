# Generated by Django 4.2.10 on 2024-02-23 19:54

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        (
            "eventReadyAPI",
            "0012_marketingposter_event_marketingrecapphotos_event_and_more",
        ),
    ]

    operations = [
        migrations.RenameField(
            model_name="marketingposter", old_name="event", new_name="event_id",
        ),
        migrations.RenameField(
            model_name="marketingrecapphotos", old_name="event", new_name="event_id",
        ),
        migrations.RenameField(
            model_name="marketingreminders", old_name="event", new_name="event_id",
        ),
    ]