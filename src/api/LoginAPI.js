import ApiManager from "./apiManager";

//로그인
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
  localStorage.setItem("id", response.data.id);
  localStorage.setItem("role", response.data.role);
  ApiManager.defaults.headers.common[
    "Authorization"
  ] = `Bearer ${response.data.token}`;
  console.log("Header", ApiManager.defaults.headers);
  return response;
};

//계정등록(회원가입)
export const registerAPI = async (
  identifier,
  password,
  role,
  adminIdentifier
) => {
  const body = {
    identifier: identifier,
    password: password,
  };
  var response;

  try {
    response = await ApiManager.post(
      `/admin/register?role=${role}&adminIdentifier=${adminIdentifier}`,
      body
    );
  } catch (error) {
    if (error.response && error.response.status === 409) {
      throw new Error("The identifier already exists.");
    } else {
      throw new Error("An unexpected error occurred.");
    }
  }
  return response;
};
