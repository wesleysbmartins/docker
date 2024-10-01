import { Client } from "pg";

export interface ISQL {
    connect() : Promise<Client>;
    runQuery(query: string): Promise<any>;
    disconnect() : Promise<void>;
}

export interface ISQLCredentials {
    port: number;
    host: string;
    user: string;
    password: string;
    database?: string;
    schema?: string;
}

export class SQL implements ISQL {
    private static instance: Client;

    async connect(): Promise<Client> {

        const credentials : ISQLCredentials = {
            port: parseInt(process.env.DB_PORT!),
            host: process.env.DB_HOST!,
            user: process.env.DB_USER!,
            password: process.env.DB_PASSWORD!,
            database: process.env.DB_NAME,
        }

        try {
            if (!SQL.instance) {
                
                SQL.instance = new Client({
                    user: credentials.user,
                    password: credentials.password,
                    host: credentials.host,
                    port: credentials.port,
                    database: credentials.database,
                });
    
                await SQL.instance.connect();
    
                console.log("SQL CONNECTION SUCCESS!");
            }

            return SQL.instance;
        } catch (err) {
            const message = `SQL CONNECTION ERROR\nCREDENTIALS:\n${JSON.stringify(credentials)}ERROR:\n${err}`;
            console.log(message);
            throw new Error(message);
        }
    }

    async disconnect(): Promise<void> {
        try {
            await SQL.instance.end();
            console.log("SQL DISCONNECT!");

        } catch (err) {
            const message = `SQL DISCONNECTION ERROR\nERROR:\n${err}`;
            console.log(message);
            throw new Error(message);
        }
    }

    async runQuery(query: string): Promise<any> {
        try {
            const res = await SQL.instance?.query(query);
            return res;
        } catch(err) {
            const message = `SQL QUERY ERROR\nQUERY:\n${query}ERROR:\n${err}`;
            console.log(message);
            throw new Error(message);
        }
    }
}

export default SQL;