import React, { useState } from "react";

import Login from "../components/Login";
import Register from "../components/Register";
import Tabs from "../components/Tabs";

const AUTH_TYPES: Auth = {
    0: "login",
    1: "signup",
};

interface Auth {
    [key: number]: string;
}

const default_data = {
    email: "",
    password: "",
    rpassword: "",
};

type tdata = {
    name?: string;
    username?: string;
    email: string;
    password: string;
    rpassword: string;
};

const Auth: React.FC = () => {
    const [auth, setAuth] = useState<string>(AUTH_TYPES[0]);
    const [data, setData] = useState<tdata>(default_data);

    function onChangeHandler(e: React.FormEvent<HTMLInputElement>) {
        const { name, value } = e.currentTarget;

        setData({ ...data, [name]: value });
    }

    function handleChangeAauth(tab: number) {
        setAuth(AUTH_TYPES[tab]);
        setData(default_data);
    }

    return (
        <div>
            <Tabs handleChangeAauth={handleChangeAauth} />
            {auth === AUTH_TYPES[0] ? (
                <Login data={data} onChangeHandler={onChangeHandler} />
            ) : (
                <Register data={data} onChangeHandler={onChangeHandler} />
            )}
        </div>
    );
};

export default Auth;
