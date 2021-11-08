import Image from "next/image";
import React, { useEffect, useState } from "react";

import { getCriptoPrices } from "../api/getCriptoPrices";
import { formatPrice } from "../utils";
import { OPTIONS_EXCHANGES, FIATS, CRIPTOS } from "../utils/data";
import { ICriptos } from "../utils/interfaces";

import styles from "./style.module.scss";
interface Props {
    criptos: ICriptos;
}

const default_exchange = "buenbit";

const default_criptos = {
    ADA: { ARS: 0, USD: 0 },
    BNB: { ARS: 0, USD: 0 },
    BTC: { ARS: 0, USD: 0 },
    DAI: { ARS: 0, USD: 0 },
    ETH: { ARS: 0, USD: 0 },
};

const Home: React.FC<Props> = ({ criptos }) => {
    const [exchange, setExchange] = useState<string>(default_exchange);
    const [updatedCriptos, setUpdatedCriptos] = useState<ICriptos>(default_criptos);
    const [update, setUpdate] = useState<boolean>(false);

    useEffect(() => {
        if (update) {
            getCriptoPrices(exchange)
                .then((res) => setUpdatedCriptos(res))
                .catch(() => setUpdatedCriptos(default_criptos));
        }
    }, [exchange, update]);

    function handleChangeExchange(e: React.ChangeEvent<HTMLSelectElement>) {
        const value = e.target.value;

        setExchange(value);
        setUpdate(true);
    }

    return (
        <main>
            <section className={styles.exchangeContainer}>
                <label htmlFor="exchange">Select exchange:</label>
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
            <section className={styles.tableContainer}>
                <div className={styles.tableTitle}>
                    <span>COIN</span>
                    <span>PRICE</span>
                </div>
                <div className={styles.tableLine} />
                <div className={styles.coinsPricing}>
                    {CRIPTOS.map((cripto) => {
                        const coin = update ? updatedCriptos[cripto.alias] : criptos[cripto.alias];

                        return (
                            <div key={cripto.name} className={styles.coinContainer}>
                                <div className={styles.coinInformation}>
                                    <span className={styles.coinIndex}>{cripto.id}</span>
                                    <Image
                                        alt={cripto.name}
                                        height={30}
                                        layout="fixed"
                                        src={cripto.icon}
                                        width={30}
                                    />
                                    <div className={styles.coinMetadata}>
                                        <h3>{cripto.alias}</h3>
                                        <span>{cripto.name}</span>
                                    </div>
                                </div>
                                <div className={styles.coinPrices}>
                                    {FIATS.map((fiat) => (
                                        <div key={fiat} className={styles.coinArs}>
                                            <span>{fiat}</span>
                                            <h4>{formatPrice(coin[fiat])}</h4>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </section>
        </main>
    );
};

export const getServerSideProps = async () => {
    const criptos = await getCriptoPrices(default_exchange);

    return {
        props: {
            criptos,
        },
    };
};

export default Home;
