import request from '../../utils/request';

async function determineTime() {
  const moment = await import('moment');
  return moment().format('YYYY-MM-DD HH:mm:ss');
}

const pingServer = (url) => {
  return request(url)
    .then((response) => {
      return determineTime()
        .then((time) => {
          return `${time}: ${JSON.stringify(response)}`;
        });
    })
    .catch((err) => err);
};

export default pingServer;
