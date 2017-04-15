import moment from 'moment';
import request from '../utils/request';
import joinUrl from '../utils/join-url';

const apiPath = joinUrl(process.env.PUBLIC_PATH, '/api/ping');

const ping = el => {
  request(apiPath)
    .then(response => el.textContent =
      `${moment().format('YYYY-MM-DD HH:mm:ss')}: ${JSON.stringify(response)}`)
    .catch(err => el.textContent = err);
};

export default ping;
