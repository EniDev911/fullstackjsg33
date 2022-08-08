const express = require('express');
const path = require('path');

let initial_path = path.join(__dirname, "public");

const app = express();

app.set('port', process.env.PORT || 4000)

app.use(express.static(initial_path));

app.get('/home', (req, res) => {
    res.sendFile(path.join(initial_path, "home.html"))
})

app.get('/editor', (req, res) => {
    res.sendFile(path.join(initial_path, "editor.html"))
})

app.listen(app.get('port'), () => {
    console.log(`Server running on port ${app.get('port')}`);
})