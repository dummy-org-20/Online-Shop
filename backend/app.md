## app.get("/user/:name", function (req, res):
    Diese Funktion greift auf die Datenbank zu und liefert die Ergebnisse der user-Tabelle
    zum Parameter ":name". 
    Anschließend werden die zurückgegebenen Datenbank-Einträge in das user.js-Objekt gemappt und als
    json zurückgegeben.

## app.get("/login", function(req, res):
    Hier wird der Login mit zwei query-Parametern (name, password) ausgeführt und auf die entsprechenden Einträge in der
    Datenbanktabelle zugegriffen. Sollte der User nicht existieren oder das Password falsch sein wird der HTML-Status
    418 und die Fehlermeldung "No" zurückgegeben. 
    Wenn die Authentifizierung erfolgreich war wird der HTML-Status 200 und die Meldung "Yes" zurückgegeben.
