## app.get("/user/:name", function (req, res)):
    Diese Funktion greift auf die Datenbank zu und liefert die Ergebnisse der user-Tabelle
    zum Parameter ":name". 
    Anschließend werden die zurückgegebenen Datenbank-Einträge in das user.js-Objekt gemappt und als
    json zurückgegeben.

## app.get("/login", function(req, res)):
    Hier wird der Login mit zwei query-Parametern (name, password) ausgeführt und auf die entsprechenden Einträge in der
    Datenbanktabelle zugegriffen. Sollte der User nicht existieren oder das Password falsch sein wird der HTML-Status
    418 und die Fehlermeldung "No" zurückgegeben. 
    Wenn die Authentifizierung erfolgreich war wird der HTML-Status 200 und die Meldung "Yes" zurückgegeben.
<<<<<<< Updated upstream
	
## app.get("/getWarenkorb", function(req, res):
    Hier erhälst du eine JSON mit den jetzigen Items des derzeitigen Users. Gibt eine leere JSON zurück wenn der Cookie nicht exisitiert oder keine Items da sind.
=======

## app.get("/search", function(req, res)):
    Hier kann die Item-Tabelle über zwei Query-Parameter durchsucht werden (item, category). Der item-Parameter legt den
    Item-Namen fest, nach dem gesucht werden soll. category kann mehrere, einen oder keinen Wert enthalten und legt die
    Kategorien fest, in denen nach dem durch "item" spezifizierten Namen gesucht werden soll. Bei keinem Wert in category
    wird in allen Kategorien gesucht.
    Wenn der Nutzer bei mehreren Kategorie-Eingaben eine falsche (nicht-existente) eingibt, wird diese einfach übersprungen.
    Wenn der Nutzer nur eine Kategorie eingibt und diese falsch ist wird eine Fehlermeldung und die HTTP-Statusmeldung 400: 
    Bad Request ausgegeben.
>>>>>>> Stashed changes
