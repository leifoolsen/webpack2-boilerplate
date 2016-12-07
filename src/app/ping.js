import moment from 'moment';
import request from '../utils/request';

const ping = el => {
  request('/api/ping/fu')
    .catch(err => err)
    .then(response => el.textContent = `${moment().format('YYYY-MM-DD HH:mm:ss')}: ${response}`);
};

export default ping;
