import { addEvent } from '../../base/base';
import { getStorageFilters, setStorageFilters } from '../../base/local';
import { Filters } from '../aside/filters';

export default class Slider {
    field: string;
    min: number;
    max: number;
    inputFrom: HTMLInputElement;
    inputTo: HTMLInputElement;
    numFrom: HTMLInputElement;
    numTo: HTMLInputElement;

    constructor(field: string, min: number, max: number) {
        this.field = field;
        this.min = min;
        this.max = max;
        this.inputFrom = document.createElement('input');
        this.inputTo = document.createElement('input');
        this.numFrom = document.createElement('input');
        this.numTo = document.createElement('input');
    }

    renderSlider() {
        const sliderContainer = document.createElement('div');
        sliderContainer.classList.add('slider__container');

        const title = document.createElement('h4');
        title.classList.add('aside__title');
        title.textContent = 'Price';

        const filters = getStorageFilters();
        const ranges = document.createElement('div');
        ranges.classList.add('slider__ranges');
        this.inputFrom.classList.add('slider__input', 'slider__input_from');
        this.inputFrom.type = 'range';
        this.inputFrom.value = filters ? String(filters.price[0]) : String(this.min);
        this.inputFrom.min = String(this.min);
        this.inputFrom.max = String(this.max);
        this.inputFrom.id = `${this.field}-from`;

        this.inputTo.classList.add('slider__input', 'slider__input_to');
        this.inputTo.type = 'range';
        this.inputTo.value = filters ? String(filters.price[1]) : String(this.max);
        this.inputTo.min = String(this.min);
        this.inputTo.max = String(this.max);
        ranges.append(this.inputFrom);
        ranges.append(this.inputTo);
        this.inputTo.id = `${this.field}-to`;

        const nums = document.createElement('div');
        nums.classList.add('slider__nums');

        const numFromLabel = document.createElement('label');
        numFromLabel.textContent = 'min price ';
        this.numFrom.classList.add('slider__num', 'slider__num_from');
        this.numFrom.type = 'number';
        this.numFrom.value = filters ? String(filters.price[0]) : String(this.min);
        this.numFrom.min = String(this.min);
        this.numFrom.max = String(this.max);
        numFromLabel.append(this.numFrom);
        const numToLabel = document.createElement('label');
        numToLabel.textContent = 'max price ';
        this.numTo.classList.add('slider__num', 'slider__num_to');
        this.numTo.type = 'number';
        this.numTo.value = filters ? String(filters.price[1]) : String(this.max);
        this.numTo.min = String(this.min);
        this.numTo.max = String(this.max);
        numToLabel.append(this.numTo);

        nums.append(numFromLabel);
        nums.append(numToLabel);

        sliderContainer.append(title);
        sliderContainer.append(ranges);
        sliderContainer.append(nums);

        this.fillSlider(fromSlider, toSlider, '#C6C6C6', '#25daa5', toSlider);
        this.setToggleAccessible(toSlider);

        return sliderContainer;
    }
    fillSlider(
        from: HTMLInputElement,
        to: HTMLInputElement,
        sliderColor: string,
        rangeColor: string,
        controlSlider: HTMLInputElement
    ) {
        const rangeDistance = Number(to.max) - Number(to.min);
        const fromPosition = Number(from.value) - Number(to.min);
        const toPosition = Number(to.value) - Number(to.min);
        controlSlider.style.background = `linear-gradient(
          to right,
          ${sliderColor} 0%,
          ${sliderColor} ${(fromPosition / rangeDistance) * 100}%,
          ${rangeColor} ${(fromPosition / rangeDistance) * 100}%,
          ${rangeColor} ${(toPosition / rangeDistance) * 100}%,
          ${sliderColor} ${(toPosition / rangeDistance) * 100}%,
          ${sliderColor} 100%)`;
    }

    setToggleAccessible(currentTarget: HTMLInputElement) {
        (toSlider as HTMLElement).style.zIndex = Number(currentTarget.value) <= 0 ? '2' : '0';
    }
}

export const slider = new Slider('price', 1, 25);

function controlFromInput(
    fromSlider: HTMLInputElement,
    fromInput: HTMLInputElement,
    toInput: HTMLInputElement,
    controlSlider: HTMLInputElement
) {
    const [from, to] = getParsed(fromInput, toInput);
    fillSlider(fromInput, toInput, '#C6C6C6', '#25daa5', controlSlider);
    if (from > to) {
        fromSlider.value = `${to}`;
        fromInput.value = `${to}`;
    } else {
        fromSlider.value = `${from}`;
    }
}

function controlToInput(
    toSlider: HTMLInputElement,
    fromInput: HTMLInputElement,
    toInput: HTMLInputElement,
    controlSlider: HTMLInputElement
) {
    const [from, to] = getParsed(fromInput, toInput);
    fillSlider(fromInput, toInput, '#C6C6C6', '#25daa5', controlSlider);
    setToggleAccessible(toInput);
    if (from <= to) {
        toSlider.value = `${to}`;
        toInput.value = `${to}`;
    } else {
        toInput.value = `${from}`;
    }
}

function controlFromSlider(fromSlider: HTMLInputElement, toSlider: HTMLInputElement, fromInput: HTMLInputElement) {
    const [from, to] = getParsed(fromSlider, toSlider);
    fillSlider(fromSlider, toSlider, '#C6C6C6', '#25daa5', toSlider);
    if (from > to) {
        fromSlider.value = `${to}`;
        fromInput.value = `${to}`;
    } else {
        fromInput.value = `${from}`;
    }
}

function controlToSlider(fromSlider: HTMLInputElement, toSlider: HTMLInputElement, toInput: HTMLInputElement) {
    const [from, to] = getParsed(fromSlider, toSlider);
    fillSlider(fromSlider, toSlider, '#C6C6C6', '#25daa5', toSlider);
    setToggleAccessible(toSlider);
    if (from <= to) {
        toSlider.value = `${to}`;
        toInput.value = `${to}`;
    } else {
        toInput.value = `${from}`;
        toSlider.value = `${from}`;
    }
}

function getParsed(currentFrom: HTMLInputElement, currentTo: HTMLInputElement) {
    const from = parseInt(currentFrom.value, 10);
    const to = parseInt(currentTo.value, 10);
    return [from, to];
}

function fillSlider(
    from: HTMLInputElement,
    to: HTMLInputElement,
    sliderColor: string,
    rangeColor: string,
    controlSlider: HTMLInputElement
) {
    const rangeDistance = Number(to.max) - Number(to.min);
    const fromPosition = Number(from.value) - Number(to.min);
    const toPosition = Number(to.value) - Number(to.min);
    controlSlider.style.background = `linear-gradient(
      to right,
      ${sliderColor} 0%,
      ${sliderColor} ${(fromPosition / rangeDistance) * 100}%,
      ${rangeColor} ${(fromPosition / rangeDistance) * 100}%,
      ${rangeColor} ${(toPosition / rangeDistance) * 100}%,
      ${sliderColor} ${(toPosition / rangeDistance) * 100}%,
      ${sliderColor} 100%)`;
}

function setToggleAccessible(currentTarget: HTMLInputElement) {
    if (Number(currentTarget.value) <= 0) {
        (toSlider as HTMLElement).style.zIndex = '2';
    } else {
        (toSlider as HTMLElement).style.zIndex = '0';
    }
}

const fromSlider = slider.inputFrom;
const toSlider = slider.inputTo;
const fromInput = slider.numFrom;
const toInput = slider.numTo;

addEvent(fromSlider, 'input', () => {
    const filters = getStorageFilters() as Filters;
    controlFromSlider(fromSlider, toSlider, fromInput);
    filters.price[0] = Number(fromSlider.value);
    setStorageFilters(filters);
});

addEvent(toSlider, 'input', () => {
    const filters = getStorageFilters() as Filters;
    controlToSlider(fromSlider, toSlider, toInput);
    filters.price[1] = Number(toSlider.value);
    setStorageFilters(filters);
});

addEvent(fromInput, 'input', () => {
    const filters = getStorageFilters() as Filters;
    controlFromInput(fromSlider, fromInput, toInput, toSlider);
    filters.price[0] = Number(fromInput.value);
    setStorageFilters(filters);
});

addEvent(toInput, 'input', () => {
    const filters = getStorageFilters() as Filters;
    controlToInput(toSlider, fromInput, toInput, toSlider);
    filters.price[1] = Number(toInput.value);
    setStorageFilters(filters);
});
