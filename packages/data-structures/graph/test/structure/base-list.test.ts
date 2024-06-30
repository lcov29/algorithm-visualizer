import { BaseList } from '../../src/structure/base-list';
import { INode } from '../../src/structure/node-list';

describe('BaseList', () => {
  let baseList: BaseList<INode>;

  beforeEach(() => {
    jest.restoreAllMocks();
    baseList = new BaseList();
  });

  describe('constructor()', () => {
    it('initializes an empty list', () => {
      expect(baseList.list).toHaveLength(0);
    });
  });

  describe('list()', () => {
    beforeEach(() => {
      baseList.add({ label: 'foo' }).add({ label: 'bar' });
    });

    it('returns the current item list', () => {
      const list = baseList.list;
      expect(list).toHaveLength(2);
      expect(list[0].label).toBe('foo');
      expect(list[1].label).toBe('bar');
    });

    it('returns clones of the current items', () => {
      baseList.list[0].label = 'baz';
      expect(baseList.list[0].label).toBe('foo');
    });
  });

  describe('item()', () => {
    beforeEach(() => {
      baseList.add({ label: 'foo' });
    });

    it('returns null if the specified item is not included in the list', () => {
      expect(baseList.item(1)).toBeNull();
    });

    it('returns the specified item', () => {
      expect(baseList.item(0)?.id).toBe(0);
    });

    it('returns a clone of the specified item', () => {
      baseList.item(0)!.label = 'bar';
      expect(baseList.item(0)?.label).toBe('foo');
    });
  });

  describe('add()', () => {
    it('adds the specified item', () => {
      baseList.add({ label: 'foo' });
      expect(baseList.list).toHaveLength(1);
      expect(baseList.list[0].label).toBe('foo');
    });

    it('adds the specified items with incremented internal index as ID', () => {
      baseList.add({ label: 'foo' }).add({ label: 'bar' });
      expect(baseList.list).toHaveLength(2);
      expect(baseList.list[0].id).toBe(0);
      expect(baseList.list[0].label).toBe('foo');
      expect(baseList.list[1].id).toBe(1);
      expect(baseList.list[1].label).toBe('bar');
    });
  });

  describe('replace()', () => {
    beforeEach(() => {
      baseList.add({ label: 'foo' }).add({ label: 'bar' });
    });

    it('replaces the specified item', () => {
      const newNode = { id: 0, label: 'newNode' };
      baseList.replace(newNode);
      expect(baseList.item(0)).toEqual(newNode);
    });

    it('does nothing if the specified item is not included in the list', () => {
      const newNode = { id: 5, label: 'newNode' };
      baseList.replace(newNode);
      expect(baseList.list).toHaveLength(2);
      expect(baseList.list.map(node => node.label)).not.toContain('newNode');
    });
  });

  describe('delete()', () => {
    beforeEach(() => {
      baseList.add({ label: 'foo' }).add({ label: 'bar' });
    });

    it('deletes the specified item', () => {
      baseList.delete(1);
      expect(baseList.list).toHaveLength(1);
      expect(baseList.list[0].label).toBe('foo');
      expect(baseList.list[1]).toBeUndefined();
    });

    it('deletes nothing if the specified item is not included in the list', () => {
      baseList.delete(-1);
      expect(baseList.list).toHaveLength(2);
    });
  });

  it('is iterable in for-of-loop', () => {
    baseList.add({ label: 'foo' }).add({ label: 'bar' }).add({ label: 'baz' });

    const list = [];
    for (const item of baseList) {
      list.push(item);
    }
    expect(list).toHaveLength(3);
    expect(list.map(node => node?.label)).toEqual(['foo', 'bar', 'baz']);
  });
});
