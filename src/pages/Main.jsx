import React, { useEffect, useState } from "react";
import moment from "moment";
// layouts
import Header from "../components/layouts/header";
import Footer from "../components/layouts/footer";
// componets
import Card from "../components/Card";
import Chart from "../components/Chart";
import Games from "../components/Games";
// Action
import Action from "../service";

export default function Main() {
    const [currentGame, setCurrentGame] = useState("");
    const [loading, setLoading] = useState(false);
    const [betAmount, setBetAmount] = useState({});
    const [cashAmount, setCashAmount] = useState({});
    const [betTime, setBetTime] = useState([]);
    const [series, setSeries] = useState([]);
    const [options, setOptions] = useState({});
    const [dayEarn, setDayEarn] = useState(null);
    const [dayGameEarn, setDayGameEarn] = useState(null);
    const [games, setGames] = useState(null);

    useEffect(() => {
        getAllGamesInfo();
    }, []);

    useEffect(() => {
        setSeries([
            {
                name: "Bets",
                data: betAmount[currentGame],
            },
            {
                name: "Earnings",
                data: cashAmount[currentGame],
            },
        ]);

        setOptions({
            chart: {
                height: 350,
                type: "area",
                zoom: {
                    autoScaleYaxis: true,
                },
                toolbar: {
                    tools: {
                        download: true,
                        selection: false,
                        zoom: true,
                        zoomin: false,
                        zoomout: false,
                        pan: true,
                        reset: true,
                    },
                    autoSelected: "zoom",
                },
            },
            dataLabels: {
                enabled: false,
            },
            stroke: {
                curve: "smooth",
            },
            xaxis: {
                type: "date",
                categories: betTime,
                labels: {
                    style: {
                        colors: "#ddd",
                    },
                },
            },
            yaxis: {
                labels: {
                    style: {
                        colors: "white",
                    },
                },
            },
            tooltip: {
                x: {
                    format: "MM/dd/yyyy",
                },
            },
            fill: {
                type: "gradient",
                gradient: {
                    shadeIntensity: 1,
                    opacityFrom: 1,
                    opacityTo: 0,
                },
            },
            legend: {
                position: "top",
                horizontalAlign: "center",
                labels: {
                    colors: "white",
                },
            },
        });

        if (
            betTime.length !== 0 &&
            Object.keys(betAmount).length !== 0 &&
            Object.keys(cashAmount).length !== 0
        ) {
            let dayBet = 0;
            let dayCash = 0;
            let dayGame = {};
            for (var x in betAmount) {
                let bumpBet = 0;
                let bumpCash = 0;
                for (
                    let i = betAmount[x].length - 1;
                    i > betAmount[x].length - 168;
                    i--
                ) {
                    dayBet += Number(betAmount[x][i]);
                    dayCash += Number(cashAmount[x][i]);
                    bumpBet += Number(betAmount[x][i]);
                    bumpCash += Number(cashAmount[x][i]);
                }
                dayGame = {
                    ...dayGame,
                    [x]: bumpBet - bumpCash,
                };
            }
            setDayGameEarn(dayGame);
            setDayEarn(dayBet - dayCash);
        }
    }, [betAmount, cashAmount, currentGame, betTime]);

    const getAllGamesInfo = () => {
        setLoading(true);
        try {
            Action.getGameInfos().then((res) => {
                if (res.data.success) {
                    var allBetData = [];
                    var allCashData = [];
                    var allTime = [];
                    var nowTime = new Date();
                    for (
                        var i = 1654531200000;
                        i <= nowTime.getTime();
                        i += 3600000
                    ) {
                        allTime.push(moment(i).format("MM/DD/YYYY HH"));
                    }

                    for (var x of res.data.result[0]) {
                        var bpp = [];
                        for (
                            var i = 1654531200000;
                            i <= nowTime.getTime();
                            i += 3600000
                        ) {
                            var bump = 0;
                            for (var y of res.data.result[1]) {
                                var gtime = new Date(
                                    y._id.month +
                                        "/" +
                                        y._id.day +
                                        "/" +
                                        y._id.year +
                                        " " +
                                        y._id.hour +
                                        ":00:00"
                                );
                                if (
                                    i === gtime.getTime() &&
                                    x.poolAddress === y._id.poolAddress
                                ) {
                                    bump = Number(y.betAmount).toFixed(0);
                                    break;
                                }
                            }
                            bpp.push(bump);
                        }
                        allBetData[x.poolAddress] = bpp;

                        var cpp = [];
                        for (
                            var i = 1654531200000;
                            i <= nowTime.getTime();
                            i += 3600000
                        ) {
                            var bump = 0;
                            for (var z of res.data.result[2]) {
                                var gtime = new Date(
                                    z._id.month +
                                        "/" +
                                        z._id.day +
                                        "/" +
                                        z._id.year +
                                        " " +
                                        z._id.hour +
                                        ":00:00"
                                );
                                if (
                                    i === gtime.getTime() &&
                                    x.poolAddress === z._id.poolAddress
                                ) {
                                    bump = Number(z.cashAmount).toFixed(0);
                                    break;
                                }
                            }
                            cpp.push(bump);
                        }
                        allCashData[x.poolAddress] = cpp;
                    }

                    setBetAmount(allBetData);
                    setCashAmount(allCashData);
                    setBetTime(allTime);
                } else {
                    console.log(res.data.errors);
                }
                setLoading(false);
            });
        } catch (err) {
            console.log(err);
            setLoading(false);
            console.log("Operation Error");
        }
    };

    return (
        <>
            <Header />
            <div className="container" id="main__board">
                <div className="spacer-half"></div>
                <Card dayEarn={dayEarn} />
                <div className="spacer-double"></div>
                {loading ? (
                    <div className="justify center">
                        <div className="spinner"></div>
                    </div>
                ) : (
                    <>
                        {currentGame === "" ? (
                            <h4 className="justify middle center text-white">
                                !Click Any Game From The List Below To See Its
                                Chart
                            </h4>
                        ) : null}
                        <Chart series={series} options={options} />
                        <div className="spacer-double"></div>
                        <Games
                            games={games}
                            setGames={setGames}
                            dayGameEarn={dayGameEarn}
                            setCurrentGame={setCurrentGame}
                        />
                    </>
                )}
                <div className="spacer-double"></div>
            </div>
            <Footer />
        </>
    );
}
