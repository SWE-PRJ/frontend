import ApiManager from "./apiManager";

export const CreateProjectAPI = async (projectName) => {
    const params = {
        name: projectName,
    };
    console.log('Header', ApiManager.defaults.headers);

    const response = await ApiManager.post("/api/projects?name=testInNext", params);
    console.log(response.data);
    return response.data;
};
