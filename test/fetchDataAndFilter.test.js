import fetchDataAndFilter from '../utils/fetchDataAndFilter';

describe('fetchDataAndFilter', () => {
  it('should return an empty array if data is not an array', () => {
    expect(fetchDataAndFilter(null, 'keyword')).toEqual([]);
    expect(fetchDataAndFilter(undefined, 'keyword')).toEqual([]);
    expect(fetchDataAndFilter('string', 'keyword')).toEqual([]);
  });

  it('should return an empty array if keyword is empty', () => {
    const data = [{ title: 'JavaScript' }, { title: 'Python' }];
    expect(fetchDataAndFilter(data, '')).toEqual([]);
  });

  it('should handle empty data array', () => {
    expect(fetchDataAndFilter([], 'keyword')).toEqual([]);
  });

  it('should filter items by keyword (case-insensitive)', () => {
    const data = [
      { title: 'JavaScript Basics' },
      { title: 'python intro' },
      { title: 'Java advanced' },
      { title: 'Ruby on Rails' },
    ];
    const results = fetchDataAndFilter(data, 'java');
    expect(results).toEqual([
      { title: 'JavaScript Basics' },
      { title: 'Java advanced' },
    ]);
  });

  it('should ignore items without a valid title property', () => {
    const data = [
      { title: 'ReactJS' },
      {},
      { name: 'VueJS' },
      { title: 123 },
    ];
    const results = fetchDataAndFilter(data, 'react');
    expect(results).toEqual([{ title: 'ReactJS' }]);
  });

  it('should match partial strings', () => {
    const data = [
      { title: 'TypeScript' },
      { title: 'JavaScript' },
      { title: 'CoffeeScript' }
    ];
    const results = fetchDataAndFilter(data, 'script');
    expect(results).toEqual(data);
  });
});
