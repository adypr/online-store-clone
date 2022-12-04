import { getStorageFilters } from '../../base/local';

type ColorList = keyof Colors;

export const colorsList: ColorList[] = [
    'black',
    'white',
    'red',
    'orange',
    'yellow',
    'green',
    'blue',
    'brown',
    'beige',
    'pink',
    'grey',
];

export default class Colors {
    black: HTMLInputElement;
    white: HTMLInputElement;
    red: HTMLInputElement;
    orange: HTMLInputElement;
    yellow: HTMLInputElement;
    green: HTMLInputElement;
    blue: HTMLInputElement;
    brown: HTMLInputElement;
    beige: HTMLInputElement;
    pink: HTMLInputElement;
    grey: HTMLInputElement;

    constructor() {
        this.black = document.createElement('input');
        this.white = document.createElement('input');
        this.red = document.createElement('input');
        this.orange = document.createElement('input');
        this.yellow = document.createElement('input');
        this.green = document.createElement('input');
        this.blue = document.createElement('input');
        this.brown = document.createElement('input');
        this.beige = document.createElement('input');
        this.pink = document.createElement('input');
        this.grey = document.createElement('input');
    }

    renderColors() {
        const filters = getStorageFilters();

        const colorsContainer = document.createElement('div');
        colorsContainer.classList.add('aside__colors');

        const title = document.createElement('h4');
        title.classList.add('aside__title');
        title.textContent = 'Colors';

        const colors = document.createElement('div');
        colors.classList.add('aside__colors-list');

        colorsList.forEach((color) => {
            const colorItem = document.createElement('label');
            colorItem.textContent = ' ';
            colorItem.classList.add('aside__color-item');
            colorItem.style.backgroundColor = color;

            (this[color] as HTMLInputElement).type = 'checkbox';
            if (filters && filters.color.includes(color)) {
                (this[color] as HTMLInputElement).checked = true;
                colorItem.classList.add('active');
            }
            colorItem.append(this[color] as HTMLInputElement);

            colors.append(colorItem);
        });

        colorsContainer.append(title);
        colorsContainer.append(colors);

        return colorsContainer;
    }
}
