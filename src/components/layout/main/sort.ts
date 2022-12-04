import Card from '../../blocks/card/Card';
import posters from '../../base/posters';

export default (storageArr: Array<number>, field: keyof Card, direction = 'up') => {
    const resArr = storageArr.sort((a, b) => {
        const elem1 = posters.find((elem) => elem.id === a) as Card;
        const elem2 = posters.find((elem) => elem.id === b) as Card;
        const str1 = elem1[field];
        const str2 = elem2[field];
        if (typeof str1 === 'number' && typeof str2 === 'number') {
            return direction === 'down' ? str2 - str1 : str1 - str2;
        }
        if (typeof str1 === 'string' && typeof str2 === 'string') {
            return direction === 'down' ? str2.localeCompare(str1) : str1.localeCompare(str2);
        }
        return 0;
    });
    return resArr;
};
