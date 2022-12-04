import { addEvent, domElem } from '../../base/base';
import { getStorageFilters, getStorageArr, setStorageFilters } from '../../base/local';
import { idList } from '../../layout/main';
import posters from '../../base/posters';
import { renderCards } from '../../layout/main';
import Control from './Control';
import { colorsList } from './Colors';
import { Filters } from './filters';
import { slider } from '../slider/Slider';
import { filters } from './filters';

import { sizes, colors, country, popular } from './filters';

if (!localStorage.getItem('filters')) setStorageFilters(filters);

export const control = new Control();

// Applay filters

addEvent(control.applay, 'click', () => {
    localStorage.removeItem('searchArr');
    const filters = getStorageFilters() as Filters;
    let postersList = getStorageArr() as idList;

    Object.keys(filters).map((key) => {
        if (key === 'popular') {
            postersList = postersList.filter((id) => {
                const poster = posters.find((elem) => elem.id === id);
                if (poster?.rating) return poster?.rating >= filters.popular;
                return 1;
            });
        }
        if (key === 'width') {
            postersList = postersList.filter((id) => {
                const poster = posters.find((elem) => elem.id === id);
                if (poster?.width && filters.width !== 0)
                    return poster?.width >= filters.width - 5 && poster?.width <= filters.width + 5;
                return 1;
            });
        }
        if (key === 'height') {
            postersList = postersList.filter((id) => {
                const poster = posters.find((elem) => elem.id === id);
                if (poster?.height && filters.height !== 0)
                    return poster?.height >= filters.height - 5 && poster?.height <= filters.height + 5;
                return 1;
            });
        }
        if (key === 'color') {
            postersList = postersList.filter((id) => {
                const poster = posters.find((elem) => elem.id === id);
                if (filters.color.length === 0) return 1;
                const colorArr = poster?.color as string[];
                const filterArr = filters.color;
                const res = Array.from(new Set([...filterArr, ...colorArr]));
                return res.length !== filterArr.length + colorArr.length;
            });
        }

        if (key === 'country') {
            postersList = postersList.filter((id) => {
                const poster = posters.find((elem) => elem.id === id);
                if (filters.country.length === 0) return 1;
                return filters.country.includes(poster?.country as string);
            });
        }
        if (key === 'price') {
            postersList = postersList.filter((id) => {
                const poster = posters.find((elem) => elem.id === id);
                if (filters.price[0] === 0 && filters.price[1] === 0) return 1;
                if (poster) return poster.price >= filters.price[0] && poster.price <= filters.price[1];
                return 1;
            });
        }
    });
    const word = postersList.length === 1 ? '' : 's';
    const foundTextContainer = domElem('.aside__found') as HTMLDivElement;
    foundTextContainer.textContent = `Found ${String(postersList.length)} item${word}`;
    renderCards(postersList);
    localStorage.setItem('filterArr', JSON.stringify(postersList));
});

// Reset filters

addEvent(control.reset, 'click', () => {
    localStorage.removeItem('filterArr');
    setStorageFilters(filters);
    const postersList = getStorageArr() as idList;

    sizes.width.value = '';
    sizes.height.value = '';
    popular.popular.checked = false;
    country.usa.checked = false;
    country.eu.checked = false;
    country.japan.checked = false;
    colorsList.forEach((color) => {
        (colors[color] as HTMLInputElement).checked = false;
    });
    const word = postersList.length === 1 ? '' : 's';
    const foundTextContainer = domElem('.aside__found') as HTMLDivElement;
    foundTextContainer.textContent = `Found ${String(postersList.length)} item${word}`;

    slider.inputFrom.value = '1';
    slider.inputTo.value = '25';
    slider.numFrom.value = '1';
    slider.numTo.value = '25';

    slider.fillSlider(slider.inputFrom, slider.inputTo, '#C6C6C6', '#25daa5', slider.inputTo);
    slider.setToggleAccessible(slider.inputTo);
    renderCards(postersList);
});
