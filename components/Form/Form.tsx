import React, { useState } from "react";

import styles from "./form.module.scss";

interface Props {
    onChangeHandler: React.ChangeEventHandler<HTMLInputElement>;
    data: tdata;
    inputs: Array<tinputs>;
    auth: string;
}

type tinputs = {
    name: string;
    type: string;
    label: string;
};

type tdata = {
    [key: string]: string;
};

interface IStyles {
    [name: string]: style;
}

type style = {
    [name: string]: object;
};

type tfocus = {
    [name: string]: boolean;
};

const STYLES: IStyles = {
    input: {
        true: {
            borderBottom: "1px solid #7908FF",
        },
        false: {
            borderBottom: "1px solid #a5a7af",
        },
    },
    label: {
        true: {
            top: "-10px",
            color: "#7908FF",
            fontSize: "12px",
        },
        false: {
            top: "15px",
            color: "#a5a7af",
            fontSize: "14px",
        },
    },
};

const default_focus = {
    name: false,
    username: false,
    email: false,
    password: false,
    rpassword: false,
};

const Form: React.FC<Props> = ({ data, onChangeHandler, inputs, auth }) => {
    const [focus, setFocus] = useState<tfocus>(default_focus);

    function onChangeFocus(e: React.FocusEvent<HTMLInputElement>, isFocus: boolean) {
        const { name, value } = e.target;

        if (value && !isFocus) isFocus = true;

        setFocus({ ...focus, [name]: isFocus });
    }

    function getStyles(name: string, type: string) {
        const focusName: string = String(focus[name]);
        const styles = STYLES[type];

        return styles[focusName];
    }

    return (
        <section className={styles.formContainer}>
            <div className={styles.textsContainer}>
                <h1>Criptofolio</h1>
                <h3>{auth}</h3>
            </div>
            <form>
                {inputs.map((input) => (
                    <div key={input.name}>
                        <label htmlFor={input.name} style={getStyles(input.name, "label")}>
                            {input.label}
                        </label>
                        <input
                            id={input.name}
                            name={input.name}
                            style={getStyles(input.name, "input")}
                            type={input.type}
                            value={data[input.name]}
                            onBlur={(e) => onChangeFocus(e, false)}
                            onChange={onChangeHandler}
                            onFocus={(e) => onChangeFocus(e, true)}
                        />
                    </div>
                ))}
                <button>{auth}</button>
            </form>
        </section>
    );
};

export default Form;
