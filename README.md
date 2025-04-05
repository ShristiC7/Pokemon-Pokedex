# 🧩 Pokémon API Wrapper (Node.js + Express)

A simple RESTful API built with Node.js and Express that fetches and serves Pokémon data from the [PokéAPI](https://pokeapi.co/). This project demonstrates how to create an API wrapper with caching, routing, and error handling.

---

## 🚀 Features

- 🔍 Get Pokémon details by name or ID
- 📋 List multiple Pokémon with pagination
- 💾 Caches data to reduce redundant API calls
- ❌ Handles errors gracefully
- 🌐 CORS-enabled for frontend integration

---

## 📦 Technologies Used

- **Node.js**
- **Express.js**
- **Axios** – for making HTTP requests
- **Node-Cache** – for in-memory caching
- **CORS**
- **dotenv** – to manage environment variables

---

## 🛠️ Setup Instructions

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/pokemon-api.git
   cd pokemon-api
Install dependencies

bash
Copy
Edit
npm install
Run the server

bash
Copy
Edit
node server.js
Access the API

arduino
Copy
Edit
http://localhost:3000
📚 API Endpoints
➤ Get Pokémon by name or ID
bash
Copy
Edit
GET /pokemon/:nameOrId
Example:
/pokemon/pikachu or /pokemon/25

Returns:

json
Copy
Edit
{
  "name": "pikachu",
  "id": 25,
  "height": 4,
  "weight": 60,
  "types": ["electric"],
  "abilities": ["static", "lightning-rod"],
  "stats": [
    { "name": "speed", "value": 90 },
    ...
  ],
  "sprite": "https://raw.githubusercontent.com/.../sprites/pokemon/25.png"
}
➤ Get a list of Pokémon
pgsql
Copy
Edit
GET /pokemon?limit=10&offset=0
Query Parameters:

limit (default: 10)

offset (default: 0)

🙌 Acknowledgements
PokéAPI – for the amazing Pokémon data

👨‍💻 Author
Your Name
GitHub: @ShristiC7


