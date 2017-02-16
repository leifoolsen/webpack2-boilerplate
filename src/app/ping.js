import moment from 'moment';
import request from '../utils/request';
//import logger from '../utils/logger';

const ping = el => {
  request('/api/ping')
    .then(response => el.textContent = `${moment().format('YYYY-MM-DD HH:mm:ss')}: ${JSON.stringify(response)}`)
    .catch(err => el.textContent = err);
};

export default ping;
