## -*- coding: utf-8 -*-

import urllib
import urllib2
import json
import time

print("  ")
print("Operations:")
print("1 - add doctor")
print("2 - add pacient")
print("3 - add diagnose")
print("4 - get database")
print("  ")

# создание JSON строки из объекта
def createJSONstring(obj):
	s = json.dumps(obj)
	return s
	
# отправка GET запроса
def sendGet():
	url = 'http://localhost:5007/'
	result = urllib.urlopen(url).read()
	print("GET")
	print("Url: " + url)
	print("Answer: " + result)
	return result

# отправка POST запроса
def sendPost(body):
	headers = {'User-Agent' : 'python urllib2'}
	data = body
	url = 'http://localhost:5007/add/'
	req = urllib2.Request(url, data, headers)
	response = urllib2.urlopen(req)
	result = response.read()
	print("POST")
	print("Url: " + url)
	print("Body: " + data)
	print("Answer: " + result)
	print("  ")
	print("  ")
	print(result)
	print("  ")
	print("  ")

print("Input operation number")
k = int(str(raw_input()))

if k == 1:
	print("Input name:")
	name = str(raw_input())
	print("Input job:")
	job = str(raw_input())
	x = createJSONstring({"name": name,"job": job, "type":"addDoctor"})
	sendPost(x)
	
if k == 2:
	print("Input name:")
	name = str(raw_input())
	print("Input age:")
	age = str(raw_input())
	print("Input gender:")
	gender = str(raw_input())
	x = createJSONstring({"name": name,"age":age, "gender":gender, "type":"addPatient"})
	sendPost(x)

if k == 3:
	print("Input doctorID:")
	doctorID = str(raw_input())
	print("Input patientID:")
	patientID = str(raw_input())
	print("Input diagnose:")
	diagnose = str(raw_input())
	x = createJSONstring({"doctorID": doctorID,"patientID":patientID, "diagnose":diagnose, "type":"addDiagnose"})
	sendPost(x)
	
if k == 4:
	sendGet()

