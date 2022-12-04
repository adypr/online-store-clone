import sort from '../src/components/layout/main/sort';

describe('Sort function', () => {
    const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    const expectedNameAz = [5, 9, 8, 7, 2, 10, 1, 4, 6, 3];
    const expectedNameZa = [3, 6, 4, 1, 10, 2, 7, 8, 9, 5];

    it('shouild sort by name up', () => {
        expect(sort(arr, 'name')).toStrictEqual(expectedNameAz);
    });
    it('shouild sort by name down', () => {
        expect(sort(arr, 'name', 'down')).toEqual(expectedNameZa);
    });
});
