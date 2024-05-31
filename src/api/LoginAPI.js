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
  console.log(response.data.token);
  localStorage.setItem("token", response.data.token);
  localStorage.setItem("id", response.data.id);
  // localStorage.setItem("role", role);
  ApiManager.defaults.headers.common["Authorization"] = `Bearer ${response.data.token}`;
  console.log('Header', ApiManager.defaults.headers);
  return response;
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