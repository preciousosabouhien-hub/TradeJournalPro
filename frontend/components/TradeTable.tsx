type Trade ={
    id:number;
    ticket:string;
    symbol:string;
    trade_type:string;
    entry_price:number;
    exit_price:number;
    volume:number;
    profit:number;
    open_time:string;
    close_time:string;
};

type Props = {
    trades: Trade[];
};

export default function TradeTable({ trades}: Props){
    return (<div className="bg-white rounded-xl shadow-md mt-8 overflow-hidden">
           <div className="p-6 border-b">
           <h2 className="text-black font-bold">Recent Trades</h2></div>

           <table className="w-full">
            <thead className="bg-zinc-800">

           
            <tr>
                <th className="text-left p-4">Tickets</th>
                <th className="text-left p-4">Symbol</th>
                <th className="text-left p-4">Type </th>
                <th className="text-left p-4">Entry</th>
                <th className="text-left p-4">Exit</th>
                <th className="text-left p-4">Volume</th>
                <th className="text-left p-4">Profit</th>
                <th className="text-left p-4">Opened</th>
                <th className="text-left p-4">Closed</th>
            </tr>
             </thead>
             <tbody>
                {trades.map((trade) => (
                    <tr key={trade.id}className="text-black border-t hover:bg-yellow-100 transition-colors cursor-pointer">
                        <td className="p-4">{trade.ticket}</td>

                        <td className="p-4 font-semibold">{trade.symbol}</td>
                        
                        <td className={`p-4 font-bold ${trade.trade_type === "BUY" ?"text-green-600":"text-red-600"}`}>{trade.trade_type}</td>
                        
                        <td className="p-4">{trade.entry_price.toFixed(5)}</td>
                        
                        <td className="p-4">{trade.exit_price.toFixed(5)}</td>
                        
                        <td className="p-4">{trade.volume}</td>
                         
                        <td className={`p-4 font-semibold ${ 
                            trade.profit >= 0? 
                            "text-green-600"
                            :"text-red-600"}`}>{trade.profit >= 0 ?"+" :""}$
                            {trade.profit.toFixed(2)}</td>
                        <td className="p-4">{new Date(trade.open_time).toLocaleString()}</td>
                        
                        <td className="p-4">{new Date(trade.close_time).toLocaleString()}</td>    
                         </tr>
                ))}
             </tbody>
           </table>

    </div>);
}