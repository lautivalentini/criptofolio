import passport from "passport";
import nextConnect from "next-connect";
import { NextApiRequest, NextApiResponse } from "next";

import { setLoginSession } from "../../lib/auth";
import { localStrategy } from "../../lib/passport-local";

const authenticate = (method: string, req: NextApiRequest, res: NextApiResponse) =>
    new Promise((resolve, reject) => {
        passport.authenticate(method, { session: false }, (error: string, token: string) => {
            if (error) {
                reject(error);
            } else {
                resolve(token);
            }
        })(req, res);
    });

passport.use(localStrategy);

export default nextConnect()
    .use(passport.initialize())
    .post(async (req: NextApiRequest, res: NextApiResponse) => {
        try {
            const user = (await authenticate("local", req, res)) || {};
            const session = { ...user };

            await setLoginSession(res, session);

            res.status(200).send({ done: true });
        } catch (error: any) {
            res.status(401).send(error.message);
        }
    });
