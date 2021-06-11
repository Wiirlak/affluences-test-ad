import * as express from 'express';
import bookRouter from './src/time';

const app = express();
const port = 3000;

app.use('/book', bookRouter)
app.listen(port, () => {
    console.log(`Listening on port ${port}...`)
})