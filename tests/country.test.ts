import Country from '../src/components/blocks/aside/Country';

describe('Colors filter', () => {
    const usa = 'usa';
    const eu = 'eu';
    const japan = 'japan';
    const country = new Country();

    it('should contain country "USA"', () => {
        expect(country).toHaveProperty(usa);
    });
    it('should contain country "EU"', () => {
        expect(country).toHaveProperty(eu);
    });
    it('should contain country "Japan"', () => {
        expect(country).toHaveProperty(japan);
    });
});
