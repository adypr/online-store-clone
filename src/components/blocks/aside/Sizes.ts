import { getStorageFilters } from '../../base/local';

export default class Sizes {
    width: HTMLInputElement;
    height: HTMLInputElement;

    constructor() {
        this.width = document.createElement('input');
        this.height = document.createElement('input');
    }

    renderSizes() {
        const filters = getStorageFilters();
        const sizesContainer = document.createElement('div');
        sizesContainer.classList.add('aside__sizes');

        const title = document.createElement('h4');
        title.textContent = 'Sizes';
        title.classList.add('aside__title');

        const description = document.createElement('p');
        description.textContent = 'find sizes about +/- 5cm';

        const labelWidth = document.createElement('label');
        labelWidth.textContent = 'Width ';
        this.width.type = 'number';
        this.width.min = '0';
        this.width.step = '5';
        if (filters && filters.width) this.width.value = String(filters.width);
        labelWidth.append(this.width);

        const labelHeight = document.createElement('label');
        labelHeight.textContent = 'Height ';
        this.height.type = 'number';
        this.height.min = '0';
        this.height.step = '5';
        if (filters && filters.height) this.height.value = String(filters.height);
        labelHeight.append(this.height);

        sizesContainer.append(title);
        sizesContainer.append(description);
        sizesContainer.append(labelWidth);
        sizesContainer.append(labelHeight);

        return sizesContainer;
    }
}
