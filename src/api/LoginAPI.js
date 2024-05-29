import ApiManager from "./apiManager";

export const loginAPI = async () => {
  const body = {
    identifier: "admin",
    password: "1234",
  };
  const response = await ApiManager.post("/login", body);
  console.log(response.data);
  localStorage.setItem("token", response.data.token);
  ApiManager.defaults.headers.common["Authorization"] = `Bearer ${response.data.token}`;
  console.log('Header', ApiManager.defaults.headers);
  return response.data;
};
