import dotenv from 'dotenv'
import app from './app.js'

dotenv.config();

const PORT= process.env.PORT || 8000

const startServer=async()=>{
    try {
        app.listen(PORT, ()=>{
            console.log(`Server running on port ${PORT}`)
        })
    } catch (error) {
        console.error("Error staring server", error)
    }
}
startServer()