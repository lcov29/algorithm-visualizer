import { BaseList } from '../../src/structure/base-list';
import { NodeList } from '../../src/structure/node-list';

describe('NodeList', () => {
  let nodeList: NodeList;

  beforeEach(() => {
    jest.resetAllMocks();
    nodeList = new NodeList();
    nodeList.addNode({ label: 'foo' }).addNode({ label: 'bar' });
  });

  describe('node()', () => {
    it('calls BaseList.item()', () => {
      const mockItem = jest.fn();
      jest.spyOn(BaseList.prototype, 'item').mockImplementationOnce(mockItem);
      nodeList.node(0);
      expect(mockItem).toHaveBeenLastCalledWith(0);
    });
  });

  describe('addNode()', () => {
    it('calls BaseList.add()', () => {
      const mockAdd = jest.fn();
      jest.spyOn(BaseList.prototype, 'add').mockImplementationOnce(mockAdd);

      const node = { id: 3, label: 'baz' };
      nodeList.addNode(node);
      expect(mockAdd).toHaveBeenLastCalledWith(node);
    });
  });

  describe('deleteNode()', () => {
    it('calls BaseList.delete()', () => {
      const mockDelete = jest.fn();
      jest
        .spyOn(BaseList.prototype, 'delete')
        .mockImplementationOnce(mockDelete);

      nodeList.deleteNode(1);
      expect(mockDelete).toHaveBeenLastCalledWith(1);
    });
  });

  describe('changeLabel()', () => {
    it('calls BaseList.replace()', () => {
      const mockReplace = jest.fn();
      jest
        .spyOn(BaseList.prototype, 'replace')
        .mockImplementationOnce(mockReplace);
      const newLabelNode = { id: 0, label: 'newLabel' };
      nodeList.changeLabel(newLabelNode);
      expect(mockReplace).toHaveBeenCalledWith(newLabelNode);
    });
  });
});
