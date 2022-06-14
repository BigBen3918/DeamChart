import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { FaSortAmountUp } from "react-icons/fa";
import Action from "../service";

const columns = [
    {
        id: 1,
        name: "",
        selector: (row) => (
            <div className="table__image">
                <img src={row.game_img_src} alt="" />
            </div>
        ),
        center: true,
    },
    {
        id: 2,
        name: <h5>GAME NAME</h5>,
        selector: (row) => row.name,
        sortable: true,
        reorder: true,
        center: true,
    },
    {
        id: 3,
        name: <h5>Pool Balance (XBT)</h5>,
        selector: (row) => Number(row.poolBalance).toFixed(2),
        sortable: true,
        center: true,
        reorder: true,
    },
    {
        id: 4,
        name: <h5>APY (%)</h5>,
        selector: (row) => row.apy,
        sortable: true,
        center: true,
        reorder: true,
    },
];

export default function Games(props) {
    const { setCurrentGame, dayGameEarn, games, setGames } = props;

    const [updateGames, setUpdateGames] = useState(null);

    useEffect(() => {
        InitGetData();
    }, []);

    useEffect(() => {
        if (dayGameEarn !== null && games !== null) {
            let dayData = [];
            for (let i = 0; i < games.length; i++) {
                let bump = games[i];
                for (let x in dayGameEarn) {
                    if (x === bump.poolAddress) {
                        bump = {
                            ...bump,
                            apy: Number(
                                (((dayGameEarn[x] / bump.poolBalance) * 100) /
                                    7) *
                                    360
                            ).toFixed(2),
                        };
                    }
                }
                dayData.push(bump);
            }
            setUpdateGames(dayData);
        }
    }, [dayGameEarn, games]);

    const handleClick = (e) => {
        setCurrentGame(e.poolAddress);
    };

    const InitGetData = () => {
        Action.getGameList()
            .then((res) => {
                if (res.data.success) {
                    setGames(res.data.games);
                } else {
                    alert(res.data.errors);
                }
            })
            .catch((e) => {
                console.log(e);
            });
    };

    return (
        <section>
            {updateGames !== null ? (
                <div className="games">
                    <DataTable
                        columns={columns}
                        data={updateGames}
                        sortIcon={<FaSortAmountUp />}
                        responsive
                        pagination
                        paginationPerPage={5}
                        paginationRowsPerPageOptions={[5, 10, 20]}
                        onRowClicked={handleClick}
                    />
                </div>
            ) : (
                <div className="justify center">
                    <div className="spinner"></div>
                </div>
            )}
        </section>
    );
}
