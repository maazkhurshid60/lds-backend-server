declare global {
    namespace NodeJS {
        interface ProcessEnv {
            PORT: string,
            CORS_ORIGIN_POLICY: string,
            MONGODB_DATABASE_NAME: string,
            MONGODB_CONNECTION_URL: string
        }
    }
}

export {};