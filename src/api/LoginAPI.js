import ApiManager from "./apiManager";

export const loginAPI = async () => {
  const body = {
    identifier: "juyoung",
    password: "1234",
  };
  const response = await ApiManager.post("/login", body);
  console.log(response.data);
  localStorage.setItem("token", response.data.token);
  ApiManager.defaults.headers.common["Authorization"] = `Bearer ${response.data.token}`;
  console.log('Header', ApiManager.defaults.headers);
  return response.data;
};

export const registerAPI = async (name, identifier, password, role, adminIdentifier) => {
  const body = {
    name: name,
    identifier: identifier,
    password: password
  }
  const response =
    await ApiManager.post(
      `/admin/register?role=${role}&adminIdentifier=${adminIdentifier}`, body
    );
  return response.data;
};