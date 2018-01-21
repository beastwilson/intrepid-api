const request = require('request');

const config = require('../config');

class IntrepidClient {
    constructor(apiKey) {
        this.apiKey = apiKey;
    }

    _getHeaders() {
        return {
            'Authorization': `Bearer ${this.apiKey}`
        }
    }

    static _getRequestUrl() {
        return config.BASE_URL + config.DATA_URL;
    }

    static _getError(err, res, body) {
        if (body.error && typeof body.error !== 'object') {
            return new Error(body.error);
        }

        if (res.statusCode.toString()[0] !== '2') {
            return new Error(`Status Code ${res.statusCode}`);
        }

        if (typeof err === 'object') {
            return err;
        }

        return new Error(err.toString());
    }

    action(command) {
        return new Promise((resolve, reject) => {
            request.post({
                uri: IntrepidClient._getRequestUrl(),
                json: true,
                headers: this._getHeaders(),
                form: { command }
            }, (err, res, body) => {
                if (err != null) {
                    reject(IntrepidClient._getError(err, res, body));
                    return;
                }

                // if the request was not a success for some reason
                if (res.statusCode.toString()[0] !== '2') {
                    reject(IntrepidClient._getError(err, res, body));
                    return;
                }

                resolve();
            });
        });
    }
}

module.exports = IntrepidClient;