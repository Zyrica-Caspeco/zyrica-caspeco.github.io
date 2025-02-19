import express from 'express';

// Express static file server
const app = express();
app.use(express.static('dist'));
app.listen(3000, () => console.log('Server running on port 3000'));
