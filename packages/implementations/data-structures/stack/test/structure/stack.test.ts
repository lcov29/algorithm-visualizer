import { StackError } from '@algorithm-visualizer/stack-contract';

import { Stack } from '../../src';

describe('Stack', () => {
  let stack: Stack<string>;

  beforeEach(() => {
    jest.resetAllMocks();
    stack = new Stack();
  });

  describe('push()', () => {
    it('adds the specified element to the top of the stack when the stack has not reached its limit', () => {
      stack.push('foo');
      // @ts-expect-error access private property
      expect(stack._elements).toEqual(['foo']);
    });

    it('throws a stack error when the stack has reached its limit', () => {
      stack = new Stack({ limit: 2 });
      stack.push('foo');
      stack.push('bar');
      expect(() => stack.push('baz')).toThrow(
        new StackError({
          message:
            'Failed to push element to stack: Stack count would exceed the limit (2)',
        }),
      );
    });
  });

  describe('pop()', () => {
    it('returns null when the stack is empty', () => {
      expect(stack.pop()).toBeNull();
    });

    describe('when the stack is not empty', () => {
      beforeEach(() => {
        stack.push('foo');
        stack.push('bar');
      });

      it('returns the topmost element on the stack', () => {
        expect(stack.pop()).toBe('bar');
      });

      it('removes the topmost element from the stack', () => {
        stack.pop();
        // @ts-expect-error access private property
        expect(stack._elements).toEqual(['foo']);
      });
    });
  });

  describe('top()', () => {
    it('returns null when the stack is empty', () => {
      expect(stack.top()).toBeNull();
    });

    describe('when the stack is not empty', () => {
      beforeEach(() => {
        stack.push('foo');
        stack.push('bar');
      });

      it('returns the topmost element on the stack', () => {
        expect(stack.top()).toBe('bar');
      });

      it('does not modify the stack', () => {
        stack.top();
        // @ts-expect-error access private property
        expect(stack._elements).toEqual(['foo', 'bar']);
      });
    });
  });

  describe('clear()', () => {
    it('deletes all elements from the stack', () => {
      stack.push('foo');
      stack.push('bar');
      // @ts-expect-error access private property
      expect(stack._elements).toEqual(['foo', 'bar']);
      stack.clear();
      // @ts-expect-error access private property
      expect(stack._elements).toEqual([]);
    });
  });

  describe('flush()', () => {
    beforeEach(() => {
      stack.push('foo');
      stack.push('bar');
    });

    it('returns all elements from the stack', () => {
      expect(stack.flush()).toEqual(['foo', 'bar']);
    });

    it('deletes all elements from the stack', () => {
      // @ts-expect-error access private property
      expect(stack._elements).toEqual(['foo', 'bar']);
      stack.clear();
      // @ts-expect-error access private property
      expect(stack._elements).toEqual([]);
    });
  });

  describe('isEmpty()', () => {
    it('returns true when the stack has no elements', () => {
      expect(stack.isEmpty()).toBe(true);
    });

    it('returns false when the stack has elements', () => {
      stack.push('foo');
      expect(stack.isEmpty()).toBe(false);
    });
  });

  describe('isFull()', () => {
    beforeEach(() => {
      stack = new Stack({ limit: 2 });
      stack.push('foo');
    });

    it('returns true when the stack has reached its limit', () => {
      stack.push('bar');
      expect(stack.isFull()).toBe(true);
    });

    it('returns false when the stack has not reached its limit', () => {
      expect(stack.isFull()).toBe(false);
    });

    it('returns false is no limit is set', () => {
      stack = new Stack();
      stack.push('foo');
      stack.push('bar');
      stack.push('baz');
      expect(stack.isFull()).toBe(false);
    });
  });

  describe('getLength()', () => {
    it('returns the current length of the stack', () => {
      stack.push('foo');
      stack.push('bar');
      expect(stack.getLength()).toBe(2);
    });
  });

  describe('getLimit()', () => {
    it('returns Infinity when the stack has no specified limit', () => {
      expect(stack.getLimit()).toBe(Infinity);
    });

    it('returns the limit of the stack when it is specified', () => {
      stack = new Stack({ limit: 14 });
      expect(stack.getLimit()).toBe(14);
    });
  });
});
