import http from "./http-common";

// Get Data
const getGameList = async () => {
    return await http.post("api/games/getgamelist");
}; //Get Games List

const getBetInfos = async () => {
    return await http.post("api/history/getBetInfos");
};
const getCashInfos = async () => {
    return await http.post("api/history/getCashInfos");
};
const getGameInfos = async () => {
    return await http.post("api/games/getAllGameInfos");
};

const Action = {
    getGameList,
    getBetInfos,
    getCashInfos,
    getGameInfos,
};

export default Action;
