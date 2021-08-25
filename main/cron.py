import logging
import datetime
from django.core.cache import cache
from main.models import MapLink

logger = logging.getLogger(__name__)


def clear_cache(timeout_cache_list):
    for key in timeout_cache_list:
        cache.delete(key)


def clear_timeout_redirects():
    deleted_links = MapLink.clear_timeout_links()
    # timeout_cache_list = MapLink.generate_list_timeout_cache()
    # clear_cache(timeout_cache_list)
    # logger.info('Delete links in db - {}'.format(deleted_links))
    # logger.info('Clear cache - {}'.format(timeout_cache_list))

