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
            <table className={styles.tableCoinsContainer}>
                <thead>
                    <tr>
                        <th>COINS</th>
                        <th>PRICE</th>
                    </tr>
                </thead>
                <tbody>
                    {criptos.map((cripto: ICriptos) => {
                        const { id, symbol, name, image, current_price, market_cap_rank } = cripto;
                        const coin: any = update
                            ? updatedCriptos[cripto.symbol]
                            : result[cripto.symbol];

                        return (
                            <>
                                <tr key={id}>
                                    <td>
                                        <div className={styles.coinsContainer}>
                                            <span>{market_cap_rank}</span>
                                            <div className={styles.coinInformation}>
                                                <Image
                                                    alt={name}
                                                    height={30}
                                                    layout="fixed"
                                                    src={image}
                                                    width={30}
                                                />
                                                <div>
                                                    <h4>{symbol.toUpperCase()}</h4>
                                                    <span>{name}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <div className={styles.pricesContainer}>
                                            {FIATS.map((fiat) => {
                                                return (
                                                    <div key={`${fiat}-${name}-${symbol}`}>
                                                        <span>{fiat}</span>
                                                        {loading ? (
                                                            <Skeleton
                                                                heigth=".8rem"
                                                                width="125px"
                                                            />
                                                        ) : (
                                                            <h4>
                                                                {fiat == "USD"
                                                                    ? formatPrice(current_price)
                                                                    : formatPrice(
                                                                          coin ? coin[fiat] : 0,
                                                                      )}
                                                            </h4>
                                                        )}
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </td>
                                </tr>
                            </>
                        );
                    })}
                </tbody>
            </table>
        </section>
    );
};

export default CriptoTable;
