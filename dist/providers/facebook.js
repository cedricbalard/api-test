"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const request = require("request");
const _ = require("lodash");
/**
 * Class to call FB Api
 * @param config config of provider
 * @param logger logger instance
 */
class Facebook {
    /**
     * Constructor of Facebook Class
     *
     * @param config config of provider
     * @param logger logger instance
     */
    constructor(config, logger) {
        this.logger = logger;
        this.config = config;
    }
    /**
     * Create the post into Facebook
     *
     * @param  data Object to create post into feed
     * @return      Return the response of provider
     */
    create(data) {
        // Create FB uri
        const uri = this.config.url + "/" + this.config.version + "/" + this.config.id + "/feed";
        this.logger.info("[ Facebook.create ] - Send new request to create post to uri : " + uri +
            " with data : " + JSON.stringify(data));
        // Return new promise of HTTP call
        return new Promise((resolve, reject) => {
            // Send HTTP Request
            request.post({
                uri: uri,
                qs: _.merge({
                    access_token: this.config.token
                }, data)
            }, (error, response, body) => {
                // Check if has error
                if (error || response.statusCode !== 200) {
                    // Reject promise because error
                    return reject(new Error("[ Facebook.create ] - error when creating post, details : " +
                        (error || body)));
                }
                // Success so resolve response
                resolve(body);
            });
        });
    }
}
exports.default = Facebook;
//# sourceMappingURL=facebook.js.map