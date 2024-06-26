import ApiManager from "./apiManager";

//이슈 생성
export const createIssueAPI = async (
  title,
  description,
  reporterId,
  priority,
  projectId
) => {
  const body = {
    title: title,
    description: description,
    reporterId: reporterId,
    priority: priority,
  };
  const response = await ApiManager.post(
    `/api/projects/${projectId}/issues`,
    body
  );
  console.log("This is createIssueAPI" + response.data);

  return response.data;
};

//프로젝트에 속한 이슈 검색
export const getProjectIssuesAPI = async (projectId) => {
  const response = await ApiManager.get(
    "/api/projects/" + projectId + "/issues"
  );
  return response.data;
};

//할당된 이슈 검색 - dev
export const getAssigneeIssueAPI = async (projectId, userId) => {
  const response = await ApiManager.get(
    "/api/projects/" + projectId + "/developers/" + userId + "/issues"
  );
  return response.data;
};

//리포트한 이슈 검색 - tester
export const getRepoterIssueAPI = async (projectId, userId) => {
  const response = await ApiManager.get(
    "/api/projects/" + projectId + "/testers/" + userId + "/issues"
  );
  return response.data;
};

//이슈 상태 변경
export const changeIssueStateAPI = async (issueId, state) => {
  const body = {
    state: state,
  };
  const response = await ApiManager.patch(`/api/issues/${issueId}`, body);
  return response;
};

//이슈 통계 분석
export const getIssueStatisticsAPI = async (projectId, startDate, endDate) => {
  const response = await ApiManager.get(
    `/api/projects/${projectId}/issues/statistics?startDate=${startDate}&endDate=${endDate}`
  );
  return response.data;
};

//이슈 상세정보 확인
export const getIssueDetailAPI = async (issueId) => {
  const response = await ApiManager.get(`/api/issues/${issueId}`);
  return response.data;
};

//이슈 삭제
export const deleteIssueAPI = async (issueId) => {
  const response = await ApiManager.delete(`/api/issues/${issueId}`);
  return response.data;
};
