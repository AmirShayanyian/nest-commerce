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
  }
}
