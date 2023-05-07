import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
// other imports

@Injectable()
export class AuthMiddleware implements NestMiddleware {
    async use(req: Request, res: Response, next: NextFunction) {
        const authHeader = req.header('authorization');

        const bearerToken: string[] = authHeader.split(' ');
        const token: string = bearerToken[1];

        // res.locals.token = token;
        req.headers['token'] = token;

        next()
    }
}