const express = require('express');
const cors = require('cors')
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser')
const jsonParser = bodyParser.json();
const app = express();
const router = express.Router();

app.use(jsonParser);
app.use(cors());
app.use(express.static('logs'))

const log = (json) => {
    const date = new Date();
    const format = `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`;
    fs.appendFileSync(path.join('./logs', `${format}.txt`), `${format}: \n${JSON.stringify(json)}\n\n`);
}

router.post('/log', (req, res) => {
    log(req.body);
    res.status(200).send({ "status": 200 });
});



app.use(router);
app.listen(process.env.PORT || 3000);