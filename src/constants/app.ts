import {IAppConfig} from '../interfaces';

// const APP_MODE = 'dev';
const APP_MODE = 'production';
const CONFIG = {
  dev: {
    backendUrl: 'http://192.168.43.3:8080/api',
    imageUrl: 'http://192.168.43.3/RN/medequip/uploads/',
    imageUploadUrl: 'http://192.168.43.3/RN/medequip/upload.php',

    // backendUrl: 'http://172.31.34.64:8080/api',
    // imageUrl: 'http://172.31.34.64/RN/medequip/uploads/',
    // imageUploadUrl: 'http://172.31.34.64/RN/medequip/upload.php',
  },
  production: {
    backendUrl: 'https://health-monitoring-app.onrender.com/api',
    imageUrl: 'https://lawyersofhope.org.rw/assets/images/controller/uploads/',
    imageUploadUrl:
      'https://lawyersofhope.org.rw/assets/images/controller/upload.php',
  },
};

export const app: IAppConfig = {
  backendUrl: CONFIG[APP_MODE].backendUrl,
  imageUrl: CONFIG[APP_MODE].imageUrl,
  imageUploadUrl: CONFIG[APP_MODE].imageUploadUrl,
};
