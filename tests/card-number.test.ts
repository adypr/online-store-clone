import Card from '../src/components/blocks/card/Card';
import posters from '../src/components/base/posters';

describe('Card number field', () => {
    const cardNumber1 = new Card(posters[0]);
    const cardNumber2 = new Card(posters[7]);
    const cardNumber3 = new Card(posters[31]);
    const number1 = cardNumber1.number;
    const number2 = cardNumber2.number;
    const number3 = cardNumber3.number;

    document.body.append(cardNumber1.renderCard(), cardNumber2.renderCard(), cardNumber3.renderCard());

    it(`Card id${posters[0].id} should have value 0`, () => {
        expect(number1.value).toBe('0');
    });
    it(`Card id${posters[7].id} should have value 0`, () => {
        expect(number2.value).toBe('0');
    });
    it(`Card id${posters[31].id} should have value 0`, () => {
        expect(number3.value).toBe('0');
    });
});
