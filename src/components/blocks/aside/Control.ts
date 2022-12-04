import { defineArr } from '../../layout/main';
export default class Control {
    applay: HTMLInputElement;
    reset: HTMLInputElement;

    constructor() {
        this.applay = document.createElement('input');
        this.reset = document.createElement('input');
    }

    rendercontrolForm() {
        const controlContainer = document.createElement('div');
        controlContainer.classList.add('aside__settings');

        const foundText = document.createElement('p');
        foundText.classList.add('aside__found');
        const foundValue = defineArr().length;
        const word = foundValue === 1 ? '' : 's';
        foundText.textContent = `Found ${String(foundValue)} item${word}`;

        this.applay.classList.add('button', 'button_applay');
        this.applay.type = 'submit';
        this.applay.value = 'Apply';

        this.reset.classList.add('button');
        this.reset.type = 'submit';
        this.reset.value = 'Reset filters';

        controlContainer.append(foundText);
        controlContainer.append(this.applay);
        controlContainer.append(this.reset);

        return controlContainer;
    }
}
