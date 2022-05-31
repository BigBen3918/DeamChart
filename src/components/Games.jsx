import React from "react";
import DataTable from "react-data-table-component";
import movies from "../mock";
import { FaSortAmountUp } from "react-icons/fa";

export default function Games() {
    const columns = [
        {
            id: 1,
            name: <h5>Image</h5>,
            selector: (row) => (
                <div className="table__image">
                    <img src={row.image} alt="" />
                </div>
            ),
        },
        {
            id: 2,
            name: <h5>Name</h5>,
            selector: (row) => row.director,
            sortable: true,
            reorder: true,
        },
        {
            id: 3,
            name: <h5>TotalStake ($)</h5>,
            selector: (row) => row.runtime,
            sortable: true,
            center: true,
            reorder: true,
        },
    ];

    const handleClick = (e) => {
        console.log(e);
    };

    return (
        <div className="games">
            <DataTable
                columns={columns}
                data={movies}
                sortIcon={<FaSortAmountUp />}
                responsive
                pagination
                paginationPerPage={5}
                paginationRowsPerPageOptions={[5, 10, 20]}
                onRowClicked={handleClick}
            />
        </div>
    );
}
