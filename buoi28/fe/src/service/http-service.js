import axios from 'axios';

class _HttpService {

    async get(uri, options = {headers: {}, params: {}, body: {}}) {
        try {
            return await this.request('GET', uri, options);
        } catch (error) {
            return {
                data: error?.response?.data,
            }
        }
    }

    async post(uri, options = {headers: {}, params: {}, body: {}}) {
        try {
            return await this.request('POST', uri, options);
        } catch (error) {
            return {
                data: error?.response?.data,
            }
        }
    }

    async put(uri, options = {headers: {}, params: {}, body: {}}) {
        try {
            return await this.request('PUT', uri, options);
        } catch (error) {
            return {
                data: error?.response?.data,
            }
        }
    }

    async patch(uri, options = {headers: {}, params: {}, body: {}}) {
        try {
            return await this.request('PATCH', uri, options);
        } catch (error) {
            return {
                data: error?.response?.data,
            }
        }
    }

    async delete(uri, options = {headers: {}, params: {}, body: {}}) {
        try {
            return await this.request('DELETE', uri, options);
        } catch (error) {
            return {
                data: error?.response?.data,
            }
        }
    }

    async request(method, uri, options = {headers: {}, params: {}, body: {}}) {
        console.log(process.env.REACT_APP_BASE_API);
        return await axios.request({
            method: method,
            baseURL: process.env.REACT_APP_BASE_API,
            url: uri,
            headers: this.generateHttpHeaders(options.headers),
            params: options.params,
            data: options.body,
        });
    }

    generateHttpHeaders(headerInfo) {
        const headers = {
            'Content-Type': 'application/json',
        };

        if (headerInfo) {
            for (const item of Object.keys(headerInfo)) {
                headers[item] = headerInfo[item];
            }
        }
        return headers;
    }

}

const HttpService = new _HttpService();

export default HttpService;