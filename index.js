import express from "express";
import axios from "axios";
const app = express();
const PORT = 3000;

// Set EJS as templating engine
app.set('view engine', 'ejs');
app.use(express.static('public'));

// Home Route
app.get('/', (req, res) => {
    res.render('index');
});

// Search Pokémon Route
app.get('/pokemon', async (req, res) => {
    try {
        const name = req.query.name;
        if (!name) return res.redirect('/');
           const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name.toLowerCase()}`);
        const speciesResponse = await axios.get(response.data.species.url);
        const evolutionResponse = await axios.get(speciesResponse.data.evolution_chain.url);

        // Get evolutions
        const getEvolutions = (chain) => {
            let evolutions = [];
            let current = chain;
            
            while (current) {
                evolutions.push({
                    name: current.species.name,
                    url: `/pokemon?name=${current.species.name}` // Link to the Pokémon's page
                });
                
                if (current.evolves_to.length > 0) {
                    current = current.evolves_to[0]; // Move to next evolution stage
                } else {
                    current = null; // Stop if no more evolutions
                }
            }
            
            return evolutions;
        };
        

        const evolutions = getEvolutions(evolutionResponse.data.chain);
        const pokedexEntry = speciesResponse.data.flavor_text_entries.find(entry => entry.language.name === "en").flavor_text;

        res.render('pokemon', {
            pokemon: response.data,
            evolutions,
            pokedexEntry,
            prevPokemon: response.data.id > 1 ? response.data.id - 1 : null,
            nextPokemon: response.data.id < 898 ? response.data.id + 1 : null
        });

    } catch (error) {
        res.render('pokemon', { error: "Pokémon not found!" , pokemon :null});
    }
});

// Random Pokémon Route
app.get('/random', async (req, res) => {
    try {
        const randomId = Math.floor(Math.random() * 898) + 1;
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${randomId}`);
        res.redirect(`/pokemon?name=${response.data.name}`);
    } catch (error) {
        res.render('pokemon', { error: "Error fetching random Pokémon!" });
    }
});

// Pokémon by Type Route
app.get('/type/:type', async (req, res) => {
    const type = req.params.type; // ✅ Declare it before the try/catch

    try {
        const response = await axios.get(`https://pokeapi.co/api/v2/type/${type.toLowerCase()}`);
        res.render('type', { type, pokemonList: response.data.pokemon.slice(0, 20) }); // Show first 20 Pokémon
    } catch (error) {
        res.render('type', { type, error: "Invalid type selected.", pokemonList: [] });
    }
});


// Pokémon Grid Route
app.get('/pokedex', async (req, res) => {
    try {
        const response = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=50');
        res.render('pokedex', { pokemonList: response.data.results });
    } catch (error) {
        res.render('pokedex', { error: "Error loading Pokémon data!" });
    }
});

// Start Server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
