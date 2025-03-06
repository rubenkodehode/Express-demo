#  Fun Facts API med SQL Server og Express

##  Beskrivelse
Dette er et **fullstack prosjekt** bygget med **Express.js** og **SQL Server (MSSQL)**.  
Brukere kan **registrere seg, logge inn og opprette fakta** via et REST API.  
Frontenden bruker **HTML, CSS og JavaScript** for å håndtere brukerinndata.

---

##  **Funksjoner**
- Brukerautentisering (`/auth/register`, `/auth/login`)  
- Sikker **passordhashing** med `bcryptjs`  
- **JWT-basert autentisering** for beskyttede ruter  
- Brukere kan hente sin egen profil (`/user/`)  
- Fakta-endepunkter:
  - **GET `/facts/`** – Henter alle fakta  
  - **GET `/facts/random/`** – Henter en tilfeldig fakta  
  - **GET `/facts/:id`** – Henter en spesifikk fakta  
  - **POST `/facts/`** – Oppretter en ny fakta (kun for innloggede brukere)  

---

##  **Hva som gjenstår å implementere**
- Databasen må implementeres riktig
- Automatisk sletting av utdaterte JWT-tokens 
- Mulighet for brukere å slette/redigere egne fakta  

