require('dotenv').config();
require('express-async-errors');

const express = require('express');
const app = express();

const connectDB = require('./db/connectdb');

// extra security packages

const helmet = require('helmet');
const cors = require('cors');
const xss = require('xss-clean');
const rateLimiter = require('express-rate-limit');

// middleware
const authentication = require('./middleware/authentication');

// routers
const tasksRouter = require('./routes/tasks');
const authRouter = require('./routes/auth');

// error handler
const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler')



app.use(express.json());
app.use(helmet());
app.use(cors({
    origin: "https://alegb91.github.io/TaskManager"
}))
app.use(xss())

const port = process.env.PORT || 3000;

//routes
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/tasks', authentication, tasksRouter);

//errors
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI)
        app.listen(port, () => {console.log(`Server listening on port ${port}...`)})
    } catch (error) {
        console.log(error)
    }

};

start();