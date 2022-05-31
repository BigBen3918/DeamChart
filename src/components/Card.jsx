import React from "react";

export default function Card() {
    return (
        <div className="row text-center cards">
            <div className="col-md-3 col-sm-6 col-xs-12">
                <span>
                    <h4>Total Bet</h4>
                    <h5>210.05k</h5>
                </span>
            </div>
            <div className="col-md-3 col-sm-6 col-xs-12">
                <span>
                    <h4>Total Earn</h4>
                    <h5>110.3k</h5>
                </span>
            </div>
            <div className="col-md-3 col-sm-6 col-xs-12">
                <span>
                    <h4>Total Stake</h4>
                    <h5>502.01k</h5>
                </span>
            </div>
            <div className="col-md-3 col-sm-6 col-xs-12">
                <span>
                    <h4>Total jackpot</h4>
                    <h5>932.75k</h5>
                </span>
            </div>
        </div>
    );
}
