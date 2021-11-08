import axios from "axios";
import Image from "next/image";
import React, { useEffect, useState } from "react";

import Skeleton from "../components/Skeleton";
import { getCriptoPricesByExchange } from "../api/criptoApi";
import { formatPrice } from "../utils";
import { OPTIONS_EXCHANGES, FIATS, COINGECKO_API } from "../utils/data";
import { ICriptosPrices, ICriptos, IFiats } from "../utils/interfaces";

import styles from "./style.module.scss";
interface Props {
    criptos: ICriptos[];
    result: ICriptosPrices;
}

const default_exchange = "buenbit";

const Home: React.FC<Props> = ({ result, criptos }) => {
    const [exchange, setExchange] = useState<string>(default_exchange);
    const [updatedCriptos, setUpdatedCriptos] = useState<ICriptosPrices>({});
    const [update, setUpdate] = useState<boolean>(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (update) {
            setLoading(true);
            getCriptoPricesByExchange(exchange, criptos)
                .then((res) => {
                    setUpdatedCriptos(res);
                    setLoading(false);
                })
                .catch(() => {
                    setUpdatedCriptos({});
                    setLoading(false);
                });
        }
    }, [exchange, update, criptos]);

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
                    {criptos.map((cripto) => {
                        const coin: IFiats = update
                            ? updatedCriptos[cripto.symbol]
                            : result[cripto.symbol];

                        return (
                            <div key={cripto.name} className={styles.coinContainer}>
                                <div className={styles.coinInformation}>
                                    <span className={styles.coinIndex}>
                                        {cripto.market_cap_rank}
                                    </span>
                                    <Image
                                        alt={cripto.name}
                                        height={30}
                                        layout="fixed"
                                        src={cripto.image}
                                        width={30}
                                    />
                                    <div className={styles.coinMetadata}>
                                        <h3>{cripto.symbol}</h3>
                                        <span>{cripto.name}</span>
                                    </div>
                                </div>
                                <div className={styles.coinPrices}>
                                    {FIATS.map((fiat) => (
                                        <div key={fiat} className={styles.coinsFiatPrice}>
                                            <span>{fiat}</span>
                                            {loading ? (
                                                <Skeleton />
                                            ) : (
                                                <h4>
                                                    {fiat == "USD"
                                                        ? formatPrice(cripto.current_price)
                                                        : formatPrice(coin ? coin[fiat] : 0)}
                                                </h4>
                                            )}
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
    const response = await axios.get(COINGECKO_API);
    const criptos = (response.data || []).slice(0, 10);

    const result = await getCriptoPricesByExchange(default_exchange, criptos);

    return {
        props: {
            result,
            criptos,
        },
    };
};

export default Home;
