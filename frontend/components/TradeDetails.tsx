 "use client";
 import axios from "axios";
 import { useEffect, useState } from "react";
 import { Trade } from "@/types/trade";

 interface Props{
    trade: Trade | null;
    onClose: () => void;
 }
 function formatDuration(open:string, close: string){
   const start = new Date(open).getTime();
   const end = new Date(close).getTime();

   const diff = Math.floor((end - start) / 1000);
    
   const hours = Math.floor(diff / 3600);
   const minutes = Math.floor((diff % 3600) / 60);

   const seconds = diff % 60;

   return `${hours}h ${minutes}m ${seconds}s`;
 }
 export default function TradeDetails({ trade, onClose }: Props ){
    
    const [notes, setNotes] = useState("");
    const [strategy, setStrategy] =useState("");
    useEffect(() => { setNotes(trade?.notes ?? "");
                       setStrategy(trade?.strategy ?? "");
    }, [trade]);
  
    const saveNotes = async () => {
      if(!trade) return;

      try {
         await axios.patch(
            `http://127.0.0.1:8000/api/v1/trades/${trade.id}`,
            {
               notes: notes,
               strategy: strategy
            }
         );
         setSaved(true);

         setTimeout(() => {
            setSaved(false);
         }, 2000);
      }
      catch (error){
         console.error(error);
         alert("failed to save notes.");
      }
    };

    const [saved, setSaved] = useState(false);
     
   if (!trade) return null;
      
     return(
        <div className="fixed top-0 right-0 h-full w-96 bg-white shadow-2xl p-6 overflow-y-auto z-50">
             <button onClick={onClose} className="text-red-600 font-bold float-right">
                    X</button>
            <div className="flex justify-between items-center mb-6" >
                <h2 className="text-white bg-zinc-900 p-5 w-full text-xl font-bold">
                   &nbsp;Trade Details
                </h2>

               
            </div>
            <div className="space-y-4 border-black">
                    <h3 className="text-black"><strong>Ticket:&nbsp;</strong>{trade.ticket}</h3>
                    <h3 className="text-black"><strong>Symbol:&nbsp;</strong>{trade.symbol}</h3>
                    <h3 className="text-black"><strong>Direction:&nbsp;</strong>
                    <b className={`${trade.trade_type === "BUY" ?"text-green-600":"text-red-600"}`}>
                       {trade.trade_type} </b></h3>
                    <h3 className="text-black"><strong>Volume:&nbsp;</strong>{trade.volume}</h3>
                    <h3 className="text-black"><strong>Entry:&nbsp;</strong>{trade.entry_price}</h3>
                    <h3 className="text-black"><strong>Exit:&nbsp;</strong>{trade.exit_price}</h3>
                    <h3 className="text-black"><strong>Outcome:&nbsp;</strong>
                    <b className={`${ trade.profit >= 0? "text-green-600":"text-red-600"}`}>
                   {trade.profit}</b></h3>
                    <h3 className="text-black"><strong>Open:&nbsp;</strong>{trade.open_time}</h3>
                    <h3 className="text-black"><strong>Close:&nbsp;</strong>{trade.close_time}</h3>
                    <h3 className="text-black"><strong>Duration:&nbsp;</strong>{formatDuration(trade.open_time, trade.close_time)}</h3>
                   <div className="mt-6">
                     <label className="block font-semibold mb-2">Strategy</label>
                     <select value={strategy} onChange={(e) => setStrategy(e.target.value)}
                     className="w-full border rounded-lg p-3">
                        <option value="">Select Strategy </option>
                         <option value="Supply & Demand">Supply & Demand </option>
                           <option value="Breakout">Breakout </option>
                             <option value="Reversal">Reversal </option>
                               <option value="Scalping">Scalping </option>
                                 <option value="Swing">Swing </option>
                                   <option value="News">News </option>
                     </select>
                   </div>
                   <div className="mt-6">
                     <label className="block text-black font-semibold mb-2" >Trade Notes</label>
                     <textarea
                     value={notes}
                     onChange={(e) => setNotes(e.target.value)}
                     rows={6}
                     className="w-full border text-black rounded-lg p-3"
                     placeholder="Why did you enter this trade? What did you learn?"/>
                     {saved && ( <p className="text-green-600 font-semibold mb-2">
                         Notes Saved successfully
                     </p>)}
                     <button onClick={saveNotes} className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 ">
                        Save Notes
                     </button>
                   </div>
            </div>
        </div>
     );
     
}