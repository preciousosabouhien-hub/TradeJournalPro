"use client";

import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, ReferenceLine, Rectangle, BarShapeProps, CartesianGrid } from "recharts" ;
import { useEffect, useState } from "react";


interface Data {
    symbol: string;
    profit: number;
}

interface Props {
    data:Data[];
}

export default function
profitBySymbol({ data } : Props ){
    
    const [darkMode, setDarkMode] = useState(false);

    useEffect(() => {
        const checkTheme = () => {
            setDarkMode(

                document.documentElement.classList.contains("dark")
            );
        };

        checkTheme();

        const observer = new MutationObserver(checkTheme);

        observer.observe(document.documentElement, {
            attributes: true,
            attributeFilter: ["class"],
        });
       
        return () => observer.disconnect(); }, []);
       
    const textColor = darkMode ? "#ffffff" : "#171717";
    const gridColor = darkMode ? "#3f3f46" : "#d4d4d8";
 
    const ProfitBar = (props:BarShapeProps) => {
        const { payload } = props;

        return(
         <Rectangle 
         {...props}
         fill={payload.profit >= 0 ? "#16a34a" : "#dc2626"} radius={[6,6,0,0]}
          />);
    };

    const CustomTooltip = ({ active, payload }: any) => {
        if(!active || !payload || !payload.length){
            return null;
        }
        const profit = Number(payload[0].value);

        const isProfit = profit >= 0;

        return(
            <div className = "bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-700 rounded-lg p-3 shadow-lg" >
                <p className="text-black dark:text-white font-semibold">
                    {payload[0].payload.symbol}
                </p>
                <p className={isProfit ?  " text-green-600 font-bold" : "text-red-600 font-bold" }>
                    {isProfit ? "+" : "-"}${Math.abs(profit).toFixed(2)}
                </p>
                </div>
        );
    };
          
   return (
        <div className="bg-white dark:bg-zinc-900 rounded-xl shadow-md mt-8 p-6 ">
            <h2 className="text-xl font-bold mb-4 text-black dark:text-white">
                Profit by Symbol</h2>


                              <ResponsiveContainer className="text-black dark:text:white" width="100%" height={350}>

                    <BarChart data={data} >
                        <CartesianGrid stroke={gridColor} 
                        strokeDasharray="3 3" />

                    <XAxis dataKey="symbol" tick={{ fill: textColor}}/>
                    
                    <YAxis  tick={{ fill:textColor}} />
                    
                    <Tooltip 
                    cursor={false}
                    content={<CustomTooltip />}
                   />
                   
                    <ReferenceLine y={0} stroke="#000" />
                    <Bar dataKey="profit"  
                    shape={ProfitBar}
                    activeBar={false}/>
                    </BarChart>
                 </ResponsiveContainer>
        </div>
    );
}