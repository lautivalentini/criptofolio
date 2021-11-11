import React from "react";

import Form from "../Form";

import styles from "./login.module.scss";

interface Props {
    onChangeHandler: React.ChangeEventHandler<HTMLInputElement>;
    data: tdata;
}

type tdata = {
    email: string;
    password: string;
    rpassword: string;
};

const Login: React.FC<Props> = ({ data, onChangeHandler }) => {
    const inputs = [
        {
            label: "Email",
            name: "email",
            type: "email",
        },
        {
            label: "Password",
            name: "password",
            type: "password",
        },
        {
            label: "Repeat Password",
            name: "rpassword",
            type: "password",
        },
    ];

    return (
        <main className={styles.loginContainer}>
            <Form auth={"Login"} data={data} inputs={inputs} onChangeHandler={onChangeHandler} />
        </main>
    );
};

export default Login;
