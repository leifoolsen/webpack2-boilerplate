import request from '../utils/request';

class App {
  //constructor() {
  //}
  run() {
    console.info('***** Application started');

    document.querySelector('#btn-ping').addEventListener('click', () => {

      const pingResponse = document.querySelector('#ping-response');

      request('/api/ping')
        .catch(err => pingResponse.innerText = err)
        .then(response => pingResponse.innerText = response);
    });

  }
}

export default App;
