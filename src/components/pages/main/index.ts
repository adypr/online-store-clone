import { domElem } from '../../base/base';
import { search } from '../../layout/header/Search';

const searchContainer = domElem('.header__search');
searchContainer?.append(search.renderSearch());

window.addEventListener('load', () => {
    localStorage.removeItem('searchArr');
});
