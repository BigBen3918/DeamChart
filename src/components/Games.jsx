import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { FaSortAmountUp } from "react-icons/fa";
import Action from "../service";

const columns = [
    {
        id: 1,
        name: <h5>GAME IMAGE</h5>,
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
        name: <h5>POOLBALANCE</h5>,
        selector: (row) => row.poolBalance,
        sortable: true,
        center: true,
        reorder: true,
    },
];

export default function Games(props) {
    const { setCurrentGame } = props;
    const [games, setGames] = useState(null);

    useEffect(() => {
        InitGetData();
    }, []);

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
            {games !== null ? (
                <div className="games">
                    <DataTable
                        columns={columns}
                        data={games}
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
