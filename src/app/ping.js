import config from '../config/config';
import request from '../utils/request';
import joinUrl from '../utils/join-url';

const pingPath = joinUrl(config.apiPath, '/ping');

async function determineTime() {
  const moment = await import('moment');
  return moment().format('YYYY-MM-DD HH:mm:ss');
}

const ping = el => {
  request(pingPath)
    .then(response => {
      determineTime()
        .then(str => el.textContent = `${str}: ${JSON.stringify(response)}`);
    })
    .catch(err => el.textContent = err);
};

export default ping;
