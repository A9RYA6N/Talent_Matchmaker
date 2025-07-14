import cors from 'cors'
import express from 'express'
import clientRouter from './src/routes/client.routes.js'

const app=express()

app.use(express.json())
app.use(cors({
    origin: "*",
    credentials: true
}))


app.use('/api/client', clientRouter)

export default app