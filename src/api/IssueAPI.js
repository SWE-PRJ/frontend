import ApiManager from "./apiManager"

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

export const getProjectIssuesAPI = async (projectId) => {
    const response = await ApiManager.get("/api/projects/" + projectId + "/issues");
    return response.data;
}

export const getUserIssueAPI = async (userId) => {
    const response = await ApiManager.get("/api/users/" + userId + "/issues");
    return response.data;
}