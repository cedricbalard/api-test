import * as _ from "lodash";
import * as winston from "winston";
import Facebook from "./providers/facebook";
import { Schema } from "./schema/schema";

/**
 * Class to handle SocialNetworks subscription
 *
 * @param configs configs of providers
 */
export default class SocialNetworks {

  private configs: object[];
  private providers: object[];
  private logger = winston;

  /**
   * Constructor that check configs of providers
   *
   * @param configs configs of providers
   */
  constructor (configs: object[]) {
    // Initialize arrays
    this.providers = [];

    // Try to load all configs
    _.each(configs, (c: object) => {
      try {
        // Validate Schema and Reassign object with default value of validation
        c.config = Schema.validate(c.config, "load." + c.name);

        // Will contains provider
        let provider = undefined;

        // Check name to get provider
        if (c.name === "facebook") {
          // Create provider
          provider = new Facebook(c.config, this.logger);
        }

        // Add provider
        this.providers.push({
          name   : c.name,
          module : provider
        });
      } catch (error) {
        // Throw error
        throw new Error ("[ SocialNetworks.constructor ] - error when load module < " + c.name +
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
  public async create (providerName: string, data: object): object {
    try {
      // Try to retrieve provider
      const provider = _.find(this.providers, {
        name : providerName
      });

      // Check if provider is found and enabled
      if (_.isUndefined(provider)) {
        // Not found so break control flow
        throw new Error ("provider not found for name : " + providerName);
      }

      // Validate schema
      data = Schema.validate(data, "create." + providerName);

      // Create post and return his result
      return await provider.module.create(data);
    } catch (error) {
      // Throw error
      throw new Error ("[ SocialNetworks.create ] - error : " + error);
    }
  }
}
