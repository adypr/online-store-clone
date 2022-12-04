import Slider from '../src/components/blocks/slider/Slider';
describe('Slider inputs', () => {
    const slider = new Slider('price', 1, 25);
    document.body.append(slider.renderSlider());
    it('should the same fields From after rendering', () => {
        expect(slider.inputFrom.value).toMatch(slider.numFrom.value);
    });
    it('should the same fields To after rendering', () => {
        expect(slider.inputTo.value).toMatch(slider.numTo.value);
    });
});
