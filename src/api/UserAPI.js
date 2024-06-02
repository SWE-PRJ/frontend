import ApiManager from "./apiManager";

// 유저 전체 조회
export const fetchUsersAPI = async () => {
  try {
    const response = await ApiManager.get("/users");
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// 유저의 정보 조회
export const fetchUserDataAPI = async () => {
  try {
    const response = await ApiManager.get("/me");
    return response.data;
  } catch (error) {
    console.error("Error fetching user data:", error);
    throw error;
  }
};
