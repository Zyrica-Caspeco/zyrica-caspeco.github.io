const rollup = require('rollup');
const json = require('@rollup/plugin-json');
const terser = require('@rollup/plugin-terser');
const path = require('path');
const app = require('express')();
require('express-ws')(app);

const connections = [];

app.get('/hmr.js', (req, res) => {
    res.sendFile(path.resolve('dist/hmr.js'));
});
app.ws('/hmr', (ws, req) => {
    connections.push(ws);
    ws.send('colorPicker.js');
});

app.get('/', (req, res) => {
    res.sendFile(path.resolve('dist/index.js'));
});
app.use('*', (req, res) => {
   res.redirect('/colorPicker.js');
});
app.listen(1337);

// Bookmark.js
rollup.watch({
    input: 'bookmark.js',
    output: {
        format: 'iife',
        file: 'dist/bookmark.js',
    },
    plugins: [json(), terser()],
});

// Build hmr.js
rollup.watch({
    input: 'hmr.js',
    output: {
        format: 'iife',
        file: 'dist/hmr.js',
    },
    plugins: [json(), terser()],
}).on('event', event => {
    if (event.code === 'ERROR') {
        console.log('hmr', event.code);
    }
});

// build colorPicker.js
rollup.watch({
    input: 'color-picker/index.js',
    output: [{
        format: 'iife',
        file: 'dist/index.js',
    }],
    plugins: [json(), terser()],
}).on('event', event => {
    if (event.code === 'ERROR') {
        console.log(event.error);
    } else if (event.code === 'END') {
        console.log('colorPicker.js');
        for (let i = connections.length - 1; i >= 0; i--) {
            const ws = connections[i];
            if (ws.readyState === 1) {
                ws.send('colorPicker.js');
            } else {
                connections.splice(i, 1);
            }
        }
    }
});
