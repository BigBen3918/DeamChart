import http from "./http-common";

// Get Data
const getGameList = async () => {
    try {
        return await http.post("api/games/getgamelist");
    } catch (err) {
        console.log(err);
    }
}; //Get Games List

const getBetInfos = async () => {
    try {
        return await http.post("api/history/getBetInfos");
    } catch (err) {
        console.log(err);
    }
};
const getCashInfos = async () => {
    try {
        return await http.post("api/history/getCashInfos");
    } catch (err) {
        console.log(err);
    }
};
const getGameInfos = async () => {
    try {
        return await http.post("api/games/getAllGameInfos");
    } catch (err) {
        console.log(err);
    }
};

const Action = {
    getGameList,
    getBetInfos,
    getCashInfos,
    getGameInfos,
};

export default Action;
