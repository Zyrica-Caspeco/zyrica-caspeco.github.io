const rollup = require('rollup');
const json = require('@rollup/plugin-json');
const terser = require('@rollup/plugin-terser');
const { resolve } = require('path');
const express = require('express');
const app = express();
const fs = require('fs');
require('express-ws')(app);
const { execSync } = require('child_process');
const { emptyDirSync } = require('fs-extra');


const connections = [];

app.get('/hmr.js', (req, res) => {
    res.sendFile(resolve('dist/hmr.js'));
});
app.ws('/hmr', (ws, req) => {
    connections.push(ws);
    send('index.js');
});
app.use('/css', express.static(resolve('dist/css')));
app.get('/index.js', (req, res) => {
    res.sendFile(resolve('dist/index.js'));
});
app.use('*', (req, res) => {
   // res.redirect('/');
});
app.listen(1337);

function send(msg = '') {
    for (let i = connections.length - 1; i >= 0; i--) {
        const ws = connections[i];
        if (ws.readyState === 1) {
            ws.send(msg);
        } else {
            connections.splice(i, 1);
        }
    }
}

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
        send('index.js');
    }
});

// Build css
let delay;
let changedFiles = {};
fs.watch(resolve('css'), (event, filename) => {
    if (filename.endsWith('~')) return; // temp files
    if (delay) {
        clearTimeout(delay);
    }
    changedFiles[filename] = true;
    delay = setTimeout(() => {
        Object.keys(changedFiles).forEach(compileLessFile);
        changedFiles = {};
    }, 200);
});
function compileLessFile(filename) {
    const src = resolve('css', filename);

    const cssFileName = filename.replace('.less', '.css');
    const dest = resolve('dist/css', cssFileName);

    if (fs.existsSync(src)) {
        const cmd = `lessc ${src} ${dest}`;
        try {
            execSync(cmd);
        } catch(e) {
            console.warn(e);
        }
        send(cssFileName);
        console.log('css', cssFileName);
    } else {
        fs.unlinkSync(dest);
    }

    let files = fs.readdirSync(resolve('css'));
    files = files.map(filename => filename.replace('.less', '.css'));
    fs.writeFileSync('dist/css.json', JSON.stringify({files}));
}

const files = fs.readdirSync(resolve('css'));
emptyDirSync(resolve('dist/css'));
files.filter(filename => filename.endsWith('.less')).forEach(compileLessFile);

