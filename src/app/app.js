import ping from './ping';

class App {
  static run() {
    console.info('***** Application started');
    const el = document.querySelector('#ping-response');

    document.querySelector('#btn-ping').addEventListener('click', () => {
      ping(el);
    });
  }
}

export default App;
