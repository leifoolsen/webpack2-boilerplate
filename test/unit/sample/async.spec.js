import { describe, it } from 'mocha';
import { expect, should } from 'chai';
should();

describe('Async', () => {

  const resolvingPromise = new Promise( (resolve) => {
    resolve('promise resolved');
  });

  const rejectingPromise = new Promise((resolve, reject) =>
    reject(new Error('promise rejected'))
  );

  describe('promise', () => {

    it('assertion success', (done) => {
      resolvingPromise.then( (result) => {
        expect(result).to.equal('promise resolved');
      }).then(done,done);
    });

  });

  describe('async-await', () => {

    // See: https://stackoverflow.com/questions/40920179/should-i-refrain-from-handling-promise-rejection-asynchronously/40921505
    // See: https://github.com/rsp/node-caught
    process.on('unhandledRejection', () => {});
    process.on('rejectionHandled', () => {});

    it('promise resolves', async() => {
      const result = await resolvingPromise.catch( err => err.message );
      expect(result).to.equal('promise resolved');
    });

    it('promise rejects', async() => {
      const result = await rejectingPromise.catch( err => err.message );
      expect(result).to.equal('promise rejected');
    });

  });

});
