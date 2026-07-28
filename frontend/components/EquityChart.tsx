"use client";

import{
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid,
    ResponsiveContainer,
}
from "recharts";

type Trade ={
    id:number;
    profit:number;

};

type Props ={
    trades: Trade[];
};

export default function EquityChart({ trades }:
    Props) {
        let balance = 0;

        const data = trades.map((trade, index) => {
            balance += trade.profit;

            return{
               trade:index + 1,
               equity:balance,
            };
        });

    return (
        <div className="bg-white rounded-xl shadow-md mt-8 p-6">
            <h2 className="text-black text-xl font-bold mb-4">
                Equity Curve
            </h2>
            <div className="h-96">
            <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data}>
                    <CartesianGrid strokeDasharray="2 2" stroke="#E5E7EB" />
                    

                    <XAxis dataKey="trade" />

                    <YAxis tickFormatter={(value) => `$${value}`} />

                    <Tooltip />
                    <Line             type="monotone" dataKey="equity" stroke="#EAB308" strokeWidth={3} dot={false} />

                </LineChart>
            </ResponsiveContainer>
        </div>
        </div>
    );
    }
