import { IPayload } from "./src/utils/user-token";

declare global {
    namespace Express {
        export interface Request {
            user?: IPayload;
        }
    }
    namespace NodeJS {
        interface ProcessEnv {
            DB_DATABASE: string;
            DB_USERNAME: string;
            DB_PASSWORD: string;
            PORT: string;
            JWT_SECRET: string;
        }
    }
}
export { };