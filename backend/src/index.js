const express = require('express');
const app = express();
var cors = require('cors');
require('./database');


app.use(express.json());
app.use(cors());


app.use( '/api' ,require('./routes/index'));

app.listen(3000);
console.log(`Server listening on port`, 3000)