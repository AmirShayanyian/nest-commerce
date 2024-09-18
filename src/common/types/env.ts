namespace NodeJS {
  interface ProcessEnv {
    //Application
    PORT: number;

    //Database
    DB_HOST: string;
    DB_PORT: number;
    DB_USERNAME: string;
    DB_PASSWORD: string;
    DB_DATABASE: string;
    DB_SYNC: boolean;
    DB_AUTO_LOAD: boolean;

    //Secrets
    ACCESS_TOKEN_SECRET: string;

    //S3
    S3_ACCESS_KEY: string;
    S3_SECRET_KEY: string;
    S3_BUCKET_NAME: string;
    S3_ENDPOINT: string;
  }
}

