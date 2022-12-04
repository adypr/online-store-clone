const sorters: {
    [key: string]: string;
} = {
    sortAz: 'Name (A to Z)',
    sortZa: 'Name (Z to A)',
    sortPriceUp: 'Price (low to high)',
    sortPriceDown: 'Price (high to low)',
    sortYearUp: 'Oldest',
    sortYearDown: 'Newest',
};

export default class Sortform {
    form: HTMLDivElement;
    sortAz: HTMLLIElement;
    sortZa: HTMLLIElement;
    sortPriceUp: HTMLLIElement;
    sortPriceDown: HTMLLIElement;
    sortYearUp: HTMLLIElement;
    sortYearDown: HTMLLIElement;

    constructor() {
        this.form = document.createElement('div');
        this.sortAz = document.createElement('li');
        this.sortZa = document.createElement('li');
        this.sortPriceUp = document.createElement('li');
        this.sortPriceDown = document.createElement('li');
        this.sortYearUp = document.createElement('li');
        this.sortYearDown = document.createElement('li');
    }
    renderSortForm() {
        this.form.classList.add('main__sort');

        const title = document.createElement('h4');
        title.classList.add('main__sort-title');
        title.textContent = 'Sort by:';

        const formList = document.createElement('ul');
        formList.classList.add('main__sorts');

        Object.keys(sorters).map((sorter) => {
            (this[sorter as keyof Sortform] as HTMLDivElement).classList.add('main__sort-item');
            if (localStorage.getItem('sortBy') === sorter)
                (this[sorter as keyof Sortform] as HTMLDivElement).classList.add('active');
            (this[sorter as keyof Sortform] as HTMLDivElement).textContent = sorters[sorter];
            formList.append(this[sorter as keyof Sortform] as HTMLDivElement);
        });

        this.form.append(title, formList);

        return this.form;
    }
}
