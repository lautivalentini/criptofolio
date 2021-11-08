export interface ICriptosPrices {
    [cripto: string]: IFiats;
}

export interface IFiats {
    ARS: number;
    USD: number;
}

export interface ICriptos {
    id: string;
    symbol: string;
    name: string;
    image: string;
    current_price: number;
    market_cap_rank: number;
}
