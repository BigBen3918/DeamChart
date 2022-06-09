import React, { useEffect, useState } from "react";
import Action from "../service";

export default function Card(props) {
    const { dayEarn } = props;
    const [totalBet, setTotalBet] = useState(0);
    const [totalCash, setTotalCash] = useState(0);
    const [totalAPY, setTotalAPY] = useState(0);
    const [totalStake, setTotalStake] = useState(0);

    useEffect(() => {
        GetAllInfo();
        setInterval(() => {
            GetAllInfo();
        }, 5000);
    }, []);

    useEffect(() => {
        if (dayEarn !== null) {
            setTotalAPY((dayEarn / totalStake) * 100 * 360);
        }
    }, [dayEarn]);

    const GetAllInfo = () => {
        Action.getBetInfos()
            .then((res) => {
                if (res.data.success) {
                    setTotalBet(res.data.result[0][0].betAmount);
                } else {
                    alert(res.data.errors);
                }
            })
            .catch((e) => {
                console.log(e);
            });
        Action.getCashInfos()
            .then((res) => {
                if (res.data.success) {
                    setTotalCash(res.data.result[0][0].cashAmount);
                } else {
                    alert(res.data.errors);
                }
            })
            .catch((e) => {
                console.log(e);
            });
        Action.getGameList()
            .then((res) => {
                if (res.data.success) {
                    let bump = 0;
                    for (let i = 0; i < res.data.games.length; i++) {
                        bump += Number(res.data.games[i].poolBalance);
                    }
                    setTotalStake(bump);
                } else {
                    alert(res.data.errors);
                }
            })
            .catch((e) => {
                console.log(e);
            });
    };

    return (
        <div className="row text-center cards">
            <div className="col-md-3 col-sm-6 col-xs-12">
                <span>
                    <h4>Total Bet</h4>
                    <h5>
                        +
                        {totalBet < 10 ** 9
                            ? totalBet < 10 ** 6
                                ? totalBet < 10 ** 3
                                    ? Number(totalBet).toFixed(2)
                                    : Number(totalBet / 10 ** 3).toFixed(2) +
                                      " K"
                                : Number(totalBet / 10 ** 6).toFixed(2) + " M"
                            : Number(totalBet / 10 ** 9).toFixed(2) + " B"}
                    </h5>
                </span>
            </div>
            <div className="col-md-3 col-sm-6 col-xs-12">
                <span>
                    <h4>Total Earn</h4>
                    <h5>
                        +
                        {totalCash < 10 ** 9
                            ? totalCash < 10 ** 6
                                ? totalCash < 10 ** 3
                                    ? Number(totalCash).toFixed(2)
                                    : Number(totalCash / 10 ** 3).toFixed(2) +
                                      " K"
                                : Number(totalCash / 10 ** 6).toFixed(2) + " M"
                            : Number(totalCash / 10 ** 9).toFixed(2) + " B"}
                    </h5>
                </span>
            </div>
            <div className="col-md-3 col-sm-6 col-xs-12">
                <span>
                    <h4>Total Stake</h4>
                    <h5>
                        +
                        {totalStake < 10 ** 9
                            ? totalStake < 10 ** 6
                                ? totalStake < 10 ** 3
                                    ? Number(totalStake).toFixed(2)
                                    : Number(totalStake / 10 ** 3).toFixed(2) +
                                      " K"
                                : Number(totalStake / 10 ** 6).toFixed(2) + " M"
                            : Number(totalStake / 10 ** 9).toFixed(2) + " B"}
                    </h5>
                </span>
            </div>
            <div className="col-md-3 col-sm-6 col-xs-12">
                <span>
                    <h4>AVG APY</h4>
                    <h5>{Number(totalAPY).toFixed(2)} %</h5>
                </span>
            </div>
        </div>
    );
}
