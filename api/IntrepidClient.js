const request = require('request');

class IntrepidClient {
    consttuctor(apiKey) {
        this.apiKey = apiKey;
    }

    _getHeaders() {
        return {
            'Authorization': `Bearer ${this.apiKey}`
        }
    }

    _getRequestUrl(command) {

    }

    action(command) {
        return new Promise((resolve, reject) => {
            request.post({
                uri: this._getRequestUrl(command),
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