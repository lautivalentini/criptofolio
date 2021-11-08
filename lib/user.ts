import crypto from "crypto";

const users: User[] = [];

interface User {
    createdAt: number;
    username: string;
    hash: string;
    salt: string;
}

export const createUser = (username: string, password: string) => {
    const salt = crypto.randomBytes(16).toString("hex");
    const hash = crypto.pbkdf2Sync(password, salt, 1000, 64, "sha512").toString("hex");
    const user: User = {
        createdAt: Date.now(),
        username,
        hash,
        salt,
    };

    users.push(user);

    return { username, createdAt: Date.now() };
};

export async function findUser(username: string): Promise<User | undefined> {
    return users.find((user) => user.username === username);
}

export function validatePassword(user: User, inputPassword: string) {
    const inputHash = crypto
        .pbkdf2Sync(inputPassword, user.salt, 1000, 64, "sha512")
        .toString("hex");
    const passwordsMatch = user.hash === inputHash;

    return passwordsMatch;
}
