import '../../blocks/aside/index';
import posters from '../../base/posters';
import Card from '../../blocks/card/Card';
import { addEvent, domElem } from '../../base/base';
import SortForm from './SortForm';
import sort from './sort';
import Sortform from './SortForm';
import buildCart from '../header';
import { getStorageArr } from '../../base/local';

if (!localStorage.getItem('cartArr')) localStorage.setItem('cartArr', JSON.stringify([]));
if (!localStorage.getItem('numberArr')) localStorage.setItem('numberArr', JSON.stringify({}));

export type idList = Array<number>;

export interface NumberArr {
    [key: number]: number;
}

buildCart();
export const renderCards = (arr: idList) => {
    cardsContainer.innerHTML = '';
    if (arr.length === 0) {
        cardsContainer.innerHTML = `<div class="not-found">
                                            <h2 class="not-found__message">
                                                Sorry, nothing found
                                            </h2>
                                        </div>`;
    } else {
        arr.forEach((element) => {
            const poster = posters.find((elem) => elem.id === element) as Card;
            const card = new Card(poster);

            addEvent(card.button, 'click', () => {
                let cartArr = JSON.parse(localStorage.getItem('cartArr') as string) as idList;
                if (cartArr.includes(card.id)) {
                    card.button.classList.remove('active');
                    card.button.textContent = 'Add to cart';
                    cartArr = cartArr.filter((id) => id !== card.id);
                    localStorage.setItem('cartArr', JSON.stringify(cartArr));

                    const numberArr = JSON.parse(localStorage.getItem('numberArr') as string) as NumberArr;
                    card.number.value = '0';
                    numberArr[card.id] = 0;
                    localStorage.setItem('numberArr', JSON.stringify(numberArr));
                } else {
                    card.button.classList.add('active');
                    card.button.textContent = 'Remove from cart';
                    cartArr.push(card.id);
                    localStorage.setItem('cartArr', JSON.stringify(cartArr));

                    const numberArr = JSON.parse(localStorage.getItem('numberArr') as string) as NumberArr;
                    card.number.value = '1';
                    numberArr[card.id] = 1;
                    localStorage.setItem('numberArr', JSON.stringify(numberArr));
                }
                buildCart();
            });
            addEvent(card.more, 'click', () => {
                card.number.stepUp();
                const numberArr = JSON.parse(localStorage.getItem('numberArr') as string) as NumberArr;
                numberArr[card.id] = Number(card.number.value);
                localStorage.setItem('numberArr', JSON.stringify(numberArr));

                const cartArr = JSON.parse(localStorage.getItem('cartArr') as string) as idList;
                if (!cartArr.includes(card.id) && Number(card.number.value) === 1) {
                    cartArr.push(card.id);
                    card.button.click();
                    localStorage.setItem('cartArr', JSON.stringify(cartArr));
                }
            });
            addEvent(card.less, 'click', () => {
                card.number.stepDown();
                const numberArr = JSON.parse(localStorage.getItem('numberArr') as string) as NumberArr;
                numberArr[card.id] = Number(card.number.value);
                localStorage.setItem('numberArr', JSON.stringify(numberArr));

                let cartArr = JSON.parse(localStorage.getItem('cartArr') as string) as idList;
                if (cartArr.includes(card.id) && Number(card.number.value) === 0) {
                    cartArr = cartArr.filter((id) => id !== card.id);
                    card.button.click();
                    localStorage.setItem('cartArr', JSON.stringify(cartArr));
                }
            });
            cardsContainer?.append(card.renderCard());
        });
    }
};

export const defineArr = () => {
    const searchArr = JSON.parse(localStorage.getItem('searchArr') as string) as idList;
    const sortArr = getStorageArr() as idList;
    const filterArr = JSON.parse(localStorage.getItem('filterArr') as string) as idList;
    const resArr =
        searchArr && searchArr.length !== 0 ? searchArr : filterArr && filterArr.length !== 0 ? filterArr : sortArr;
    return resArr;
};

const mainContainer = domElem('.main__container');

const sorting = new SortForm();

const storageArr = (): number[] => {
    const arr: number[] = [];
    posters.forEach((element) => {
        arr.push(element.id);
    });
    return arr;
};

if (!localStorage.getItem('storageArr')) {
    localStorage.setItem('storageArr', JSON.stringify(storageArr()));
}

export const cardsContainer = document.createElement('div');
cardsContainer.classList.add('main__cards');

const currentArr = defineArr();

renderCards(currentArr);

mainContainer?.append(sorting.renderSortForm());
mainContainer?.append(cardsContainer);

// Sorting

if (!localStorage.getItem('sortBy')) {
    localStorage.setItem('sortBy', 'default');
}

const sortButtons = [
    sorting.sortAz,
    sorting.sortZa,
    sorting.sortPriceUp,
    sorting.sortPriceDown,
    sorting.sortYearUp,
    sorting.sortYearDown,
];

const clearActiveClass = () => {
    sortButtons.forEach((element) => {
        element.classList.remove('active');
    });
};

type Sorts = keyof Sortform;

const upDirection: {
    [key: string]: string;
} = {
    sortAz: 'sortAz',
    sortPriceUp: 'sortPriceUp',
    sortYearUp: 'sortPriceUp',
};

const sortItems: Sorts[] = ['sortAz', 'sortZa', 'sortPriceUp', 'sortPriceDown', 'sortYearUp', 'sortYearDown'];

sortItems.forEach((item, index) => {
    addEvent(sorting[item] as HTMLLIElement, 'click', () => {
        const searchArr = JSON.parse(localStorage.getItem('searchArr') as string) as idList;
        const sortArr = getStorageArr() as idList;
        const filterArr = JSON.parse(localStorage.getItem('filterArr') as string) as idList;
        const currentArr = searchArr ? searchArr : filterArr ? filterArr : sortArr;
        const direction: string = upDirection[item] ? 'up' : 'down';

        let field: keyof Card = 'name';
        if (index === 2 || index === 3) field = 'price';
        if (index === 4 || index === 5) field = 'year';
        const newArr = sort(currentArr, field, direction);
        cardsContainer.innerHTML = '';
        renderCards(newArr);
        clearActiveClass();
        (sorting[item] as HTMLLIElement).classList.add('active');
        localStorage.setItem('sortBy', item);
        if (searchArr) localStorage.setItem('searchArr', JSON.stringify(newArr));
        else if (filterArr) localStorage.setItem('filterArr', JSON.stringify(newArr));
        else localStorage.setItem('storageArr', JSON.stringify(newArr));
    });
});

// Reset

if (domElem('input.reset')) {
    addEvent(domElem('input.reset') as HTMLInputElement, 'click', () => {
        localStorage.clear();
        window.location.reload();
    });
}
