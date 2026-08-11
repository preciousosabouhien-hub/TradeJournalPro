"use client";
import {useEffect, useState } from "react" ;
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
        //Dark mode
        const [darkMode, setDarkMode] = useState(false);

        useEffect(() => {
            const checkTheme = () =>{
                setDarkMode(
                    document.documentElement.classList.contains("dark")
                );
            };
             checkTheme();

             const observer= new MutationObserver(checkTheme);

             observer.observe(document.documentElement, {
                attributes: true ,
                attributeFilter:["class"],
             });
             return () => observer.disconnect(); }, []);

             const textColor = darkMode ? "#ffffff" : "#171717";

             const gridColor = darkMode ? "#3f3f46" : "#d4d4d8" ;
        
             //Build equity curve
        let balance = 0;

        const data = trades.map((trade, index) => {
            balance += trade.profit;

            return{
               trade:index + 1,
               equity:balance,
            };
        });

    return (
        <div className="bg-white dark:bg-zinc-900 rounded-xl shadow-md mt-8 p-6">
            <h2 className="text-black dark:text-white text-xl font-bold mb-4">
                Equity Curve
            </h2>
            <div className="h-96">
            <ResponsiveContainer width="100%" height="100%" >
                <LineChart data={data} >
                    <CartesianGrid strokeDasharray="2 2" stroke="#E5E7EB" />
                    

                    <XAxis dataKey="trade"  tick={{fill: textColor}}/>

                    <YAxis tick={{ fill:textColor}} tickFormatter={(value) => `$${value}`} />

                    <Tooltip  labelClassName="text-black dark:text-white" contentStyle={{backgroundColor: darkMode ? "#1818b" : "#ffffff",
                    border: darkMode ? "1px solid #3f3f46" : "1px solid #d4d4d8",
                    borderRadius : "8px", color: textColor, }} formatter={(value) => [ `$${Number(value).toFixed(2)}`, "Equity",]} />

                    <Line  type="monotone" 
                     dataKey="equity" stroke="#EAB308" strokeWidth={3} dot={false} />

                </LineChart>
            </ResponsiveContainer>
        </div>
        </div>
    );
    }
