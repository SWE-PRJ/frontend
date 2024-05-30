import ApiManager from "./apiManager"

export const createIssueAPI = (title, description, reporterId, priority) => {
    const body = {
        title: title,
        description: description,
        reporterId: reporterId,
        priority: priority
    }
    const response = ApiManager.post("/api/issues", body);
    return response.data;
}

export const getIssuesAPI = async (projectId) => {
    const response = await ApiManager.get("/api/projects/" + projectId + "/issues");
    return response.data;
}
