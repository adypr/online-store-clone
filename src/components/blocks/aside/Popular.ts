import { getStorageFilters } from '../../base/local';

export default class Popular {
    popular: HTMLInputElement;
    all: HTMLInputElement;

    constructor() {
        this.popular = document.createElement('input');
        this.all = document.createElement('input');
    }

    renderPopular() {
        const filters = getStorageFilters();
        const popularContainer = document.createElement('div');
        popularContainer.classList.add('aside__popular');

        const popularLabel = document.createElement('label');
        popularLabel.textContent = 'Popular 4+ ';
        this.popular.type = 'radio';
        this.popular.name = 'rating';
        if (filters && Number(filters.popular) >= 4) this.popular.checked = true;
        popularLabel.append(this.popular);

        const allLabel = document.createElement('label');
        allLabel.textContent = 'All ';
        this.all.type = 'radio';
        this.all.name = 'rating';
        if ((filters && Number(filters.popular) < 4) || !filters) this.all.checked = true;
        allLabel.append(this.all);

        popularContainer.append(popularLabel);
        popularContainer.append(allLabel);

        return popularContainer;
    }
}
