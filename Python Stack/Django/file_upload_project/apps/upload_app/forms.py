from django import forms

class UploadFileForm(forms.Form):
    file = forms.FileField()
    title = forms.CharField()