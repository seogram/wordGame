import randomIndex from './randomIndex';

const mockMath = Object.create(global.Math);
mockMath.random = () => 0.5;
global.Math = mockMath;

describe('randomIndex', () => {
  it('should return correct index', () => {
    const arr = ['a', 'b', 'c', 'd', 'e', 'f'];
    expect(undefined).toEqual(undefined);
    expect(randomIndex(arr)).toEqual(3);
  });
});
