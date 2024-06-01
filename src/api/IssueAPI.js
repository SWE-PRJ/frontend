import ApiManager from "./apiManager"

//이슈 생성
export const createIssueAPI = async (title, description, reporterId, priority, projectId) => {
    const body = {
        title: title,
        description: description,
        reporterId: reporterId,
        priority: priority
    }
    const response = await ApiManager.post(`/api/projects/${projectId}/issues`, body);
    // localStorage.setItem("projectID", projectId);
    console.log("This is createIssueAPI" + response.data);

    return response.data;
}

//프로젝트에 속한 이슈 검색
export const getProjectIssuesAPI = async (projectId) => {
    const response = await ApiManager.get("/api/projects/" + projectId + "/issues");
    return response.data;
}

//할당된 이슈 검색
export const getUserIssueAPI = async (userId) => {
    const response = await ApiManager.get("/api/users/" + userId + "/issues");
    return response.data;
}