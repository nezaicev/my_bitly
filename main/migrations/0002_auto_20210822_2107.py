# Generated by Django 3.2.6 on 2021-08-22 21:07

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='maplink',
            name='short_url',
        ),
        migrations.RemoveField(
            model_name='maplink',
            name='url',
        ),
        migrations.AddField(
            model_name='maplink',
            name='link',
            field=models.URLField(default=1, max_length=600, unique=True, verbose_name='LINK'),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='maplink',
            name='short_link',
            field=models.URLField(default=1, max_length=300, unique=True, verbose_name='Short LINK'),
            preserve_default=False,
        ),
    ]
