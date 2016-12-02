import request from '../utils/request';

const ping = el => {
  request('/api/ping')
    .catch(err => el.innerText = err)
    .then(response => el.innerText = response);
};

export default ping;
