import React from "react";

export default function Card() {
    return (
        <div className="row text-center cards">
            <div className="col-md-3 col-sm-6 col-xs-12">
                <span>
                    <h5>Total Bet</h5>
                    <p>210.05k</p>
                </span>
            </div>
            <div className="col-md-3 col-sm-6 col-xs-12">
                <span>
                    <h5>Total Earn</h5>
                    <p>110.3k</p>
                </span>
            </div>
            <div className="col-md-3 col-sm-6 col-xs-12">
                <span>
                    <h5>Total Stake</h5>
                    <p>502.01k</p>
                </span>
            </div>
            <div className="col-md-3 col-sm-6 col-xs-12">
                <span>
                    <h5>Total jackpot</h5>
                    <p>932.75k</p>
                </span>
            </div>
        </div>
    );
}
