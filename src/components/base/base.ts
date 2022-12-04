export const domElem = (selector: string) => document.querySelector(selector);
export const domList = (selector: string) => document.querySelectorAll(selector);

export const addEvent = (element: HTMLElement, event: string, func: (e: Event) => void, areOptions?: boolean) =>
    element.addEventListener(event, func, areOptions);

export const removeEvent = (element: HTMLElement, event: string, func: (e: Event) => void, areOptions?: boolean) =>
    element.removeEventListener(event, func, areOptions);

export const randomNumber = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;
