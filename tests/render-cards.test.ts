import { renderCards, cardsContainer } from '../src/components/layout/main';

describe('Render cards', () => {
    const idList = [4, 8, 12, 30, 2, 7];
    const expectedCardsNumber = idList.length;
    document.body.append(cardsContainer);
    renderCards(idList);
    it('should render all cards from id-list', () => {
        expect(cardsContainer.children.length).toBe(expectedCardsNumber);
    });
});
