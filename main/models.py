import datetime
from django.utils import timezone
from django.db import models
from django.contrib.sessions.models import Session
from django.conf import settings
from main.utils import generate_url_subpart


# Create your models here.


class MapLink(models.Model):
    link = models.URLField(verbose_name='LINK', max_length=600)
    short_link = models.URLField(verbose_name='Short LINK', unique=True,
                                 max_length=300)
    datetime = models.DateTimeField(auto_now=True)
    session = models.ForeignKey(Session, verbose_name='Сессия',
                                on_delete=models.PROTECT)

    # class Meta:
    #     unique_together = ('session', 'link',)

    @staticmethod
    def generate_list_timeout_cache():
        timeout_cache_list = MapLink.objects.filter(
            datetime__lte=timezone.now() - settings.LIVE_TIME_CACHE).values(
            'session_id',
            'short_link')
        timeout_cache_list = [
            '{}_{}'.format(link['session_id'], link['short_link']) for link in
            timeout_cache_list]
        return timeout_cache_list

    @staticmethod
    def clear_timeout_links():
        deleted_links = MapLink.objects.filter(
            datetime__lte=timezone.now() - settings.LIVE_TIME_CACHE).delete()
        return deleted_links
