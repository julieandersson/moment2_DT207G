# Moment 2.1 - DT207G
## README.md-fil för ett API
Denna uppgift gick ut på att skapa en applikation som hanterar arbetserfarenheter som innehåller information om tidigare arbetsroller och tidsperioder. Detta repo innehåller koden för ett enklare REST API som är byggt med Node.js och Express. APIet hanterar CRUD-operationer och har möjlighet till "cross origin request"  för att möjliggöra att köra webbtjänsten från andra domäner. Datan som är infogad i databasen är fiktiv.

### Länk
APIet är publicerat via Render:
https://moment2-dt207g-bqqf.onrender.com/, 
https://moment2-dt207g-bqqf.onrender.com/api/workexperience

### Installation, databas
APIet har skapats med PostgreSQL som databas. Klona ner källkodsfilerna med kommandot:
```bash
git clone https://github.com/julieandersson/moment2_DT207G.git
```

Kör därefter kommando npm install för att installera nödvändiga npm-paket. Kör installations-skriptet install.js. Installations-skriptet skapar databastabeller enligt nedan struktur:
|Tabell-namn|Fält  |
|--|--|
|workexperience  | **id** (SERIAL), **companyname** (TEXT), **jobtitle** (TEXT), **location** (TEXT), **startdate** (DATE), **enddate** (DATE), **description** (TEXT), **created** (TIMESTAMP)  |

### Användning
Nedan finns beskrivet hur man når APIet på olika vis:
|Metod  |Ändpunkt               |Beskrivning                                                                        |
|-------|-----------------------|-----------------------------------------------------------------------------------|
|GET    |api/workexperience     |Hämtar alla arbetserfarenheter.                                                    |
|GET    |api/workexperience/:id |Hämtar specifikt jobb med angivet ID.                                              |
|POST   |api/workexperience     |Lagrar/lägger till ett nytt jobb.
|PUT    |api/workexperience/:id |Uppdaterar ett befintligt jobb med ett specifikt angivet ID. |
|DELETE |api/workexperience/:id |Raderar ett jobb med ett specifikt angivet id.      

Vid POST och PUT krävs det att ett jobb-objekt skickas med.

Ett objekt returneras/skickas som JSON med följande struktur:

```json
  {
    "id": 1,
    "companyname": "Mittuniversitetet",
    "jobtitle": "Labbhandledare",
    "location": "Sundsvall",
    "startdate": "2018-12-31T23:00:00.000Z",
    "enddate": "2019-12-30T23:00:00.000Z",
    "description": "Handledning av studenter i kursen DT057G",
    "created_at": "2024-09-23T18:31:53.756Z"
  }
```
### Skapad av:
- Julie Andersson
- Webbutvecklingsprogrammet på Mittuniversitetet i Sundsvall
- Moment 2.1 i kursen DT207G Backendbaserad Webbutveckling


