"use client";

import {useEffect, useState } from "react";
import axios from "axios";
import { Trade } from "@/types/trade";
import Navbar from "@/components/Navbar";
import StatCard from "@/components/StatCard";
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

        const maxDrawdown = trades.reduce(
            (result, trade) => {

                result.equity += trade.profit;

                if (result.equity > result.peak ){
                    result.peak = result.equity;
                }

                const drawdown = result.equity = result.peak;

                if (drawdown < result.maxDrawdown) {
                    result.maxDrawdown = drawdown; 
                }

                return result;
            },{
                equity:0,
                peak:0,
                maxDrawdown: 0,
            }
        ).maxDrawdown;

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
        <main className="bg-gray-300 dark:bg-zinc-950 min-h-screen p-8">
            <h1 className="text-3xl font-bold mb-8">
                Trading Analytics
            </h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard title="Total Trades" value={totalTrades.toString()} valueClassName="text-black dark:text-white"/>

                <StatCard title="Winning Trades" value={winningTrades.toString()}  valueClassName="text-green-600"/>

                 <StatCard title="Losing Trades" value={losingTrades.toString()}  valueClassName="text-red-600" />

                 <StatCard title="Average Profit" value={`$${averageProfit.toFixed(2)}`} 
                  valueClassName={averageProfit >= 0 ? "text-green-600":"text-red-600"} />

                  <StatCard title="Max Drawdown" value={`$${maxDrawdown.toFixed(2)}`} />
                
            </div>
            <ProfitBySymbolChart data={profitBySymbol} />
        </main>
        </>
    );
}