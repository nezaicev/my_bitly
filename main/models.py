import datetime
import secrets
from django.utils import timezone
from django.db import models
from django.contrib.sessions.models import Session
from django.conf import settings


# Create your models here.


class MapLink(models.Model):
    link = models.URLField(verbose_name='LINK', max_length=600)
    short_link = models.URLField(verbose_name='Short LINK', unique=True,
                                 max_length=300)
    datetime = models.DateTimeField(auto_now=True)
    session = models.ForeignKey(Session, verbose_name='Сессия',
                                on_delete=models.PROTECT)

    @staticmethod
    def clear_timeout_links():
        deleted_links = MapLink.objects.filter(
            datetime__lte=timezone.now() - settings.LIVE_TIME_CACHE).delete()
        return deleted_links


def generate_url_subpart():
    subpart = secrets.token_urlsafe(settings.COMPLEXITY_GENERATE_SHORT_URL)
    while MapLink.objects.filter(short_link=subpart).exists():
        subpart = secrets.token_urlsafe(settings.COMPLEXITY_GENERATE_SHORT_URL)
    return subpart
