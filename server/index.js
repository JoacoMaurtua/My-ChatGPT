//Archivo que contrendra las configuraciones del servidor
import express from 'express'; 
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import helmet from 'helmet'
import morgan from 'morgan';
import { Configuration, OpenAIApi } from 'openai';
import openAiRoutes from './routes/openai.js'

//Configuraciones de middlewares y dependencias

dotenv.config();

const app = express();

app.use(express.json());

app.use(helmet());

app.use(helmet.crossOriginResourcePolicy({policy:"cross-origin"}));

app.use(morgan("common"));

app.use(bodyParser.json({limit: "30mb", extended: true}));

app.use(bodyParser.urlencoded({limit:"30mb", extended: true}));

app.use(cors());


//Configuracion OPEN IA

const configuration = new Configuration({
  apiKey: process.env.OPEN_API_KEY,
});
export const openai = new OpenAIApi(configuration); //esta variable la usare en routes


//RUTAS:

app.use('/openai', openAiRoutes);

//Configuracion del server:

const PORT = process.env.PORT || 9000;

app.listen(PORT, ()=>{
  console.log(`Server running in port ${PORT}`)
})