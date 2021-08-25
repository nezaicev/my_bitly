from django.core.cache import cache
from django.shortcuts import render, HttpResponse, redirect


def redirect_middleware(get_response):

    def middleware(request):
        request.session.set_test_cookie()
        link = cache.get(
            '{}_{}'.format(request.session.session_key, request.path[1:]))
        if link:
            return redirect(link)

        response = get_response(request)

        return response

    return middleware
