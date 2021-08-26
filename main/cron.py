from main.models import MapLink


def clear_timeout_redirects():
    deleted_links = MapLink.clear_timeout_links()
    return deleted_links

