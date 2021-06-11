import * as express from 'express';
import bookRouter from './src/book/controller/book.controller';
require('dotenv').config()

const app = express();
const port = process.env.API_PORT;

app.use('/book', bookRouter)
app.listen(port, () => {
    console.log(`Listening on port ${port}...`)
})