## app.get("/user", function (req, res)):
    Diese Funktion gibt den dezeitigen User mit den Attributen: id, username, admin
	Kann ausgebaut werden, falls ein User mehr attribute haben soll.

## app.post("/login", function(req, res)):
    Hier wird zuerst durch einen Session-ID-Cookie geprüft, ob der Nutzer bereits eingeloggt ist und entsprechend status 200, message: "Yes" zurückgegeben oder es wird ein login mit username und passwort beantragt.
    Bei Login mit zwei query-Parametern (username, password) ausgeführt und auf die entsprechenden Einträge in der
    Datenbanktabelle zugegriffen. Sollte der User nicht existieren oder das Password falsch sein wird der HTML-Status
    400 und die Fehlermeldung "No" zurückgegeben. 
    Wenn die Authentifizierung erfolgreich war wird der HTML-Status 200 und die Meldung "Yes" zurückgegeben.

## app.post("/logout"):
	löscht die Cookie Verbindung vom derzeitigen User in der DB. 
	Wenn der User ein temp-User wird dieser als unbenutzt markiert und sein Warenkorb wird gelöscht.

## app.post("/register"):
	Hier wird ein neuer User erstellt. Benötigt die Parameter "username","password" und "security_answer". Wenn ein User mit dem Username schon existiert, wird die Antwort 400 "User already exists" gesendet.
	Ansonsten wird der neue user erstellt und automatisch auch mit diesem User eingeloggt. Es können keine Admin accounts per Webseite erstellt werden.
	
##app.get("/userAll"):
	Diese Funktion gibt dem User, falls dieser Admin ist, alle User die derzeitig in der DB existieren mit ALLEN Daten der User als json zurück.
	Kann für die Benutzer Verwaltung verwendet werden. 

## app.get("/getWarenkorb", function(req, res):
    Hier erhälst du eine JSON mit den jetzigen Items und deren Anzahl des derzeitigen Users. Gibt null zurück wenn der Cookie nicht exisitiert.
	Hier ein Beispiel:
	[{"item_id":2,"amount":5},{"item_id":3,"amount":2}]
	
## app.post("/setWarenkorb", function(req, res):
    Setze Ein item in den Warenkorb des jetzigen User (funktioniert über Cookie "sessionID").
	Bei der Anfrage müssen die Anfrage Parameter item_id und count als int gegeben werden.
	Es wird automatisch ein existierendes Item geupdatet.
	Wenn ein Item entfernt werden sollen, muss ein negativer count gleich dem vorherigen count angegeben werden.
	

## app.get("/search", function(req, res)):
    Hier kann die Item-Tabelle über zwei Query-Parameter durchsucht werden (item, category). Der item-Parameter legt den
    Item-Namen fest, nach dem gesucht werden soll. category kann mehrere, einen oder keinen Wert enthalten und legt die
    Kategorien fest, in denen nach dem durch "item" spezifizierten Namen gesucht werden soll. Bei keinem Wert in category
    wird in allen Kategorien gesucht.
    Wenn der Nutzer bei mehreren Kategorie-Eingaben eine falsche (nicht-existente) eingibt, wird diese einfach übersprungen.
    Wenn der Nutzer nur eine Kategorie eingibt und diese falsch ist wird eine Fehlermeldung und die HTTP-Statusmeldung 400: 
    Bad Request ausgegeben.

## app.get("/item/:id", function(req, res)):
    Hier kann sich ein Item mit der gegebenen ID geholt werden aus der Datenbank. Gibt das Item oder "no" zurück.

## app.post("/item.insert", function(req, res)):
    Damit kann ein Item in die Datenbank geschrieben werden. Die Daten für das Item werden den Query-Parametern entnommen.
    Gibt die ID von dem neu hinzugefügten Item oder "no" zurück.
    Muss mit einem "SessionId" Cookie authorisiert werden.

## app.post("/item.delete", function(req, res)):
    Damit kann ein Item gelöscht werden. Die ID wird den Query Parametern entnommen.
    Gibt "200" zurück, wenn es erfolgreich war.
    Benötigt eine "SessionId".
	
## app.post("/buy")
	Benötigt den Parameter "address". Kauft alles im Warenkorb und erstellt einen neuen leeren Warenkorb für den User.
	User muss eingeloggt sein um zu kaufen.