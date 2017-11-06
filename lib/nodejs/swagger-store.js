'use strict';

const {Swagger, decorators } = require('./swagger');
const crypto = require('crypto');
const path = require('path');
const store = Object.create(null);
const digestStore = Object.create(null);
const routeMap = Object.create(null);
const validUrl = require('valid-url');


module.exports = ({hexo}) => {

  const getDigest = (swaggerPath) => {
    // Check filepath or http path
    if (digestStore[swaggerPath]){
      return digestStore[swaggerPath];
    }
    const digest = crypto.createHash('md5').update(swaggerPath).digest('hex');
    digestStore[swaggerPath] = digest;
    return digest;
  };


  const prepareRoute = function (specPath){
    const digest = getDigest(specPath);
    const basename = path.basename(specPath);
    const downloadRoute = digest + '/' + basename;
    return downloadRoute;
  };


  const handleRoute = (swagger, swaggerPath) => {
    const jsonSchema = swagger.swaggerJson;
    const yamlSchema = swagger.swaggerYaml;
    const extname = path.extname(swaggerPath);
    const downloadRoute = prepareRoute(swaggerPath);

    if (extname === '.json'){
      setRoute(downloadRoute, jsonSchema);
      setRoute(downloadRoute.replace(/\.json$/, '.yaml'), yamlSchema);
    } else {
      setRoute(downloadRoute, yamlSchema);
      setRoute(downloadRoute.replace(/\.yaml$/, '.json'), jsonSchema);
    }

    /**
     * Hexo converts all the yaml file to json file.
     * removeLocalYamlRoute updates routeMap to remove that route.
     */
    if (!validUrl.isUri(swaggerPath)){
      removeLocalYamlRoute(swaggerPath);
    }
    return Promise.resolve(downloadRoute);
  };


  const removeLocalYamlRoute = (swaggerPath) => {
    const sourceDir = hexo.source_dir;
    const relativePath = swaggerPath
      .replace(sourceDir, '')
      .replace(/\.yaml$/, '.json')
      .replace(/\.yml$/, '.json');
    setRoute(relativePath, null);
  };


  const getSwagger = function (swaggerPath){
    const digest = getDigest(swaggerPath);

    if (store[digest]){
      return Promise.resolve(store[digest]);
    }

    const swagger = new Swagger(swaggerPath);

    return swagger
      .validate()
      .then(swagger =>  swagger.decorate(decorators.docExclude))
      .then(swagger =>  swagger.decorate(decorators.host))
      .then(swagger => {
        return handleRoute(swagger, swaggerPath);
      })
      .then(downloadRoute => {
        const result = {
          swagger,
          downloadRoute
        };
        store[digest] = result;
        return result;
      });
  };


  const setRoute = function (route, data){
    if (!route){
      return false;
    }
    routeMap[route] = data;
    return true;
  };


  const getRoutes = function (route){
    let routes = null;

    if (route){
      routes = routeMap[route];
    } else {
      routes = routeMap;
    }
    return routes;
  };


  return {
    getSwagger,
    getRoutes,
    setRoute,
    getDigest,
    prepareRoute
  };

};
