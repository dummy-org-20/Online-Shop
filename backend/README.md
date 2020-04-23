# backend

# MariaDB installieren

## Für coole Leute

Downloadlink: https://downloads.mariadb.org/mariadb/10.5.2/#file_type=msi
Den TCP Port während der Installation auf 5077 ändern!

Anleitung zur Installation (mit kleinem Tutorial) der MariaDB: https://www.guru99.com/mariadb-tutorial-install.html

## Für Mac Boys

Einfach die Anleitung befolgen: https://mariadb.com/resources/blog/installing-mariadb-10-1-16-on-mac-os-x-with-homebrew/

# Node installieren

Alles hier dokumentiert: https://nodejs.org/en/download/

Überprüfen mit `npm -v` und `node -v`.

# Node Server starten

In diesem Verzeichnis `npm install` ausführen. Nun sollte ein `node_modules` Ordner existieren. Danach `npm start` benutzen und bam, es geht.

# Datenbankstruktur

**Database erstellen:**

```sql=
CREATE DATABASE shop;
```

## shop_users

| id              | username    | password   | security_answer   | admin |
| --------------- | ----------- | ---------- | ----------------- | ----- |
| INT PRIMARY KEY | VARCHAR(25) | VARCHAR(64)| VARCHAR(64)       | BOOL  |

**Erstellen:**

```sql=
CREATE TABLE shop_users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(25) NOT NULL,
    password VARCHAR(64) NOT NULL,
    security_answer VARCHAR(64),
    admin BOOL
);
```

## shop_categories

Optional, falls es nicht funktioniert, einfach droppen und dann `category` als `VARCHAR` speichern.

| id              | name        | description |
| --------------- | ----------- | ----------- |
| INT PRIMARY KEY | VARCHAR(24) | VARCHAR(48) |

**Erstellen:**

```sql=
CREATE TABLE shop_categories (
    id INT AUTO_INCREMENT PRIMARY KEY,
    description VARCHAR(48)
);
```

## shop_items

| id                  | creator_id | category_id | price | name        | description |
| ------------------- | --------   | ----------- | ----- | ----------- | ----------- |
| INT PRIMARY KEY     | INT        | INT         | INT   | VARCHAR(24) | VARCHAR(48) |

**Erstellen:**

```sql=
CREATE TABLE shop_items (
    id INT AUTO_INCREMENT PRIMARY KEY,
    creator_id INT NOT NULL,
    category_id INT,
    price INT,
    name VARCHAR(24),
    description VARCHAR(48)
);
```

## shop_item_images

| id                  | item_id  | url         | order | 
| ------------------- | -------- | ----------- | ----- |
| INT PRIMARY KEY     | INT      | VARCHAR(24) | INT   |

**Erstellen:**

```sql=
CREATE TABLE shop_item_images (
    id INT AUTO_INCREMENT PRIMARY KEY,
    item_id INT NOT NULL,
    url VARCHAR(24),
    order INT
);
```

## shop_item_labels

item_id INT -> label VARCHAR

## shop_order_items

| order_id        | item_id  | amount   |
| --------------- | -------- | -------- |
| INT PRIMARY KEY | INT      | INT      |

**Erstellen:**

```sql=
CREATE TABLE shop_order_items (
    order_id INT,
    item_id INT,
    amount INT
);
```

## shop_orders

| id              | address     | status | user_id |
| --------------- | ----------- | ------ | ------- |
| INT PRIMARY KEY | VARCHAR(64) | INT    | INT     |

**Erstellen:**

```sql=
CREATE TABLE shop_orders (
    id INT AUTO_INCREMENT PRIMARY KEY,
    address VARCHAR(64),
    status INT,
    user_id INT
);
```