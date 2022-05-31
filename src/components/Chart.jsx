import React, { useEffect, useState } from "react";
import {
    ComposedChart,
    Line,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
} from "recharts";

const data = [
    {
        name: "27/05/2022 ",
        earn: 4000,
        bet: 2400,
        total: 6400,
    },
    {
        name: "28/05/2022 ",
        earn: 1890,
        bet: 4800,
        total: 6690,
    },
    {
        name: "29/05/2022 ",
        earn: 2390,
        bet: 3800,
        total: 6190,
    },
    {
        name: "30/05/2022 ",
        earn: 3490,
        bet: 4300,
        total: 7790,
    },
];

export default function Chart() {
    const [width, setWidth] = useState(0);

    useEffect(() => {
        const setResponsiveness = () => {
            let w = document.getElementById("main__board").offsetWidth;
            let ww = window.innerWidth;
            if (ww < 650) setWidth(w - 50);
            else setWidth(w);
        };

        setResponsiveness();
        window.addEventListener("resize", () => setResponsiveness());
    });

    return (
        <div>
            <ComposedChart width={width} height={400} data={data} margin={0}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" tick={{ fill: "black" }} />
                <YAxis tick={{ fill: "black" }} />
                <Tooltip
                    contentStyle={{
                        backgroundColor: "#2d80df",
                    }}
                />
                <Legend />
                <Area
                    type="monotone"
                    dataKey="bet"
                    fill="#87faa4"
                    stroke="#87faa4"
                />
                <Line type="monotone" dataKey="earn" stroke="#ff2a2a" />
                <Line type="monotone" dataKey="total" stroke="#00f3d3" />
            </ComposedChart>
        </div>
    );
}
