declare global {
    namespace NodeJS {
        interface ProcessEnv {
            PORT: string,
            CORS_ORIGIN_POLICY: string,
            MONGODB_DATABASE_NAME: string,
            MONGODB_STAGING_CONNECTION_URL: string,
            MONGODB_PRODUCTION_CONNECTION_URL: string,
            MONGODB_LOCAL_CONNECTION_URL: string,
            ACCESS_TOKEN_SECRET: string,
            ACCESS_TOKEN_EXPIRY: string,
            NODE_ENV: string,

        }
    }
}

export { };