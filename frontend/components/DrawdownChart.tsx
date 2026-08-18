"use client";

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

    return(
        <div className="bg-white dark:bg-zinc-900 rounded-xl shadow-md mt-8 p-6" >
            <h2 className="text-xl font-bold mb-4 text-black dark:text-white">
                Drawdown</h2>
                <ResponsiveContainer width="100%" height={350}>
                    <LineChart data={data}>
                        <CartesianGrid stroke="#52525b" strokeDasharray="3 3"/>
                            <XAxis datakey="trade" tick={{fill: "currentColor"}} />
                            <YAxis tick={{fill:"currentColor"}} />
                            <ReferenceLine y={0} stroke="#71717a" />
                            <Tooltip formatter={(value) => `$${Number(value).toFixed(2)}` } labelFormatter={(label) => `Trade ${label}`} />
                                <Line type="monotone" dataKey="drawdown" stroke="#ef4444" strokeWidth={2} dot={false} />
                                </LineChart>
                                </ResponsiveContainer>
                                </div>
      );
}