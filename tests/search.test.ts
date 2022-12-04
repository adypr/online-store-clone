import { search } from '../src/components/layout/header/Search';

describe('Search reset', () => {
    document.body.append(search.renderSearch());

    it('should by empty', () => {
        search.field.value = 'Some text';
        search.close.click();
        expect(search.field.value).toBe('');
    });
});
