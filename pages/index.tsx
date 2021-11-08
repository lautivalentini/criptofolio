import React, { useEffect, useState } from "react";
import axios from "axios";

import ExchangeSelector from "../components/ExchangeSelector";
import CriptoTable from "../components/CriptoTable/CriptoTable";
import { getCriptoPricesByExchange } from "../api/criptoApi";
import { COINGECKO_API } from "../utils/data";
import { ICriptosPrices, ICriptos } from "../utils/interfaces";
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
            <ExchangeSelector exchange={exchange} handleChangeExchange={handleChangeExchange} />
            <CriptoTable
                criptos={criptos}
                loading={loading}
                result={result}
                update={update}
                updatedCriptos={updatedCriptos}
            />
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
