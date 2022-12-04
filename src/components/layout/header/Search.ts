import { addEvent } from '../../base/base';
import { defineArr, renderCards } from '../main/index';
import posters from '../../base/posters';

class Search {
    field: HTMLInputElement;
    close: HTMLDivElement;
    search: HTMLDivElement;

    constructor() {
        this.field = document.createElement('input');
        this.close = document.createElement('div');
        this.search = document.createElement('div');
    }

    renderSearch() {
        const searchContainer = document.createElement('div');
        searchContainer.classList.add('search');

        this.field.classList.add('search__field');
        this.field.type = 'text';
        this.field.placeholder = 'Search posters';
        this.field.autofocus = true;
        this.field.autocomplete = 'off';

        this.close.classList.add('close');
        this.close.textContent = 'X';

        this.search.classList.add('search__button');
        this.search.innerHTML = `<svg class="search__img" width="21" height="21">
                                <use xlink:href="./assets/icons/loupe.svg#loupe"></use>
                            </svg>`;

        searchContainer.append(this.field, this.close, this.search);

        return searchContainer;
    }
}

export const search = new Search();

addEvent(search.search, 'click', () => {
    localStorage.removeItem('searchArr');
    let postersList = defineArr();
    if (search.field.value) {
        postersList = postersList.filter((id) => {
            const poster = posters.find((elem) => elem.id === id);
            const regexp = new RegExp(search.field.value, 'i');
            if (poster?.name) return regexp.test(poster.name);
            return 1;
        });
        localStorage.setItem('searchArr', JSON.stringify(postersList));
    }
    renderCards(postersList);
});

addEvent(search.close, 'click', () => {
    localStorage.removeItem('searchArr');
    search.field.value = '';
    const posterList = defineArr();
    renderCards(posterList);
    search.field.autofocus = true;
});
