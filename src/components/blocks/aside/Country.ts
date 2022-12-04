import { getStorageFilters } from '../../base/local';

type countryList = keyof Country;
export const countries: countryList[] = ['usa', 'eu', 'japan'];

enum Countries {
    'USA',
    'EU',
    'Japan',
}

export default class Country {
    usa: HTMLInputElement;
    eu: HTMLInputElement;
    japan: HTMLInputElement;

    constructor() {
        this.usa = document.createElement('input');
        this.eu = document.createElement('input');
        this.japan = document.createElement('input');
    }

    renderCountry() {
        const filters = getStorageFilters();
        const countryContainer = document.createElement('div');
        countryContainer.classList.add('aside__country');

        const title = document.createElement('h4');
        title.classList.add('aside__title');
        title.textContent = 'Country';
        countryContainer.append(title);

        countries.map((country, i) => {
            const label = document.createElement('label');
            label.textContent = Countries[i] + ' ';
            (this[country] as HTMLInputElement).type = 'checkbox';
            (this[country] as HTMLInputElement).checked = (filters && filters.country.includes(country)) ?? false;
            label.append(this[country] as HTMLInputElement);
            countryContainer.append(label);
        });

        return countryContainer;
    }
}
