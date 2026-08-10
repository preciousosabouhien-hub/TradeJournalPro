"use client";

import{ useState } from "react";
import TradeDetails from "./TradeDetails";
import { Trade } from "@/types/trade";

type Props = {
    trades: Trade[];
     
};
export default function TradeTable({ trades}: Props){
    
   const [selectedTrade, setSelectedTrade] = useState<Trade | null>(null);

    return (<div className="bg-white dark:bg-zinc-900 rounded-xl shadow-md mt-8 overflow-hidden">
           <div className="p-6 border-b">
           <h2 className="text-black dark:text-white font-bold">Recent Trades</h2></div>

           <table className="w-full">
            <thead className="bg-gray-500 text-black dark:bg-zinc-800 dark:text-white">

           
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
        <tr key={trade.id}className="text-black dark:text-white border-t hover:bg-yellow-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer" 
        onClick={() => setSelectedTrade(trade)}>
            <td className="p-4 text-black dark:text-white ">{trade.ticket}</td>

            <td className="p-4 font-semibold text-black dark:text-white ">{trade.symbol}</td>
            
            <td className={`p-4 font-bold ${trade.trade_type === "BUY" ?"text-green-600":"text-red-600"}`}>{trade.trade_type}</td>
            
            <td className="p-4 text-black dark:text-white ">{trade.entry_price.toFixed(5)}</td>
            
            <td className="p-4 text-black dark:text-white ">{trade.exit_price.toFixed(5)}</td>
            
            <td className="p-4 text-black dark:text-white ">{trade.volume}</td>
                
            <td className={`p-4 font-semibold ${ 
                trade.profit >= 0? 
                "text-green-600"
                :"text-red-600"}`}>{trade.profit >= 0 ?"+" :""}$
                {trade.profit.toFixed(2)}</td>
            <td className="p-4 text-black dark:text-white ">{new Date(trade.open_time).toLocaleString()}</td>
            
            <td className="p-4 text-black dark:text-white ">{new Date(trade.close_time).toLocaleString()}</td>    
                </tr>
    ))}
    </tbody>
    
</table>
  <TradeDetails trade ={selectedTrade} onClose={() => setSelectedTrade(null)}/>


 

    </div>);
}