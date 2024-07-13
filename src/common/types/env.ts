namespace NodeJS {
  interface ProcessEnv {
    //Server
    PORT: number;

    //DataBase
    DB_HOST: string;
    DB_PORT: number;
    DB_USERNAME: string;
    DB_PASSWORD: string;
    DB_DATABASE: string;
    DB_AUTO_LOAD: boolean;
    DB_SYNC: boolean;
  }
}
