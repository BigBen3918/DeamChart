import React, { useEffect, useState } from "react";
import moment from "moment";
// layouts
import Header from "../components/layouts/header";
// componets
import Card from "../components/Card";
import Chart from "../components/Chart";
import Games from "../components/Games";
// Action
import Action from "../service";

export default function Main() {
    const [currentGame, setCurrentGame] = useState("");
    const [gameSituation, setGameSituation] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        getAllGamesInfo();
    }, []);

    const getAllGamesInfo = () => {
        setLoading(true);
        Action.getGameInfos()
            .then((res) => {
                if (res.data.success === true) {
                    var allGameData = {};
                    var nowTime = new Date();
                    for (var x of res.data.result[0]) {
                        var allBumpData = [];
                        for (
                            var i = 1654012800000;
                            i <= nowTime.getTime();
                            i += 3600000
                        ) {
                            let bump = {
                                time: moment(i).format("MM/DD/YYYY HH:MM:SS"),
                                Cash: 0,
                                Bet: 0,
                            };
                            for (var y of res.data.result[1]) {
                                let gtime = new Date(
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
                                    bump = {
                                        ...bump,
                                        Bet: Number(y.betAmount),
                                    };
                                    break;
                                }
                            }
                            for (var z of res.data.result[2]) {
                                let gtime = new Date(
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
                                    bump = {
                                        ...bump,
                                        Cash: Number(z.cashAmount),
                                    };
                                    break;
                                }
                            }
                            allBumpData.push(bump);
                        }
                        allGameData = {
                            ...allGameData,
                            [x.poolAddress]: allBumpData,
                        };
                    }
                    setGameSituation(allGameData);
                } else {
                    alert(res.data.errors);
                }
                setLoading(false);
            })
            .catch((err) => {
                console.log(err);
                setLoading(false);
                alert("Operation Error");
            });
    };

    return (
        <>
            <Header />
            <div className="container" id="main__board">
                <div className="spacer-half"></div>
                <Card />
                <div className="spacer-double"></div>
                {loading ? (
                    <div className="justify center">
                        <div className="spinner"></div>
                    </div>
                ) : (
                    <>
                        <Chart
                            currentGame={currentGame}
                            gameSituation={gameSituation}
                        />
                        <div className="spacer-double"></div>
                        <Games setCurrentGame={setCurrentGame} />
                    </>
                )}
                <div className="spacer-double"></div>
            </div>
        </>
    );
}
