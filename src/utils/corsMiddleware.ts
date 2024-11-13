// src/utils/corsMiddleware.ts
import { NextApiRequest, NextApiResponse } from 'next';
import Cors from 'cors';

// Allow only this origin ('http://localhost:3000' and GET & POST requests)
const cors = Cors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
});

// Helper function to run the CORS middleware
function runMiddleware(req: NextApiRequest, res: NextApiResponse, fn: any) {
    return new Promise((resolve, reject) => {
        fn(req, res, (result: any) => {
            if (result instanceof Error) {
                return reject(result);
            }
            return resolve(result);
        });
    });
}

// Higher-order function that applies CORS
export const withCors = (handler: (req: NextApiRequest, res: NextApiResponse) => Promise<void | NextApiResponse<any>>) => {
    return async (req: NextApiRequest, res: NextApiResponse) => {
        await runMiddleware(req, res, cors);
        return handler(req, res);
    };
};