"use client";

import { useEffect, useState } from "react";
import axios from "axios";

import EquityChart from "./EquityChart";
import Navbar from  "./Navbar";
import StatCard from "./StatCard";
import TradeTable from "./TradeTable";
import {Trade} from "@/types/trade";


export default function LiveDashboard() {
   const [trades, setTrades] = useState<Trade[]>([]);
   
   const [search, setSearch] = useState("");

   const [direction, setDirection] = useState("ALL");

   const loadTrades = async () => {
   
   const res = await
   axios.get("http://127.0.0.1:8000/api/v1/trades");
    setTrades(res.data);
   };

   useEffect(() => {
    loadTrades();

    const timer =setInterval(loadTrades, 5000);
       
    return () => clearInterval(timer);
  }, []);

  const totalProfit = trades.reduce(
    (sum, trade) => sum + trade.profit, 0
  );
 
  const winningTrades = trades.filter(
    trade => trade.profit > 0
  ).length;

  const losingTrades = trades.filter(
    trade => trade.profit < 0).length;

  const winRate = trades.length === 0 ? 0
  :(winningTrades/ trades.length) * 100;

  const grossProfit = trades
  .filter(t => t.profit > 0)
  .reduce((sum, t) => sum + t.profit, 0);

  const grossLoss = Math.abs(
    trades
    .filter(t => t.profit < 0)
    .reduce((sum, t) => sum + t.profit, 0)
);

const profitFactor = 
 grossLoss === 0
 ? grossProfit
  : grossProfit / grossLoss;

const averageWin = 
  winningTrades === 0 
    ? 0
    :grossProfit / winningTrades;

const averageLoss =
 losingTrades === 0
  ? 0
   :grossLoss / losingTrades;

const largestWin = 
 trades.length === 0
  ? 0
   :Math.max(...trades.map(t => t.profit));

const largestLoss =
  trades.length === 0
  ? 0
  : Math.min(...trades.map(t => t.profit));

const filteredTrades = trades.filter((trade) => {

const symbolMatch =
     trade.symbol
      .toLowerCase()
      .includes(search.toLowerCase());

const directionMatch =
 direction === "ALL"
 ? true
 :trade.trade_type === direction;

 return symbolMatch && directionMatch;
   
});
    return (
        <>
        <Navbar />
            <main className="bg-gray-300 dark:bg-zinc-950 min-h-screen p-8">

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            
                <StatCard title="Total Profit" value={`$${totalProfit.toFixed(2)}`}  valueClassName={totalProfit >= 0 ? "text-green-600":"text-red-600"} />
                
                <StatCard title="Win Rate" value={`${winRate.toFixed(1)}%`} />
                
                <StatCard title="Trades" value={trades.length.toString()} />
                
                <StatCard title="Profit Factor" value={profitFactor.toFixed(2)} />
            
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
              <StatCard title="Average Win" value={`$${averageWin.toFixed(2)}`} valueClassName="text-green-600" />
              <StatCard title="Average Loss" value={`$${averageLoss.toFixed(2)}`} valueClassName="text-red-600" />
              <StatCard title="Largest Win" value={`$${largestWin.toFixed(2)}`} valueClassName="text-green-600" />
              <StatCard title="Largest Loss" value={`$${largestLoss.toFixed(2)}`} valueClassName="text-red-600" />

            </div>
            <EquityChart trades={trades} /><br/>
            <div className="text-black flex flex-col md:flex-row gap-4 mb-6">
              
              <input type="text" placeholder="Search Symbol..." value={search} onChange={(e) => setSearch(e.target.value)}
              className="bg-white dark:bg-zinc-900 border-black rounded-lg p-2 w-full md:w-64" />
              <select value={direction} onChange={(e) => setDirection(e.target.value)}
                className="bg-white dark:bg-zinc-900 border-black rounded-lg p-2"
              >
                <option value="ALL" >All Trades </option>
                                <option value="BUY" >BUY </option>
                <option value="SELL" >SELL </option>
              </select>

            </div>
            <TradeTable trades={filteredTrades} />
            
            </main>
           
            </>
    );
}