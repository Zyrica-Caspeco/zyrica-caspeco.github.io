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
    res.sendFile(path.resolve('dist/inject.js'));
});
app.use('*', (req, res) => {
   res.redirect('/');
});
app.listen(1337);

// Bookmark.js
rollup.watch({
    input: 'server/bookmark.js',
    output: {
        format: 'iife',
        file: 'dist/bookmark.js',
    },
    plugins: [json(), terser()],
}).on('event', event => {
    if (event.code === 'ERROR') {
        console.log('bmk', event.error);
    } else if (event.code === 'END') {
        console.log('bmk', 'built');
    }
});

// Build hmr.js
rollup.watch({
    input: 'server/hmr.js',
    output: {
        format: 'iife',
        file: 'dist/hmr.js',
    },
    plugins: [json(), terser()],
}).on('event', event => {
    if (event.code === 'ERROR') {
        console.log('hmr', event.error);
    } else if (event.code === 'END') {
        console.log('hmr', 'built');
    }
});

// build colorPicker.js
rollup.watch({
    input: 'inject/index.js',
    output: [{
        format: 'iife',
        file: 'dist/inject.js',
    }],
    plugins: [json(), terser()],
}).on('event', event => {
    if (event.code === 'ERROR') {
        console.log('inj', event.error);
    } else if (event.code === 'END') {
        console.log('inj', 'built');
        for (let i = connections.length - 1; i >= 0; i--) {
            const ws = connections[i];
            if (ws.readyState === 1) {
                ws.send('');
            } else {
                connections.splice(i, 1);
            }
        }
    }
});
