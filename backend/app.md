## app.get("/user/:name", function (req, res)):
    Diese Funktion greift auf die Datenbank zu und liefert die Ergebnisse der user-Tabelle
    zum Parameter ":name". 
    Anschließend werden die zurückgegebenen Datenbank-Einträge in das user.js-Objekt gemappt und als
    json zurückgegeben.

## app.get("/login", function(req, res)):
    Hier wird zuerst durch einen Session-ID-Cookie geprüft, ob der Nutzer bereits eingeloggt ist und entsprechend status 200, message: "Yes" zurückgegeben oder es wird ein login mit username und passwort beantragt.
    Bei Login mit zwei query-Parametern (name, password) ausgeführt und auf die entsprechenden Einträge in der
    Datenbanktabelle zugegriffen. Sollte der User nicht existieren oder das Password falsch sein wird der HTML-Status
    418 und die Fehlermeldung "No" zurückgegeben. 
    Wenn die Authentifizierung erfolgreich war wird der HTML-Status 200 und die Meldung "Yes" zurückgegeben.

## app.get("/getWarenkorb", function(req, res):
    Hier erhälst du eine JSON mit den jetzigen Items und den URLs der Bildern in richtiger Reihenfolge sortiert des derzeitigen Users. Gibt null zurück wenn der Cookie nicht exisitiert.
	Hier ein Beispiel:
	[{"id":1,"creator_id":1,"category_id":1,"price":300,"name":"xd","description":"lol","urls":{"0":"asdasdasd","1":"xsdsddss"}},{"id":2,"creator_id":3,"category_id":2,"price":400,"name":"f","description":"f","urls":{}}]

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