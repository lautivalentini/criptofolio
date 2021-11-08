import axios from "axios";

import { FIATS, API_URL } from "../utils/data";
import { ICriptos, ICriptosPrices } from "../utils/interfaces";

export const getCriptoPricesByExchange = async (exchange: string, criptos: ICriptos[]) => {
    let result: ICriptosPrices = {};

    const prices = await Promise.all(
        criptos.map(async (coin) => {
            const res = await Promise.all(
                FIATS.map(async (fiat) => {
                    const { data } = await axios.get(
                        `${API_URL}/${exchange}/${coin.symbol}/${fiat.toLowerCase()}`,
                    );

                    return {
                        symbol: coin.symbol,
                        fiat,
                        price: data == "Invalid pair" ? 0 : data.ask,
                    };
                }),
            );

            return res;
        }),
    );

    prices.forEach((item) => {
        item.forEach((cripto) => {
            result[cripto.symbol] = {
                ...result[cripto.symbol],
                [cripto.fiat]: cripto.price,
            };
        });
    });

    return result;
};
