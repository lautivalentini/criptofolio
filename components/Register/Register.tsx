import React from "react";

import Form from "../Form";

import styles from "./register.module.scss";

interface Props {
    onChangeHandler: React.ChangeEventHandler<HTMLInputElement>;
    data: tdata;
}

type tdata = {
    name?: string;
    username?: string;
    email: string;
    password: string;
    rpassword: string;
};

const Register: React.FC<Props> = ({ data, onChangeHandler }) => {
    const inputs = [
        {
            name: "name",
            type: "text",
            label: "Name",
        },
        {
            name: "username",
            type: "text",
            label: "Username",
        },
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
        <main className={styles.registerContainer}>
            <Form auth={"Sign up"} data={data} inputs={inputs} onChangeHandler={onChangeHandler} />
        </main>
    );
};

export default Register;
