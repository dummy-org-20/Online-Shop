# backend

# MariaDB installieren

## Für coole Leute

Downloadlink: https://downloads.mariadb.org/mariadb/10.5.2/#file_type=msi
Den TCP Port während der Installation auf 5077 ändern!

Anleitung zur Installation (mit kleinem Tutorial) der MariaDB: https://www.guru99.com/mariadb-tutorial-install.html

## Für Mac Boys

Einfach die Anleitung befolgen: https://mariadb.com/resources/blog/installing-mariadb-10-1-16-on-mac-os-x-with-homebrew/

# Datenbankstruktur

## shop-users

| id              | username    | password   | security_answer   | admin |
| --------------- | ----------- | ---------- | ----------------- | ----- |
| INT PRIMARY KEY | VARCHAR(25) | VARCHAR(64)| VARCHAR(64)       | BOOL  |

## shop-categories

Optional, falls es nicht funktioniert, einfach droppen und dann `category` als `VARCHAR` speichern.

| id              | name        | description |
| --------------- | ----------- | ----------- |
| INT PRIMARY KEY | VARCHAR(24) | VARCHAR(48) |

## shop-items

| id                  | creator_id | category | price | name        | description |
| ------------------- | --------   | -------- | ----- | ----------- | ----------- |
| INT PRIMARY KEY     | INT        | INT      | INT   | VARCHAR(24) | VARCHAR(48) |

## shop-item-images

| id                  | item_id  | url         | order | 
| ------------------- | -------- | ----------- | ----- |
| INT PRIMARY KEY     | INT      | VARCHAR(24) | INT   |

## shop-item-labels

item_id INT -> label VARCHAR

## shop-order-items

| order_id        | item_id  | amount   |
| --------------- | -------- | -------- |
| INT PRIMARY KEY | INT      | INT      |

## shop-orders

| id              | address     | status | user_id |
| --------------- | ----------- | ------ | ------- |
| INT PRIMARY KEY | VARCHAR(64) | INT    | INT     |