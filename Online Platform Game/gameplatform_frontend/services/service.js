import Api from "../config/axios-api";

const registerApi = (data) => Api.post("/auth/v1/register", data);
const addHistory = (data) => Api.post("/games/history/add", data);
const getProfile = (data) => Api.get(`/profile/${data}`);
const updateProfile = (data) => Api.put("/profile/update", data);
const showLeaderboard = (data) => Api.get(`/games/leaderboard/${data}`);
const leaderboardPagi = (page, limit) =>
  Api.get(`/games/leaderboardpaginate/1?page=${page}&limit=${limit}`);
const scoreNavbar = (data) => Api.get(`/skornavbar/${data}`);
const addProfilePicture = (userId, data) =>
  Api.post(`/multimedia/profic/${userId}`, data);

export default {
  registerApi,
  addHistory,
  getProfile,
  updateProfile,
  showLeaderboard,
  leaderboardPagi,
  scoreNavbar,
  addProfilePicture,
};
