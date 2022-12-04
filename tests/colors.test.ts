import { domList } from '../src/components/base/base';
import Colors, { colorsList } from '../src/components/blocks/aside/Colors';

describe('Colors filter', () => {
    const colors = new Colors();
    document.body.append(colors.renderColors());
    const colorArr: string[] = [];
    domList('.aside__color-item').forEach((element) =>
        colorArr.push((element as HTMLLabelElement).style.backgroundColor)
    );

    it('should contain all colors', () => {
        expect(colorArr).toEqual(colorsList);
    });
});
