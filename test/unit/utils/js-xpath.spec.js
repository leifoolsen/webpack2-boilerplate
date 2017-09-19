import { describe, it } from 'mocha';
import { expect } from 'chai';
import JsXPath from '../../../src/utils/js-xpath';

describe('js-xpath', () => {

  describe('#objectToXPath', () => {

    it('should transform a flat object to XPath expression', () => {
      const objectToTransform = {
        a: 1,
        b: 'b',
      };
      const expectedXPaths = {
        '/a': 1,
        '/b': 'b',
      };

      const result = JsXPath.objectToXPath(objectToTransform);
      expect(result).to.have.all.keys(Object.keys(expectedXPaths));
      expect(result).to.deep.equal(expectedXPaths);
    });

    it('should include object root in XPath expression', () => {
      const objectToTransform = {
        a: 1,
        b: 'b',
      };
      const expectedXPaths = {
        '/objectToTransform/a': 1,
        '/objectToTransform/b': 'b',
      };

      const result = JsXPath.objectToXPath({ objectToTransform });
      expect(result).to.have.all.keys(Object.keys(expectedXPaths));
      expect(result).to.deep.equal(expectedXPaths);
    });

    it('should transform many objects into an array of XPath expressions', () => {
      const foo = {
        a: 1,
        b: 'b',
      };
      const bar = {
        y: 25,
        z: 'z'
      };
      const expectedXPaths = [
        {
          '/a': 1,
          '/b': 'b',
        }, {
          '/y': 25,
          '/z': 'z'
        }
      ];

      const result = JsXPath.objectToXPath(foo, bar);
      expect(result).to.have.all.keys(Object.keys(expectedXPaths));
      expect(result).to.deep.equal(expectedXPaths);
    });

    it('should include object root when transform many objects into an array of XPath expressions', () => {
      const foo = {
        a: 1,
        b: 'b',
      };
      const bar = {
        y: 25,
        z: 'z'
      };
      const expectedXPaths = [
        {
          '/foo/a': 1,
          '/foo/b': 'b',
        }, {
          '/bar/y': 25,
          '/bar/z': 'z'
        }
      ];

      const result = JsXPath.objectToXPath({ foo }, { bar });
      expect(result).to.have.all.keys(Object.keys(expectedXPaths));
      expect(result).to.deep.equal(expectedXPaths);
    });

    it('should merge many objects into an array of XPath expressions', () => {
      const foo = {
        a: 1,
        b: 'b',
      };
      const bar = {
        y: 25,
        z: 'z'
      };
      const expectedXPaths = {
        '/a': 1,
        '/b': 'b',
        '/y': 25,
        '/z': 'z'
      };

      const result = JsXPath.objectToXPath({ ...foo, ...bar });
      expect(result).to.have.all.keys(Object.keys(expectedXPaths));
      expect(result).to.deep.equal(expectedXPaths);
    });

    it('should merge many objects, including object root, into an array of XPath expressions', () => {
      const foo = {
        a: 1,
        b: 'b',
      };
      const bar = {
        y: 25,
        z: 'z'
      };
      const expectedXPaths = {
        '/foo/a': 1,
        '/foo/b': 'b',
        '/bar/y': 25,
        '/bar/z': 'z'
      };

      const result = JsXPath.objectToXPath({ foo, bar });
      expect(result).to.have.all.keys(Object.keys(expectedXPaths));
      expect(result).to.deep.equal(expectedXPaths);
    });

    it('should transform a nested object to an XPath expression, I', () => {
      const objectToTransform = {
        a: 1,
        b: 'b',
        bars: [
          {
            bar: {
              c: 3,
              d: 'd'
            },
          },
          {
            bar: {
              c: 5,
              d: 'f',
              baz: {
                x: 24
              }
            }
          }
        ],
        buz: {
          y: 25,
          z: 'z'
        }
      };
      const expectedXPaths = {
        '/a': 1,
        '/b': 'b',
        '/bars[1]/bar/c': 3,
        '/bars[1]/bar/d': 'd',
        '/bars[2]/bar/c': 5,
        '/bars[2]/bar/d': 'f',
        '/bars[2]/bar/baz/x': 24,
        '/buz/y': 25,
        '/buz/z': 'z'
      };

      const result = JsXPath.objectToXPath(objectToTransform);
      expect(result).to.have.all.keys(Object.keys(expectedXPaths));
      expect(result).to.deep.equal(expectedXPaths);
    });

    it('should transform a nested object to an XPath expression, II', () => {
      const objectToTransform = {
        a: 1,
        b: 'b',
        bar: [
          {
            c: 3,
            d: 'd'
          },
          {
            c: 5,
            d: 'f',
            baz: {
              x: 24
            }
          }
        ],
        buz: {
          y: 25,
          z: 'z'
        }
      };
      const expectedXPaths = {
        '/a': 1,
        '/b': 'b',
        '/bar[1]/c': 3,
        '/bar[1]/d': 'd',
        '/bar[2]/c': 5,
        '/bar[2]/d': 'f',
        '/bar[2]/baz/x': 24,
        '/buz/y': 25,
        '/buz/z': 'z'
      };

      const result = JsXPath.objectToXPath(objectToTransform);
      expect(result).to.have.all.keys(Object.keys(expectedXPaths));
      expect(result).to.deep.equal(expectedXPaths);
    });

  });

  describe('#getValue', () => {

    it('should get value using XPath expression', () => {
      const obj = {
        a: 1,
        b: 'b',
        bars: [
          {
            bar: {
              c: 3,
              d: 'd'
            },
          },
          {
            bar: {
              c: 5,
              d: 'f',
              baz: {
                x: 24
              }
            }
          }
        ],
        buz: {
          y: 25,
          z: 'z'
        }
      };
      const xPaths = {
        '/a': 1,
        '/b': 'b',
        '/bars[1]/bar/c': 3,
        '/bars[1]/bar/d': 'd',
        '/bars[2]/bar/c': 5,
        '/bars[2]/bar/d': 'f',
        '/bars[2]/bar/baz/x': 24,
        '/buz/y': 25,
        '/buz/z': 'z'
      };
      Object.keys(xPaths).forEach(key => {
        expect(JsXPath.getValue(obj, key)).to.deep.equal(xPaths[key]);
      });
    });


    it('should return a nested object, I', () => {
      const obj = {
        a: 1,
        b: 'b',
        bars: [
          {
            c: 3,
            d: 'd'
          },
        ],
      };
      const expected = {
        c: 3,
        d: 'd'
      };

      const result = JsXPath.getValue(obj, '/bars[1]');
      expect(result).to.be.an('object');
      expect(result).to.deep.equal(expected);
    });

    it('should return a nested object, II', () => {
      const obj = {
        a: 1,
        b: 'b',
        bars: [
          {
            bar: {
              c: 3,
              d: 'd'
            }
          },
        ],
      };
      const expected = {
        bar: {
          c: 3,
          d: 'd'
        }
      };

      const result = JsXPath.getValue(obj, '/bars[1]');
      expect(result).to.be.an('object');
      expect(result).to.deep.equal(expected);
    });

    it('should return an array', () => {
      const obj = {
        a: [1, 2, 3, 4, 5, 6]
      };
      const expected = [1, 2, 3, 4, 5, 6];
      expect(JsXPath.getValue(obj, '/a')).to.deep.equal(expected);
    });

    it('should return an array element', () => {
      const obj = {
        a: [1, 2, 3, 4, 5, 6]
      };
      const expected = [1, 2, 3, 4, 5, 6];
      expect(JsXPath.getValue(obj, '/a[1]')).to.equal(expected[0]);
      expect(JsXPath.getValue(obj, '/a[4]')).to.equal(expected[3]);
    });

    it('should return undefined', () => {
      const obj = {
        a: 1,
        b: 'b',
      };
      expect(JsXPath.getValue(obj, '/c')).to.be.an('undefined');
    });

    it('should throw TypeError', () => {
      const obj = {
        a: 1,
        b: 'b',
      };
      expect(() => {
        JsXPath.getValue(obj, '/a/x[1]');
      }).to.throw(TypeError);
    });
  });

  describe('#setValue', () => {

    it('should change an existing value', () => {
      const obj = {
        a: 1,
        b: 'b',
        bars: [
          {
            bar: {
              c: 3,
              d: 'd'
            }
          },
        ],
      };

      expect(JsXPath.getValue(obj, '/b')).to.equal('b', 'Expected "/" value to be "b" before changing it');
      JsXPath.setValue(obj, '/b', 'bbbb');
      expect(JsXPath.getValue(obj, '/b')).to.equal('bbbb', 'Expected "/a" value to be "10" after changing it');

      expect(JsXPath.getValue(obj, '/bars[1]/bar/c')).to.equal(3, 'Expected "bars[1]/bar/c" value to be "3" before changing it');
      JsXPath.setValue(obj, '/bars[1]/bar/c', 10);
      expect(JsXPath.getValue(obj, '/bars[1]/bar/c')).to.equal(10, 'Expected "bars[1]/bar/c" value to be "10" after changing it');
    });

    it('should throw TypeError if path is not valid', () => {
      const obj = {
        a: 1,
        b: 'b',
      };

      expect(() => {
        JsXPath.setValue(obj, '/bars[1]/bar/c', 10);
      }).to.throw(TypeError);

    });

  });

  describe('#pathExists', () => {

    it('should return false if path does not exist', () => {
      const obj = {
        a: 1,
        b: 'b',
        bars: [
          {
            bar: {
              c: 3,
            }
          }
        ]
      };

      expect(JsXPath.pathExists(obj, '/a/b')).to.equal(false);
      expect(JsXPath.pathExists(obj, '/bars[2]')).to.equal(false);
      expect(JsXPath.pathExists(obj, '/c')).to.equal(false);
      expect(JsXPath.pathExists(obj, '/c/d')).to.equal(false);
      expect(JsXPath.pathExists(obj, '/c/x[1]')).to.equal(false);
    });

    it('should return true if path exists', () => {
      const obj = {
        a: 1,
        b: 'b',
        c: {
          d: undefined,
          e: {
            f: undefined
          }
        },
        bars: [
          {
            bar: {
              c: 3,
              d: 'd',
              f: undefined
            }
          },
          {
            x: 10
          }
        ],
      };
      expect(JsXPath.pathExists(obj, '/c/d')).to.equal(true);
      expect(JsXPath.pathExists(obj, '/c/e/f')).to.equal(true);
      expect(JsXPath.pathExists(obj, '/bars')).to.equal(true);
      expect(JsXPath.pathExists(obj, '/bars[1]')).to.equal(true);
      expect(JsXPath.pathExists(obj, '/bars[1]/bar')).to.equal(true);
      expect(JsXPath.pathExists(obj, '/bars[1]/bar/c')).to.equal(true);
      expect(JsXPath.pathExists(obj, '/bars[1]/bar/f')).to.equal(true);
      expect(JsXPath.pathExists(obj, '/bars[2]/x')).to.equal(true);
    });

  });
});
