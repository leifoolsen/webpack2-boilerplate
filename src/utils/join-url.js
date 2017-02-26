/**
 * Join URL parts
 * @param {...String} parts
 * @return the joined URL
 */
const joinUrl = (...parts) =>
  parts.map( part => part.replace(/\/$/, ''))
    .join('/')
    .replace(/\/\//g, '/');

export default joinUrl;
