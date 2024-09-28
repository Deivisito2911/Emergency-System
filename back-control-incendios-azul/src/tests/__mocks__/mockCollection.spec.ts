const mockCollection = {
  doc: jest.fn().mockReturnThis(),
  where: jest.fn().mockReturnThis(),
  get: jest.fn().mockResolvedValue({
    exists: true,
    data: () => ({ message: 'Mock Data' }),
    docs: [{ id: '1', data: () => ({ status: 1 }) }],
  }),
  set: jest.fn().mockResolvedValue(undefined),
  delete: jest.fn().mockResolvedValue(undefined),
};

export default mockCollection;

describe('Mock Collection', () => {
  it('should have a dummy test', () => {
    expect(true).toBe(true);
  });
});
