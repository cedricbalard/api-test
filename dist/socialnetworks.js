"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const _ = require("lodash");
const winston = require("winston");
const facebook_1 = require("./providers/facebook");
const schema_1 = require("./schema/schema");
/**
 * Class to handle SocialNetworks subscription
 *
 * @param configs configs of providers
 */
class SocialNetworks {
    /**
     * Constructor that check configs of providers
     *
     * @param configs configs of providers
     */
    constructor(configs) {
        this.logger = winston;
        // Initialize arrays
        this.providers = [];
        // Try to load all configs
        _.each(configs, (c) => {
            try {
                // Validate Schema and Reassign object with default value of validation
                c.config = schema_1.Schema.validate(c.config, "load." + c.name);
                // Will contains provider
                let provider = undefined;
                // Check name to get provider
                if (c.name === "facebook") {
                    // Create provider
                    provider = new facebook_1.default(c.config, this.logger);
                }
                // Add provider
                this.providers.push({
                    name: c.name,
                    module: provider
                });
            }
            catch (error) {
                // Throw error
                throw new Error("[ SocialNetworks.constructor ] - error when load module < " + c.name +
                    " > with error : " + error.toString());
            }
        });
    }
    /**
     * Create Async post method to provider
     *
     * @param  providerName Name of provider
     * @param  data         Object for the post
     * @return              Response of provider
     */
    create(providerName, data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Try to retrieve provider
                const provider = _.find(this.providers, {
                    name: providerName
                });
                // Check if provider is found and enabled
                if (_.isUndefined(provider)) {
                    // Not found so break control flow
                    throw new Error("provider not found for name : " + providerName);
                }
                // Validate schema
                data = schema_1.Schema.validate(data, "create." + providerName);
                // Create post and return his result
                return yield provider.module.create(data);
            }
            catch (error) {
                // Throw error
                throw new Error("[ SocialNetworks.create ] - error : " + error);
            }
        });
    }
}
exports.default = SocialNetworks;
//# sourceMappingURL=socialnetworks.js.map