import express from 'express';

const app = express();

app.get('/', (req, res) => {
    res.send('Home');
});

app.listen(3000, () => {
    console.log('App listening on port 3000.');
});

export default app;