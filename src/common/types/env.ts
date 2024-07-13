namespace NodeJS {
  interface ProcessEnv {
    //Server
    SERVER_PORT: string;

    //DataBase
    DB_AUTO_LOAD: boolean;
    DB_SYNC: boolean;
    DB_HOST: string;
    DB_PORT: number;
    DB_USERNAME: string;
    DB_PASSWORD: string;
    DB_DATABASE: string;
  }
}
