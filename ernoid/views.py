from django.shortcuts import render

def main(request, *args, **kwargs):
    return render(request, 'ernoid/index.html')
