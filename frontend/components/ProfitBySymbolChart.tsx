"use client";

import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, ReferenceLine, Rectangle, BarShapeProps, CartesianGrid } from "recharts" ;

interface Data {
    symbol: string;
    profit: number;
}

interface Props {
    data:Data[];
}

export default function
profitBySymbol({ data } : Props ){
    const ProfitBar = (props:BarShapeProps) => {
        const { payload } = props;

        return(
         <Rectangle 
         {...props}
         fill={payload.profit >= 0 ? "#16a34a" : "#dc2626"} radius={[6,6,0,0]} />);
    }
    return (
        <div className="bg-white rounded-xl shadow-md mt-8 p-6">
            <h2 className="text-xl font-bold mb-4 text-black">
                Profit by Symbol</h2>


                              <ResponsiveContainer className="text-black" width="100%" height={350}>
                    <BarChart data={data}><CartesianGrid strokeDasharray="33" />
                    <XAxis dataKey="symbol" />
                    <YAxis />
                    <Tooltip formatter={(value) => [
                        `$${Number(value).toFixed(2)}`, "Profit"
                    ]} />
                    <ReferenceLine y={0} stroke="#000" />
                    <Bar dataKey="profit"  
                    shape={ProfitBar} />
                    </BarChart>
                </ResponsiveContainer>
        </div>
    );
}