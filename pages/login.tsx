import React from "react";

import { useUser } from "../hooks/useUser";

const Signup = () => {
    useUser("/", true);

    return <h1>login</h1>;
};

export default Signup;
