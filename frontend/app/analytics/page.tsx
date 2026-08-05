"use client";

import {useEffect, useState } from "react";
import axios from "axios";
import { Trade } from "@/types/trade";
import Navbar from "@/components/Navbar";
import Statcard from "@/components/StatCard";
import ProfitBySymbolChart from "@/components/ProfitBySymbolChart";

export default function AnalyticsPage() {
    const [trades, setTrades] = useState<Trade[]>([]);

    useEffect(()  => {
        loadTrades();

        const timer = setInterval(loadTrades, 5000);

        return () => clearInterval(timer);

    }, []);

    async function loadTrades() {
        const res = await axios.get(
            "http://127.0.0.1:8000/api/v1/trades"
        );
        setTrades(res.data);

       
    }
        const totalTrades = trades.length;

        const winningTrades = trades.filter(t => t.profit > 0).length;

        const losingTrades = trades.filter (t => t.profit < 0).length;

        const totalProfit = trades.reduce((sum, t) => sum + t.profit, 0);

        const averageProfit = totalTrades === 0 
        ? 0 :totalProfit / totalTrades;
    
        console.log(trades);  
    
        const profitBySymbol = Object.values(
            trades.reduce((acc, trade) => {
                if(!acc[trade.symbol]) {
                    acc[trade.symbol] = {
                        symbol: trade.symbol,
                        profit: 0
                    };
                }

                acc[trade.symbol].profit += trade.profit;

                return acc;

            
            }, {} as Record<string, {symbol: string; profit: number }>)
        );


        return(
        
        <>
        <Navbar/>
        <main className="bg=gray-300 min-h-screen p-8">
            <h1 className="text-3xl font-bold mb-8">
                Trading Analytics
            </h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Statcard title="Total Trades" value={totalTrades.toString()} />

                <Statcard title="Winning Trades" value={winningTrades.toString()}  valueClassName="text-green-600"/>

                 <Statcard title="Losing Trades" value={losingTrades.toString()}  valueClassName="text-red-600" />

                 <Statcard title="Average Profit" value={`$${averageProfit.toFixed(2)}`}  valueClassName={averageProfit >= 0 ? "text-green-600":"text-red-600"} />
                
            </div>
            <ProfitBySymbolChart data={profitBySymbol} />
        </main>
        </>
    );
}