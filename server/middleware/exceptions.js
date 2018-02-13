// 404
const NotFoundException = (msg = '') => {
  const err = new Error(`404 - Not found${msg ? ': ' + msg  : ''}`); // eslint-disable-line prefer-template
  err.status = 404;
  return err;
};

export { NotFoundException };
