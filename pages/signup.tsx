import React, { useState } from "react";
import Router from "next/router";

import { useUser } from "../hooks/useUser";

const Signup = () => {
    useUser("/", true);
    const [errorMsg, setErrorMsg] = useState("");

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        if (errorMsg) setErrorMsg("");

        const body = {
            username: e.currentTarget.username.value,
            password: e.currentTarget.password.value,
        };

        if (body.password !== e.currentTarget.rpassword.value) {
            setErrorMsg(`The passwords don't match`);

            return;
        }

        try {
            const res = await fetch("/api/signup", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body),
            });

            if (res.status === 200) {
                Router.push("/login");
            } else {
                throw new Error(await res.text());
            }
        } catch (error: any) {
            console.error("An unexpected error happened occurred:", error);
            setErrorMsg(error.message);
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <label>
                <span>Username</span>
                <input required name="username" type="text" />
            </label>
            <label>
                <span>Password</span>
                <input required name="password" type="password" />
            </label>
            <label>
                <span>Repeat password</span>
                <input required name="rpassword" type="password" />
            </label>
            <button type="submit">Sign Up</button>
        </form>
    );
};

export default Signup;
