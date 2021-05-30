from django.http import HttpResponse

def main(request, *args, **kwargs):
    return HttpResponse('API call endpoint')