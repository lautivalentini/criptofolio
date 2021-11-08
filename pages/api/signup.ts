import { NextApiRequest, NextApiResponse } from "next";

import { createUser } from "../../lib/user";

export default async function signup(req: NextApiRequest, res: NextApiResponse) {
    const { email, password } = req.body;

    try {
        await createUser(email, password);
        res.status(200).send({ done: true });
    } catch (error: any) {
        res.status(500).end(error.message);
    }
}
