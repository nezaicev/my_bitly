from django.core.validators import URLValidator
from django import forms


class CreateLinkForm(forms.Form):
    link=forms.URLField(max_length=200, validators=[URLValidator])
    short_link=forms.CharField(max_length=200, required=False, label='subpart')