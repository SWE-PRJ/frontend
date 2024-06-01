import ApiManager from "./apiManager";

//프로젝트 생성
export const CreateProjectAPI = async (projectName) => {
  const params = {
    name: projectName,
  };
  console.log("Header", ApiManager.defaults.headers);

  const response = await ApiManager.post(
    "/api/projects?name=testInNext",
    params
  );
  console.log(response.data);
  return response.data;
};

//프로젝트 전체 조회
export const getProjectsAPI = async () => {
  const response = await ApiManager.get("/api/projects");
  return response.data;
};