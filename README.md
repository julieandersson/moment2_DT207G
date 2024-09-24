# Moment 2.1 - DT207G
## README.md-fil för ett API
Denna uppgift gick ut på att skapa en applikation som hanterar arbetserfarenheter som innehåller information om tidigare arbetsroller och tidsperioder. Detta repo innehåller koden för ett enkelare REST API som är byggt med Node.js och Express. APIet hanterar CRUD-operationer och har möjlighet till "cross origin request"  för att möjliggöra att köra webbtjänsten från andra domäner. Datan som är infogad i databasen är fiktiv.

### Länk
En liveversion av APIet finns tillgänglig på följande URL:

### Installation, databas
APIet har skapats med PostgreSQL som databas. Klona ner källkodsfilerna med kommandot:
git clone https://github.com/julieandersson/moment2_DT207G.git

Kör därefter kommando npm install för att installera nödvändiga npm-paket. Kör installations-skriptet install.js. Installations-skriptet skapar databastabeller enligt nedan struktur:
|Tabell-namn|Fält  |
|--|--|
|workexperience  | **id** (SERIAL), **companyname** (TEXT), **jobtitle** (TEXT), **location** (TEXT), **startdate** (DATE), **enddate** (DATE), **description** (TEXT), **created** (TIMESTAMP)  |




