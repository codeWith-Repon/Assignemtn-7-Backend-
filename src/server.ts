import http, { Server } from 'http'
import app from './app'
import { envVars } from './app/config/env'
import { prisma } from './app/config/db'

let server: Server | null = null

const connectToDB = async () => {
    try {
        await prisma.$connect();
        console.log("✅ DB connection successful");
    } catch (error) {
        console.error("❌ Error during DB connection:", error);
        process.exit(1)
    }
}

const startServer = async () => {
    try {
        await connectToDB();
        server = http.createServer(app)
        server.listen(envVars.PORT, () => {
            console.log(`Server running on port http://localhost:${envVars.PORT}`)
        })

        handleProcessEvents();
    } catch (error) {
        console.error("❌ Error during server startup:", error);
        process.exit(1)
    }
}

const gracefulShutdown = async (signal: string) => {
    console.warn(`🔄 Received ${signal}, shutting down gracefully...`);

    if (server) {
        server.close(async () => {
            console.log("🚀 Server closed")

            try {
                console.log("Server shutdown complete.");
            } catch (error) {
                console.error("❌ Error during shutdown:", error);
            }
            process.exit(0)
        })
    } else {
        process.exit(0)
    }
}

const handleProcessEvents = () => {
    process.on("SIGTERM", () => gracefulShutdown("SIGTERM"));
    process.on("SIGINT", () => gracefulShutdown("SIGINT"));


    process.on("uncaughtException", (error) => {
        console.error("❌ Uncaught Exception:", error);
        gracefulShutdown("uncaughtException");
    })

    process.on("unhandledRejection", (reason) => {
        console.error("❌ Unhandled Rejection:", reason);
        gracefulShutdown("unhandledRejection");
    })
}

startServer()