export interface Trade {
    id:number;
    ticket:string;
    symbol:string;
    trade_type:string;
    volume:number;
    profit:number;
    entry_price:number;
    exit_price:number;
    broker:string;
    open_time:string;
    close_time:string;
    
    notes?:string;
}