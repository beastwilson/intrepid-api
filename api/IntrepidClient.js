const request = require('request');

const config = require('../config');

class IntrepidClient {
    consttuctor(apiKey) {
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

    action(command) {
        return new Promise((resolve, reject) => {
            request.post({
                uri: IntrepidClient._getRequestUrl(),
                json: true,
                headers: this._getHeaders(),
                form: { command }
            }, (err, res, body) => {
                if (err != null) {
                    reject((typeof err !== 'object') ? new Error(err) : err);
                    return;
                }

                // if the request was not a success for some reason
                if (res.statusCode.toString()[0] !== '2') {
                    reject(new Error('Status Code ' + res.statusCode));
                    return;
                }

                resolve();
            });
        });
    }
}

module.exports = IntrepidClient;