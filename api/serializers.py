from django.contrib.sessions.models import Session

from rest_framework import serializers
from main.models import MapLink, generate_url_subpart


class MapLinkSerializer(serializers.Serializer):
    link = serializers.URLField(max_length=600)
    short_link = serializers.CharField(max_length=300, allow_blank=True)
    session = serializers.CharField(max_length=100, required=False)

    def create(self, validated_data):
        return MapLink.objects.create(**validated_data)

    def validate_short_link(self, value):
        """
        Check that the blog post is about Django.
        """
        if value:
            if MapLink.objects.filter(short_link=value).exists():
                raise serializers.ValidationError(
                    'Subpart "{}" already exist!'.format(value))
        else:
            value = generate_url_subpart()
        return value
