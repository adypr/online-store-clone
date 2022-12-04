import { domElem } from '../../base/base';
import { slider } from '../slider/Slider';
import { colors, country, sizes, popular } from './filters';
import { control } from './control-filters';

const aside = domElem('.aside__filters') as HTMLFormElement;

if (aside) {
    aside.append(slider.renderSlider());
    aside.append(control.rendercontrolForm());
    aside.append(colors.renderColors());
    aside.append(country.renderCountry());
    aside.append(popular.renderPopular());
    aside.append(sizes.renderSizes());
}
