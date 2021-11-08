import Image from "next/image";

import Skeleton from "../Skeleton";
import { ICriptosPrices, ICriptos } from "../../utils/interfaces";
import { FIATS } from "../../utils/data";
import { formatPrice } from "../../utils";

import styles from "./criptoTable.module.scss";

interface Props {
    criptos: ICriptos[];
    result: ICriptosPrices;
    updatedCriptos: ICriptosPrices;
    update: boolean;
    loading: boolean;
}

const CriptoTable: React.FC<Props> = ({ criptos, updatedCriptos, result, update, loading }) => {
    return (
        <section className={styles.tableContainer}>
            <div className={styles.tableTitle}>
                <span>COIN</span>
                <span>PRICE</span>
            </div>
            <div className={styles.tableLine} />
            <div className={styles.coinsPricing}>
                {criptos.map((cripto) => {
                    const coin: any = update
                        ? updatedCriptos[cripto.symbol]
                        : result[cripto.symbol];

                    return (
                        <div key={cripto.name} className={styles.coinContainer}>
                            <div className={styles.coinInformation}>
                                <span className={styles.coinIndex}>{cripto.market_cap_rank}</span>
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
    );
};

export default CriptoTable;
