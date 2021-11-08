import React from "react";

import { OPTIONS_EXCHANGES } from "../../utils/data";

import styles from "./exchangeSelector.module.scss";

interface Props {
    exchange: string;
    handleChangeExchange: React.ChangeEventHandler<HTMLSelectElement>;
}

const ExchangeSelector: React.FC<Props> = ({ exchange, handleChangeExchange }) => {
    return (
        <section className={styles.exchangeContainer}>
            <label htmlFor="exchange">Select local exchange:</label>
            <select
                className={styles.selectExchange}
                id="exchange"
                name="exchange"
                placeholder="Select exchange"
                value={exchange}
                onChange={handleChangeExchange}
            >
                {OPTIONS_EXCHANGES.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.name}
                    </option>
                ))}
            </select>
        </section>
    );
};

export default ExchangeSelector;
