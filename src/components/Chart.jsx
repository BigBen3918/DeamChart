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

export default function Chart(props) {
    const { currentGame, gameSituation } = props;
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
    }, []);

    return (
        <div>
            <ComposedChart
                width={width}
                height={400}
                data={gameSituation[currentGame]}
                margin={0}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" tick={{ fill: "black" }} />
                <YAxis tick={{ fill: "black" }} />
                <Tooltip
                    contentStyle={{
                        backgroundColor: "#2d80df",
                    }}
                />
                <Legend
                    wrapperStyle={{
                        padding: "15px 0",
                        background: "linear-gradient(to top, #2d80df, #4585ce)",
                    }}
                />
                <Area
                    type="monotone"
                    dataKey="Cash"
                    fill="#87faa49d"
                    stroke="#00f3d3"
                />
                <Line type="monotone" dataKey="Bet" stroke="#ff2a2a" />
            </ComposedChart>
        </div>
    );
}
