from django.conf import settings
from django.core.cache import cache
from django.contrib import messages
from django.db import IntegrityError
from django.core.paginator import Paginator
from django.shortcuts import render, redirect

from main.models import MapLink, generate_url_subpart
from main.forms import CreateLinkForm


# Create your views here.


def index(request):
    if request.method == 'GET':
        links = MapLink.objects.filter(session=request.session.session_key)
        paginator = Paginator(links, 2)

        page_number = request.GET.get('page')
        page_obj = paginator.get_page(page_number)
        return render(request, template_name='main/index.html',
                      context={'links': links, 'page_obj': page_obj,
                               'form': CreateLinkForm,
                               'domain': request.META['HTTP_HOST']})

    if request.method == 'POST':
        form = CreateLinkForm(request.POST)
        if form.is_valid():
            link = form.cleaned_data['link']
            subpart = form.cleaned_data['short_link']
            if not subpart:
                subpart = generate_url_subpart()

            short_link = subpart
            try:
                MapLink.objects.create(link=link, short_link=short_link,
                                       session_id=request.session.session_key)
                cache.set(
                    '{}_{}'.format(request.session.session_key, short_link),
                    link, settings.LIVE_TIME_CACHE.seconds * 2)

            except IntegrityError:
                messages.add_message(request, messages.ERROR,
                                     'Subpart "{}" already exists'.format(
                                         short_link))

            return redirect(request.META.get('HTTP_REFERER'))
