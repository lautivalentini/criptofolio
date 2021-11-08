export interface ICriptos {
    BTC: IFiats;
    ETH: IFiats;
    DAI: IFiats;
    ADA: IFiats;
    BNB: IFiats;
}

interface IFiats {
    ARS: number;
    USD: number;
}
