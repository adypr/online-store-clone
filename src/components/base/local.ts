import { idList } from '../layout/main';
import { Filters } from '../blocks/aside/filters';

export const getStorageFilters = () => {
    if (localStorage.getItem('filters')) return JSON.parse(localStorage.getItem('filters') as string) as Filters;
};

export const setStorageFilters = (filters: Filters) => {
    localStorage.setItem('filters', JSON.stringify(filters));
};

export const getStorageArr = () => {
    if (localStorage.getItem('storageArr')) return JSON.parse(localStorage.getItem('storageArr') as string) as idList;
};
