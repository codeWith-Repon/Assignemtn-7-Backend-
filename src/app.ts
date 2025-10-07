import express from 'express'
import cors from 'cors'
import compression from 'compression'
import morgan from 'morgan'
import cookieParser from 'cookie-parser'
import notFound from './app/middlewares/notFound'
import { globalErrorHandler } from './app/middlewares/globalErrorHandler'
import { envVars } from './app/config/env'
import { router } from './app/routes'

const app = express()

// middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(compression())
app.use(morgan('dev'))
app.use(cookieParser())

app.use(
    cors({
        origin: envVars.FRONTEND_URL,
        credentials: true
    })
)


app.use("/api/v1", router)

// Default route for testing
app.get("/", (_req, res) => {
    res.send("API is running...")
})

// Global error handler
app.use(globalErrorHandler)

// 404 Handler
app.use(notFound)

export default app