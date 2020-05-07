Benötigte Module:
	-mariadb

Benötigte Dateien:
	-config.json (mehr dazu bei config.json.rm)

Das dbconnect Objekt besitzt 3 Funktionen:

start():
	Diese Funktion verbindet das dbconnect Objekt mit der Datenbank mithilfe der Daten in der config.json.
	Die Funktion ist asynchron und gibt ein Promise-Objekt zurück, welches angibt, ob das dbconnect-Objekt sich verbunden hat oder nicht.
	Es sollte gewartet werden, bis diese Funktion fertig ist, bis die anderen Funktionen des Objekts aufgerufen werden.
	Das Objekt ist zu keiner Datenbank verbunden, weshalb changeDatabase() danach aufgerufen werden soll.

changeDatabase(String database):
	Diese Funktion ändert die Datenbank des dbconnect-Objekts zu dem String database. Das Objekt muss schon vorher start() ausgeführt haben, damit diese Funktion funktioniert.
	Die Funktion ist asynchron und gibt ein Promise-Objekt zurück, welches angibt, ob das dbconnect-Objekt die Datenbank ändern konnte.

search(String query, callback(result)):
	Diese Funktion ist synchron. Sie führt die query auf der jetzigen Datenbank aus und gibt das Ergebnis in die callback Funktion zurück.

safeSearch(String query, List parameters, callback(result)):
	Asynchron, callback gibt das Result zurück. In der Query stehen '?' für je ein Objekt in der Parameterliste. Gleichzusetzen mit PreparedStatements.
	
