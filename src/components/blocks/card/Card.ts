import { randomNumber } from '../../base/base';
import { idList } from '../../layout/main';
import { NumberArr } from '../../layout/main';

export default class Card {
    id: number;
    name: string;
    img: string;
    category: string[];
    width: number;
    height: number;
    color: string[];
    price: number;
    year: number;
    country: string;
    rating: number;
    count: number;
    card: HTMLDivElement;
    favIcon: HTMLImageElement;
    order: HTMLDivElement;
    number: HTMLInputElement;
    button: HTMLButtonElement;
    more: HTMLDivElement;
    less: HTMLDivElement;

    constructor({
        id,
        name,
        img,
        category,
        width,
        height,
        color,
        price,
        year,
        country,
        rating,
        count,
    }: {
        id: number;
        name: string;
        img: string;
        category: string[];
        width: number;
        height: number;
        color: string[];
        price: number;
        year: number;
        country: string;
        rating: number;
        count: number;
    }) {
        this.id = id;
        this.name = name;
        this.img = img;
        this.category = category;
        this.width = width;
        this.height = height;
        this.color = color;
        this.price = price;
        this.year = year;
        this.country = country;
        this.rating = rating;
        this.count = count;
        this.card = document.createElement('div');
        this.favIcon = document.createElement('img');
        this.order = document.createElement('div');
        this.number = document.createElement('input');
        this.button = document.createElement('button');
        this.more = document.createElement('div');
        this.less = document.createElement('div');
    }

    renderCard(): HTMLElement {
        this.card.classList.add('card');

        this.favIcon.classList.add('card__favorite');
        this.favIcon.src = './assets/icons/heart-small.svg';
        this.favIcon.alt = 'Add to favorite';

        const picture = document.createElement('div');
        picture.classList.add('card__picture');

        const img = document.createElement('img');
        img.classList.add('card__img');
        img.src = this.img;
        img.alt = 'poster';
        img.width = 176;
        img.height = 236;
        picture.append(img);

        const title = document.createElement('h4');
        title.classList.add('card__title');
        title.textContent = this.name;

        const size = document.createElement('p');
        size.classList.add('card__size');
        size.textContent = `Size: ${this.width} x ${this.height}`;

        const colorsContainer = document.createElement('div');
        colorsContainer.classList.add('card__colors');
        this.color.forEach((color) => {
            const colorSample = document.createElement('div');
            colorSample.classList.add('card__color', `card__color_${color}`);
            colorsContainer.append(colorSample);
        });

        const country = document.createElement('p');
        country.classList.add('card__country');
        const countryText = () => {
            if (this.country === 'usa' || this.country === 'eu') return this.country.toUpperCase();
            return this.country;
        };
        country.textContent = `${countryText()}, ${this.year}`;

        const rating = document.createElement('div');
        rating.classList.add('card__rating');
        const stars = document.createElement('div');
        stars.classList.add('card__stars');
        for (let i = 1; i <= 5; i++) {
            const star = document.createElement('span');
            if (i <= this.rating) {
                star.classList.add('active');
            }
            stars.append(star);
        }
        const reviews = document.createElement('p');
        reviews.classList.add('card__reviews');
        reviews.textContent = `${randomNumber(0, 100)} reviews`;
        rating.append(stars, reviews);

        const amount = document.createElement('div');
        amount.classList.add('card__amount');
        amount.textContent = `Available: ${this.count} pcs`;

        this.order.classList.add('card__order');
        this.less.classList.add('card__quantity', 'card__quantity_less');
        this.less.textContent = '-';

        this.number.classList.add('card__number');
        this.number.type = 'number';
        this.number.min = '0';
        this.number.max = `${this.count}`;
        this.number.disabled = true;

        const numberArr = JSON.parse(localStorage.getItem('numberArr') as string) as NumberArr;
        this.number.value = numberArr?.[this.id] ? String(numberArr[this.id]) : '0';
        this.more.classList.add('card__quantity', 'card__quantity_more');
        this.more.textContent = '+';
        this.order.append(this.less, this.number, this.more);

        const buy = document.createElement('div');
        buy.classList.add('card__buy');
        const price = document.createElement('div');
        price.classList.add('card__price');
        price.textContent = `${this.price}`;

        this.button.classList.add('button', 'card__button');
        this.button.textContent = 'Add to cart';
        const cartArr = JSON.parse(localStorage.getItem('cartArr') as string) as idList;
        if (cartArr && cartArr.includes(this.id)) {
            this.button.classList.add('active');
            this.button.textContent = 'Remove from cart';
        }
        buy.append(price, this.button);

        this.card.append(this.favIcon, picture, title, size, colorsContainer, country, rating, amount, this.order, buy);

        return this.card;
    }
}
