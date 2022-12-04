import Cart from './Cart';
import { domElem } from '../../base/base';

const cart = new Cart();
const cartContainer = domElem('.header__cart') as HTMLDivElement;

const buildCart = () => {
    if (cartContainer) {
        cartContainer.innerHTML = '';
        cartContainer?.append(cart.renderCart());
    }
};

export default buildCart;
