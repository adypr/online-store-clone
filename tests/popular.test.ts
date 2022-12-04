import Popular from '../src/components/blocks/aside/Popular';

describe('Popular filter check by default', () => {
    const popular = new Popular();
    document.body.append(popular.renderPopular());

    it(`Popular should be unchecked`, () => {
        expect(popular.popular.checked).toBeFalsy();
    });
    it('All should be checked', () => {
        expect(popular.all.checked).toBeTruthy();
    });
});
