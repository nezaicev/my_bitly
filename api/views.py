from django.contrib.sessions.models import Session
from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status

from main.models import MapLink
from api.serializers import MapLinkSerializer


def index(request):
    return render(request, template_name='api/index.html')


class GetMapLinkView(APIView):

    def get(self, request):
        queryset = MapLink.objects.all()
        serializer_for_queryset = MapLinkSerializer(
            instance=queryset,
            many=True
        )
        return Response(serializer_for_queryset.data)

    def post(self, request):
        redirect = request.data.get('redirect')
        serializer = MapLinkSerializer(data=redirect)
        if serializer.is_valid(raise_exception=True):
            serializer.save(session=Session.objects.get(
                session_key=request.session.session_key))
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
