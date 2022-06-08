import React from "react";
import ReactApexChart from "react-apexcharts";

export default function Chart(props) {
    const { series, options } = props;

    return (
        <div className="chart">
            <ReactApexChart
                options={options}
                series={series}
                type="area"
                height={350}
            />
        </div>
    );
}
