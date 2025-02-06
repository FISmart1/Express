const express = require('express');

const cors = require('cors');

const bodyparser = require('body-parser');

const app = express();

const port = 3000;

app.use(bodyparser.urlencoded({extended: false}))

app.use(bodyparser.json())

app.use(cors());
app.get('/', (req, res) => {
    res.send('Hello, World!');
})

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});