"use client";


import { useEffect, useState } from "react";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    CartesianGrid,
    ReferenceLine,
}  from "recharts";

interface Trade {
    profit: number;
    close_time: string;
}

interface Props{
    trades: Trade[];
}

export default function 
DrawdownChart({ trades }: Props ){
    const [darkMode, setDarkMode] = useState(false);

    useEffect(() =>{
        const checkTheme = () => {
            setDarkMode(

                document.documentElement.classList.contains("dark")
            );
        };
        checkTheme();

        const observer = new MutationObserver(checkTheme);

        observer.observe(document.documentElement, {
            attributes: true,
            attributesFilter: ["class"],
        });

        return () => observer.disconnect();
    }, []);

    let equity = 0;
    let peak = 0;

    const data = trades.map((trade, index) => {
        equity += trade.profit;

        if (equity > peak){
            peak = equity;
        }

        const drawdown = equity - peak;

        return {
            trade: index + 1,
            date: new Date(trade.close_time).toLocaleDateString(), drawdown,
        };
    });

       const textColor = darkMode ? "#ffffff" : "#171717";
       const gridColor = darkMode ? "#3f3f46" : "#d4d4d8";

    return(
        <div className="bg-white dark:bg-zinc-900 rounded-xl shadow-md mt-8 p-6" >
            <h2 className="text-xl font-bold mb-4 text-black dark:text-white">
                Drawdown</h2>
                <ResponsiveContainer width="100%" height={350}>
                    <LineChart data={data}>
                        <CartesianGrid stroke="#52525b" strokeDasharray="3 3"/>
                            <XAxis datakey="trade" tick={{fill:textColor}} label={{value: "Trades", position:"insideBottom", offset: -5,
                                fill:textColor,
                            }} />
                            <YAxis tick={{fill:textColor}} />
                            <ReferenceLine y={0} stroke="textColor" />
                            <Tooltip contentStyle={{
                                backgroundColor: darkMode ? "#18181b" : "#ffffff", border: darkMode ? "1px solid #3f3f46" : "1px solid #d4d4d8",
                                borderRadius: "8px",
                            }}
                            formatter={(value) => [`$${Number(value).toFixed(2)},"Drawdown"` ]} 
                            labelFormatter={(label) => `Trade ${label}`} />
                                <Line type="monotone" dataKey="drawdown" stroke="#ef4444" strokeWidth={2} dot={false} />
                                </LineChart>
                                </ResponsiveContainer>
                                </div>
      );
}