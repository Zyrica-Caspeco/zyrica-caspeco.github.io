const path = require('path');
const app = require('express')();
app.get('/colorPicker.js', (req, res) => {
    res.sendFile(path.resolve('colorPicker.js'));
});
app.listen(1337);
console.log('http://localhost:1337');