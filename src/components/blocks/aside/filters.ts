import { addEvent } from '../../base/base';
import Colors, { colorsList } from './Colors';
import Country, { countries } from './Country';
import Sizes from './Sizes';
import Popular from './Popular';

export interface Filters {
    popular: number;
    width: number;
    height: number;
    country: string[];
    color: string[];
    price: number[];
}

export const filters: Filters = {
    popular: 0,
    width: 0,
    height: 0,
    country: [],
    color: [],
    price: [1, 25],
};

export const colors = new Colors();

colorsList.forEach((color) => {
    const currentColor = colors[color] as HTMLInputElement;
    addEvent(currentColor, 'input', () => {
        const filters = JSON.parse(localStorage.getItem('filters') as string) as Filters;
        if (currentColor.checked && !filters.color.includes(color)) {
            filters.color.push(color);
        } else if (filters.color.includes(color)) {
            filters.color = filters.color.filter((elem) => elem !== color);
        }
        localStorage.setItem('filters', JSON.stringify(filters));
    });
});

// Filters by country

export const country = new Country();

countries.forEach((countryName) => {
    const currentCountry = country[countryName] as HTMLInputElement;
    addEvent(currentCountry, 'input', () => {
        const filters = JSON.parse(localStorage.getItem('filters') as string) as Filters;

        if (currentCountry.checked && !filters.country.includes(countryName)) {
            filters.country.push(countryName);
        } else if (filters.country.includes(countryName)) {
            filters.country = filters.country.filter((elem) => elem !== countryName);
        }
        localStorage.setItem('filters', JSON.stringify(filters));
    });
});

// Filter by sizes

export const sizes = new Sizes();

addEvent(sizes.width, 'input', () => {
    const filters = JSON.parse(localStorage.getItem('filters') as string) as Filters;
    filters.width = Number(sizes.width.value);
    localStorage.setItem('filters', JSON.stringify(filters));
});

addEvent(sizes.height, 'input', () => {
    const filters = JSON.parse(localStorage.getItem('filters') as string) as Filters;
    filters.height = Number(sizes.height.value);
    localStorage.setItem('filters', JSON.stringify(filters));
});

// Filter by rating

export const popular = new Popular();

addEvent(popular.popular, 'input', () => {
    const filters = JSON.parse(localStorage.getItem('filters') as string) as Filters;
    filters.popular = 4;
    localStorage.setItem('filters', JSON.stringify(filters));
});
addEvent(popular.all, 'input', () => {
    const filters = JSON.parse(localStorage.getItem('filters') as string) as Filters;
    filters.popular = 0;
    localStorage.setItem('filters', JSON.stringify(filters));
});
