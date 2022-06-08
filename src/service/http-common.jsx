import axios from "axios";

const BASE_URL = "https://game.babylonswap.finance/";

export default axios.create({
    baseURL: BASE_URL,
    method: "POST",
    headers: {
        "Content-type": "application/json",
        common: {
            authorization: localStorage.getItem("adminToken"),
        },
    },
});
