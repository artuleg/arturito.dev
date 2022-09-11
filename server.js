const express = require('express');
const path = require('path');
const app = express();
const compression = require('compression')

app.use(compression())
app.use(express.static(__dirname + '/dist/arturo-ui'));

app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname + '/dist/arturo-ui/index.html'));
});

app.listen(process.env.PORT || 8080);