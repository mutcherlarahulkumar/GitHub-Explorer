const express = require('express');
const app = express();
const axios = require('axios');
const PORT = 3000;

app.use(express.static('public'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.set('view engine', 'ejs')

app.get('/', (req, res) => {
    res.render('index');
})
app.post('/', async (req, res) => {
    const { q , description, topics, readme} = req.body;

    const response = await axios.get(`https://api.github.com/search/repositories?q=${q}+${description}+in:description+${topics}+in:topics+${readme}+in:readme`);

    const repos = response.data.items;

    console.log(repos);
    res.render('show', { repos } );
})


app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}...`);
})