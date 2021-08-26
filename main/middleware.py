from django.core.cache import cache
from django.shortcuts import redirect
from django.urls import resolve


def redirect_middleware(get_response):
    def middleware(request):
        request.session.set_test_cookie()
        link_cache = cache.get(
            '{}_{}'.format(request.session.session_key,
                           request.path[1:]))
        if link_cache:
            return redirect(link_cache)

        response = get_response(request)

        return response

    return middleware
