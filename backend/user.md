## constructor(dic,callback)
    Der Konstukter des User Objekts. Gibt alle Attribute in dem dic Dictionary dem User Objekt.
	Es können folgende Attribute in dic sein:
	id, username, password, security_answer, admin, isTemporary, isUsed, cookie und db
	Es ist egal in welcher Reihenfolge diese stehen. Ein Bsp.:
	{"id":"","username":"", "password":"","security_answer":"","admin":false,"isTemporary":false,"isUsed":false,"cookie":"","db":db}
	
	Das dic Dictionary benötigt zumindest den Eintrag {"db":db}, alle anderen Paramter sind optional.
	Falls ein Cookie übergeben werden sollte, wird das Objekt bei der Initialisierung mit den Daten des Users, der mit dem Cookie verbunden ist, befüllt.
	Wenn der User des Cookies nicht gefunden wurde, wird das Objekt so gelassen, wie es Initialisiert wurde.
	Callback ist optional. Wird benötigt, falls ein User mit dem Cookie gesucht wurde. Callback erhält den User nach der Initialisierung.

## addUser(callback)
    Hier wird ein neuer User in der Datenbank erstellt. Es werden alle Daten des *this* Users in die Datenbank eingetragen außer id,cookie und db. Erhält im Callback die ID des neu erstellten Users.
	*WICHTIG:* 1. es muss vorher geprüft werden, ob ein anderer User mit dem selben username exisitiert. 2. Die Attribute username, password, security_answer, admin, isTemporary, isUsed müssen befüllt sein im *this* Objekt.

## getTempUser(callback)
	Holt einen Tempuser aus der Datenbank, setzt diesen auf benutzt, und gibt im Callback die ID des TempUsers zurück, die benutzt werden kann.
	
## getTemporary()
	gibt zurück, ob der jetzige User Temporär ist.

## exists(callback)
	Prüft, ob ein user mit dem username des jetzigen Objekts (also *this*.username) in der Datenbank schon existiert. Gibt im Callback true/false zurück.
	
## getUser(username,password,callback)
    Überschreibt den jetzigen User mit den Daten des User mit den passenden username/password. Gibt im Callback den überschrieben User zurück wenn die Daten stimmten, ansonsten wird das ungeänderte *this* Objekt
	an den Callback weitergegeben.
	

## getUserByID(id,callback)
    Sollte nur benutzt werden, wenn die ID in der Datenbank existiert. Gibt dem Callback den User weiter, der die eingegebene ID besitzt.
	
## connectUserWithCookie(cookie,callback)
	Verbindet den jetzigen User (also dessen ID) mit dem Cookie in der Datenbank.
	Falls der Cookie einem anderen User gehört, wird es bei ihm überschrieben. Falls der jetzige User schon einen Cookie besitzt wird dieser überschrieben.
	*WICHTIG:* Die ID muss im User gesetzt sein und einem validen User gehören.
	callback wird nur genutzt, um Code auszuführen, nachdem der Cookie gesetzt wurde.

## disconnectCookieFromUser(callback)
    Hier wird der Cookie des jetzigen Nutzer aus der Datenbank gelöscht.
	Der jetzige Nutzer muss eine id haben.
	Callback wird genutzt, um code auszuführen, nachdem die Funktion fertig ist.

## markUnused(callback)
	Markiert den jetzigen User in der Datenbank als Unused. Sollte derzeit nur bei TempUsers genutzt werden.
	Callback wird genutzt, um code auszuführen, nachdem die Funktion fertig ist.
	
## markUsed(callback)
	Markiert den jetzigen User in der Datenbank als Used. Sollte derzeit nur bei TempUsers genutzt werden.
	Callback wird genutzt, um code auszuführen, nachdem die Funktion fertig ist.
	
## isAdmin()
	Gibt zurück, ob der jetzige User Admin ist.
	
## isEmpty()
	Gibt zurück, ob der jetzige User, außer der Datenbank und dem Cookie, leer ist.
	Kann genutzt werden, um zu prüfen ob ein User durch den Cookie gefunden wurde.
	
## getWarenkorb(callback)
	Gibt den Warenkorb des jetzigen Users im Callback zurück

## mergeWarenkorb(user,callback)
	fügt alle Items aus dem Warenkorb von user in den Warenkorb des jetzigen User (also *this* user)