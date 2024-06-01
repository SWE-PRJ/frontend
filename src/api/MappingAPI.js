import ApiManager from "./apiManager";

//프로젝트 참여자 추가
export const inviteUserIntoProjectAPI = async (projectId, userId) => {
  const response = await ApiManager.post(
    `/api/projects/${projectId}/${userId}`
  );
  return response.data;
};

//이슈를 개발자에게 할당
export const assignIssueToUserAPI = async (issueId, userId) => {
  const body = {
    userId: userId,
  };
  const response = await ApiManager.post(`/api/issues/${issueId}`, body);
  return response.data;
};
