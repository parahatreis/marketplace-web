// convert buffer to image
function apiPath() {
   const { REACT_APP_DEV_URL, REACT_APP_PRO_URL, NODE_ENV } = process.env;
   const app_url = NODE_ENV === "development" ? REACT_APP_DEV_URL : REACT_APP_PRO_URL; 
   return app_url;
}

export default apiPath;