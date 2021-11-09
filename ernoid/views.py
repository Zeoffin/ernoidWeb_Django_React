from django.shortcuts import render, redirect


def main(request, *args, **kwargs):
    return render(request, 'ernoid/index.html')
