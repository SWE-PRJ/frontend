import ApiManager from "./apiManager";

//프로젝트 생성
export const CreateProjectAPI = async (projectName) => {
  console.log("Header", ApiManager.defaults.headers);

  const response = await ApiManager.post(`/api/projects?name=${projectName}`);
  console.log(response.data);
  return response.data;
};

//프로젝트 전체 조회
export const getProjectsAPI = async () => {
  const response = await ApiManager.get("/api/projects");
  return response.data;
};

//프로젝트에 속한 유저 검색
export const getProjectDetailsAPI = async (projectId) => {
  const response = await ApiManager.get(`/api/projects/${projectId}`);
  return response.data;
};
