import axios from "axios";

import { CRIPTOS, FIATS, API_URL } from "../utils/data";
import { ICriptos } from "../utils/interfaces";

export const getCriptoPrices = async (exchange: string) => {
    let result: ICriptos = {};

    const prices = await Promise.all(
        CRIPTOS.map(async (coin) => {
            const res = await Promise.all(
                FIATS.map(async (fiat) => {
                    const { data } = await axios.get(
                        `${API_URL}/${exchange}/${coin.alias}/${fiat.toLowerCase()}`,
                    );

                    return {
                        alias: coin.alias,
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
            result[cripto.alias] = {
                ...result[cripto.alias],
                [cripto.fiat]: cripto.price,
            };
        });
    });

    return result;
};
