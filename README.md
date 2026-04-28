# GameRoom 🎮

Application web full-stack de gestion de salles de jeux en ligne avec fonctionnalités temps réel.

## 🚀 Démo

- **Frontend** : https://gameroom-frontend.onrender.com
- **Backend** : https://gameroom-backend-2r55.onrender.com

## 🛠️ Stack Technique

**Backend** : Node.js, Express, MongoDB, Mongoose, JWT, Bcrypt, Socket.io

**Frontend** : Angular 19, TypeScript, SCSS, Socket.io-client

**Déploiement** : Render (Backend Web Service + Frontend Static Site), Docker, GitHub Actions CI/CD

## 📁 Structure du Projet

GameRoom/
├── code/
│   ├── backend/
│   │   ├── src/
│   │   │   ├── config/
│   │   │   ├── controllers/
│   │   │   ├── middleware/
│   │   │   ├── models/
│   │   │   ├── routes/
│   │   │   ├── services/
│   │   │   └── socket/
│   │   ├── server.js
│   │   └── package.json
│   └── frontend/
│       └── src/
│           └── app/
├── .github/
│   └── workflows/
│       └── ci.yml
└── docker-compose.yml

## ⚙️ Installation locale

### Prérequis
- Node.js 20+
- npm
- Angular CLI

### Étapes

1. Cloner le repo
```bash
git clone https://github.com/ssow520/GameRoom.git
cd GameRoom
```

2. Configurer le backend
```bash
cd code/backend
cp .env.example .env
npm install
```

3. Configurer le frontend
```bash
cd ../frontend
npm install
```

4. Démarrer le projet
```bash
cd ..
npm start
```

L'app sera disponible sur `http://localhost:4200`

## 🔐 Variables d'environnement

Créer un fichier `.env` dans `code/backend/` :

```env
PORT=5001
MONGODB_URI=YOUR_MONGODB_URI
JWT_SECRET=YOUR_JWT_SECRET
JWT_EXPIRES_IN=7d
CLIENT_URL=http://localhost:4200
```

## 📡 API Endpoints

**Auth** : POST /api/auth/register, POST /api/auth/login, GET /api/auth/me

**Games** : GET /api/games, POST /api/games, GET /api/games/:id, PUT /api/games/:id, DELETE /api/games/:id

**Rooms** : GET /api/rooms, POST /api/rooms, GET /api/rooms/:id, PUT /api/rooms/:id, DELETE /api/rooms/:id, POST /api/rooms/:id/join

## ⚡ Événements WebSocket

- room:join — Client rejoint une salle
- room:joined — Notification diffusée quand un joueur rejoint
- room:start — Host démarre la partie
- room:started — Notification diffusée quand la partie commence
- chat:message — Message de chat en temps réel

## 👥 Auteurs

Souleymane Sow, Ruth Kegmo, Ines Rbah — Collège LaSalle — Techniques de l'informatique