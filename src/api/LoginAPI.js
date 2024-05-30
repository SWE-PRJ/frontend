import ApiManager from "./apiManager";

export const loginAPI = async (identifier, password) => {
  const body = {
    identifier: identifier,
    password: password,
  };

  var response;

  try {
    response = await ApiManager.post("/login", body);
  } catch (error) {
    return false;
  }
  console.log(response.data);
  localStorage.setItem("token", response.data.token);
  ApiManager.defaults.headers.common["Authorization"] = `Bearer ${response.data.token}`;
  console.log('Header', ApiManager.defaults.headers);
  return response;
};
