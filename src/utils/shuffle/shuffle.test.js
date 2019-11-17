import shuffle from './shuffle';

const mockMath = Object.create(global.Math);
mockMath.random = () => 0.5;
global.Math = mockMath;

describe('shuffle', () => {
  it('should return correct index', () => {
    const arr = ['a', 'b', 'c', 'd', 'e', 'f'];
    const expectation = ['a', 'f', 'b', 'e', 'c', 'd'];
    expect(shuffle(arr)).toEqual(expectation);
  });
});
