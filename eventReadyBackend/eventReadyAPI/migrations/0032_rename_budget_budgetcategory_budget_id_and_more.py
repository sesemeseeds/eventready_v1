# Generated by Django 4.2.10 on 2024-03-25 18:18

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("eventReadyAPI", "0031_remove_budget_leftover_remove_budget_name_and_more"),
    ]

    operations = [
        migrations.RenameField(
            model_name="budgetcategory", old_name="budget", new_name="budget_id",
        ),
        migrations.RenameField(
            model_name="budgetitem", old_name="budget", new_name="budget_id",
        ),
        migrations.RenameField(
            model_name="budgetitem", old_name="category", new_name="category_id",
        ),
        migrations.AddField(
            model_name="budget",
            name="total",
            field=models.FloatField(default=0, verbose_name="Total"),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name="budgetcategory",
            name="total",
            field=models.FloatField(default=3000.0, verbose_name="Total"),
            preserve_default=False,
        ),
    ]
