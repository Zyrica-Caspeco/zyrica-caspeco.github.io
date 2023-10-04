const rollup = require('rollup');
const json = require('@rollup/plugin-json');
const terser = require('@rollup/plugin-terser');
const { resolve } = require('path');
const app = require('express')();
const fs = require('fs');
require('express-ws')(app);

const connections = [];

app.get('/hmr.js', (req, res) => {
    res.sendFile(resolve('dist/hmr.js'));
});
app.ws('/hmr', (ws, req) => {
    connections.push(ws);
    ws.send('colorPicker.js');
});

app.get('/', (req, res) => {
    res.sendFile(resolve('dist/index.js'));
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

// Build inject.js
rollup.watch({
    input: 'inject/index.js',
    output: [{
        format: 'iife',
        file: 'dist/index.js',
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

// Build css
let delay;
let changedFiles = {};
fs.watch(resolve('css'), (event, filename) => {
    if (delay) {
        clearTimeout(delay);
    }
    changedFiles[filename] = true;
    delay = setTimeout(() => {
        console.log('css', 'changed', Object.keys(changedFiles));

    }, 200);
});
let files = fs.readdirSync(resolve('css'));
const { execSync } = require('child_process');
const { emptyDir } = require('fs-extra');
emptyDir(resolve('dist/css'));
files.filter(filename => filename.endsWith('.less')).forEach(filename => {
    const src = resolve('css', filename);
    const dest = resolve('dist/css', filename.replace('.less', '.css'));
    const cmd = `lessc ${src} ${dest}`;
    execSync(cmd);
});

files = files.map(filename => filename.replace('.less', '.css'));
fs.writeFileSync('dist/css.json', JSON.stringify({files}));
