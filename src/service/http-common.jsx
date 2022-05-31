import axios from "axios";

const BASE_URL = "http://192.168.115.168:5000/";

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
