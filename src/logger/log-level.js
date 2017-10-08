const LOG_LEVEL = {
  // RFC5424 syslog levels
  // https://tools.ietf.org/html/rfc5424
  silent:   -1, // no logging
  emergency: 0, // system is unusable
  alert:     1, // action must be taken immediately
  critical:  2, // action must be taken immediately
  error:     3, // error conditions
  warn:      4, // warning conditions
  notice:    5, // normal but significant condition
  info:      6, // informational condition
  debug:     7, // debug condition
  log:       7, // debug condition
};

export default LOG_LEVEL;
