'use strict';

/**
 * resgister service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::resgister.resgister');
