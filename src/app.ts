import express, {Express} from 'express';
import helmet from "helmet";
import dotenv from 'dotenv';
import morgan from 'morgan';
import cors from 'cors';
import swaggerConfig from '../config/swagger';
import customErrorHandler from './api/v1/middleware/customErrorHandler';
dotenv.config();
  
const app : Express = express();
app.use(helmet());
app.use(morgan('combined'))
app.use(express.json());
app.use(cors())


swaggerConfig(app)


app.get("/", (req, res) => {
    res.send('You are landed an empty ocean')
})

app.use(customErrorHandler)

export default app

