# -*- coding: utf-8 -*-
from __future__ import unicode_literals
from random import randint
from django.db import models
from time import strftime, localtime

#checks session for missing keys and rebuilds them
def checkSession(request):
    if not 'gold' in request.session.keys():
        request.session['gold'] = 0
    if not 'log' in request.session.keys():
        request.session['log'] = ""

#resets session
def reset(request):
    request.session.clear()

#adds a log entry (HTML) for gold received
def logGold(request, amount, location):
    #make sure our session has proper keys/values in it
    checkSession(request)

    #temp is a tuple based on amount value; affects formatting and wording of the log entry
    if amount >= 0:
        temp = ("gained_gold", "Earned", "!")
    else:
        temp = ("lost_gold", "Lost", "... Ouch.")

    #save gold earned
    request.session['gold'] += amount
    #get an absolute value of gold added/lost, since we don't want signs in our log
    if amount < 0:
        amount *= -1

    #get current time
    time = strftime('%Y/%m/%d %I:%M %p', localtime())

    #generate html log entry
    html = "<p class='{}'>{} {} gold after visiting the {}{} ({})".format(temp[0], temp[1], amount, location, temp[2], time)

    #append the new entry to the existing log
    request.session['log'] += html
    #make sure the session is saved
    request.session.modified = True

#adds between a and b gold to the session and updates the log
def generateGold(request, location):
    #gets a tuple of min/max gold for the visited location
    goldAmt = getGoldAmounts(location)
    #generates a log entry
    logGold(request, randint(goldAmt[0], goldAmt[1]), location)

#returns a tuple containing the min and max amount of gold that can be obtained from a location
def getGoldAmounts(location):
    if location == 'farm':
        return (10,20)
    if location == 'cave':
        return (5,10)
    if location == 'forest':
        return (2,5)
    if location == 'casino':
        return (-50,50)