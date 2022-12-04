import Sizes from '../src/components/blocks/aside/Sizes';

describe('Sizes filter: move up', () => {
    const sizes = new Sizes();
    document.body.append(sizes.renderSizes());
    const expectedwidth = sizes.width.step;
    const expectedHeight = sizes.height.step;

    sizes.width.stepUp();
    sizes.height.stepUp();

    it(`Width should increase by ${expectedwidth}`, () => {
        expect(sizes.width.value).toEqual(expectedwidth);
    });
    it(`Height should increase by ${expectedHeight}`, () => {
        expect(sizes.height.value).toEqual(expectedHeight);
    });
});
