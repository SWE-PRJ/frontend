import ApiManager from "./apiManager";

export const getUser = async () => {
  const response = await ApiManager.get("/User");
  console.log(response.data);
  return response.data;
};
