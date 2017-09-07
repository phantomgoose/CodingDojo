# -*- coding: utf-8 -*-
from __future__ import unicode_literals
from django.middleware.csrf import get_token
from django.shortcuts import render, redirect

items = [{
        'name': 'Dojo Tshirt',
        'id': 1,
},
{
    'name': 'Dojo Sweater',
    'id': 2,
},
{
    'name': 'Dojo Cup',
    'id': 3,
},
{
    'name': 'Algorithm Book',
    'id': 4,
}]

price_db = {
    1: 19.99,
    2: 29.99,
    3: 4.99,
    4: 49.99,
}

# Create your views here.
def index(request):
    
    #this should ideally go into model
    global items
    global price_db

    store_data = ""
    #the lengths I go to to avoid typing out the test store items manually in index.html lol
    csrf_string = get_token(request)

    for item in items:
        store_data += "<tr><th>{}</th><th>{}</th><th><form action='/amadon/buy' method='POST'>{}<input type='hidden' name='csrfmiddlewaretoken' value='{}'><input type='hidden' name='id' value={}><input type='submit' value='Buy!'></form></th></tr>".format(item['name'], price_db[item['id']], "<select name='amount'>{}</select>".format(push10options()), csrf_string, item['id'])

    context = { 'data': store_data }

    return render(request, 'amadon_app/index.html', context)

def push10options():
    html = ""
    for i in range(1,11):
        html += "<option value=" + str(i) + ">" + str(i) + "</option>"
    return html

def buy(request):
    amount = int(request.POST['amount'])
    item_id = int(request.POST['id'])
    request.session['last_price'] = price_db[item_id] * amount
    if 'order_history' not in request.session.keys():
        request.session['order_history'] = []
    request.session['order_history'].append({ 'id': item_id, 'amount': amount})
    if 'total_spend' not in request.session.keys():
        request.session['total_spend'] = 0.0
    request.session['total_spend'] += request.session['last_price']
    if 'total_orders' not in request.session.keys():
        request.session['total_orders'] = 0
    request.session['total_orders'] += amount
    request.session.modified = True
    return redirect('/amadon/checkout')

def checkout(request):
    return render(request, 'amadon_app/checkout.html')

def home(request):
    request.session.clear()
    return redirect('/amadon')