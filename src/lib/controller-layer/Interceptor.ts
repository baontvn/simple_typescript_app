
import { Request } from 'express';

export interface Interceptor {
    shouldPass(req: Request): Boolean;
}