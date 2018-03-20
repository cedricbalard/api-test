import * as joi from "joi";
import * as _ from "lodash";

/**
 * Module Schema to validate input schema
 */
export namespace Schema {

  // Schema joi definitions
  const SCHEMA_JOI = {
    load : {
      facebook : joi.object().keys({
        id      : joi.string().required().empty(),
        token   : joi.string().required().empty(),
        version : joi.string().optional().default("v2.12"),
        url     : joi.string().optional().default("https://graph.facebook.com")
      })
    },
    create : {
      facebook : joi.object().keys({
        message : joi.string().required().empty()
      }).required()
    }
  };

  /**
   * Check if object is conform
   * @param  data Input data to check
   * @param  name The schema name to check
   * @return      The object validated with default value
   */
  export function validate (data: object, name: string): object {
    // Check if has schema
    if (!_.has(SCHEMA_JOI, name)) {
      // Reject because schema was not found
      throw new Error("[ Schema.validate ] - Schema was not found for name " + name);
    }

    // Make joi validation
    const result = joi.validate(data, _.get(SCHEMA_JOI, name));

    // Check if joi validation failed
    if (_.isEmpty(result.error)) {
      // Success
      return result.value;
    }

    // Validation failed so Throw error
    throw new Error("[ Schema.validate ] - Error when validate schema : < " +
    name + " >, more details : " + result.error.toString());
  }
}
