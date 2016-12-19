import moment from 'moment';
//const moment = require('moment');
import request from '../utils/request';

const ping = el => {
  request('/api/ping')
    .catch(err => err)
    .then(response => el.textContent = `${moment().format('YYYY-MM-DD HH:mm:ss')}: ${response}`);
};

export default ping;
