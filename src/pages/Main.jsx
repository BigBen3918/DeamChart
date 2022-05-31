import React from "react";
// layouts
import Header from "../components/layouts/header";
// componets
import Card from "../components/Card";
import Chart from "../components/Chart";
import Games from "../components/Games";

export default function Main() {
    return (
        <>
            <Header />
            <div className="container" id="main__board">
                <div className="spacer-half"></div>
                <Card />
                <div className="spacer-double"></div>
                <Chart />
                <div className="spacer-10"></div>
                <Games />
                <div className="spacer-double"></div>
            </div>
        </>
    );
}
