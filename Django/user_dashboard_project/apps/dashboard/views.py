# -*- coding: utf-8 -*-
from __future__ import unicode_literals
from django.views.generic import View
from django.shortcuts import render, redirect, reverse
from ..users.models import User
from ..users.functions import setPST, login_required
from django.utils.decorators import method_decorator

# Create your views here.
class DashboardIndex(View):
    @method_decorator(login_required)
    def get(self, request):
        setPST()
        users = User.objects.all()
        admin = False
        if request.session['user_level'] == 9:
            admin = True
        context = {
            'users': users,
            'admin': admin,
        }
        return render(request, 'dashboard_app/dashboard_index.html', context)

class DashboardRedirect(View):
    def get(self, request):
        return redirect(reverse('dashboard-index'))