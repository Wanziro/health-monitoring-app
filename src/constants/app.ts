import {IAppConfig} from '../interfaces';

const APP_MODE = 'dev';
// const APP_MODE = 'production';
const CONFIG = {
  dev: {
    backendUrl: 'http://192.168.43.3:8080/api',
  },
  production: {
    backendUrl: 'https://health-monitoring-app.onrender.com/api',
  },
};

export const app: IAppConfig = {
  backendUrl: CONFIG[APP_MODE].backendUrl,
};
