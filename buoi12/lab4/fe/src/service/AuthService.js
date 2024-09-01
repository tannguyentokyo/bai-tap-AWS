import HttpService from "./http-service";

export const login = async (payload) => {
    let response = await HttpService.post('/api/auth/login', {
        body: payload,
    });

    return response.data;
};

export const register = async (payload) => {
    let response = await HttpService.post('/api/auth/register', {
        body: payload,
    });

    return response.data;
}
