import request from '../utils/request';
import joinUrl from '../utils/join-url';

const apiPath = joinUrl(process.env.PUBLIC_PATH, '/api/ping');

async function determineTime() {
  const moment = await import('moment');
  return moment().format('YYYY-MM-DD HH:mm:ss');
}

const ping = el => {
  request(apiPath)
    .then(response => {
      determineTime()
        .then(str => el.textContent = `${str}: ${JSON.stringify(response)}`);
    })
    .catch(err => el.textContent = err);
};

export default ping;
