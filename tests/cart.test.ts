import Cart from '../src/components/layout/header/Cart';

describe('Cart', () => {
    const expectedContent = `<a href="#" class="header__link"><svg class="header__img" width="24" height="24">
                                <use xlink:href="./assets/icons/header-icons.svg#cart"></use>
                            </svg><div class="header__stick" style="display: none;"></div></a>`;
    const cart = new Cart();
    document.body.append(cart.renderCart());
    const cartLink = document.body.innerHTML;

    it('should return cart link', () => {
        expect(cartLink).toBe(expectedContent);
    });
});
