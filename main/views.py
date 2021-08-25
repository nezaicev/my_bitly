import logging
from django.core.cache import cache
from django.conf import settings
from django.shortcuts import render, HttpResponse, redirect
from django.contrib import messages
from django.db import IntegrityError
from main.models import MapLink
from main.forms import CreateLinkForm
from main.utils import generate_url_subpart

logger = logging.getLogger(__name__)
# Create your views here.


def test(request):
    if request.method == 'GET':
        links = MapLink.objects.filter(session=request.session.session_key)
        return render(request, template_name='main/test.html',
                      context={'links': links, 'form': CreateLinkForm,
                               'domain': request.META['HTTP_HOST']})

    if request.method == 'POST':
        logger.info('test')
        form = CreateLinkForm(request.POST)
        if form.is_valid():
            link = form.cleaned_data['link']
            subpart = form.cleaned_data['short_link']
            if not subpart:
                subpart = generate_url_subpart(4)
                if MapLink.objects.filter(short_link=subpart).exists():
                    subpart = generate_url_subpart(4)

            short_link = subpart

            try:
                MapLink.objects.create(link=link, short_link=short_link,
                                       session_id=request.session.session_key)
                cache.set(
                    '{}_{}'.format(request.session.session_key, short_link),
                    link, settings.LIVE_TIME_CACHE.seconds*2)

            except IntegrityError:
                messages.add_message(request, messages.ERROR,
                                     'Subpart "{}" already exists'.format(
                                         short_link))

            return redirect(request.META.get('HTTP_REFERER'))
