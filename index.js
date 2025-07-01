import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import router from './routes/route.js';

const app = express()
const port = 3000

// middlewares
app.use(express.json())
app.use(cors()) // allow cross domain
app.use(morgan('dev')) // show logs in console

// routes
app.use('/auth', router)

// error handling
app.use((err, req, res, next) => {
    res.status(err.status || 500).json({ message: err.message || 'Something went wrong!' })
})


app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})