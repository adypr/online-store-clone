import { idList } from '../main';

export default class Cart {
    stick: HTMLDivElement;

    constructor() {
        this.stick = document.createElement('div');
    }

    renderCart() {
        const link = document.createElement('a');
        link.href = '#';
        link.classList.add('header__link');
        link.innerHTML = `<svg class="header__img" width="24" height="24">
                                <use xlink:href="./assets/icons/header-icons.svg#cart"></use>
                            </svg>`;

        this.stick.classList.add('header__stick');
        const value = JSON.parse(localStorage.getItem('cartArr') as string) as idList;
        this.stick.style.display = 'none';
        if (value && value.length) {
            this.stick.textContent = String(value.length);
            this.stick.style.display = 'flex';
        }
        link.append(this.stick);

        return link;
    }
}
