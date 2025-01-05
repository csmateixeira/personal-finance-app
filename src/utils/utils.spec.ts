import {Utils} from './utils';

describe('Utils', () => {
  it('should return the correct page data', () => {
    const data = [
      { id: 1, amount: 10 },
      { id: 2, amount: 20 },
      { id: 3, amount: 30 },
      { id: 4, amount: 40 },
      { id: 5, amount: 50 },
      { id: 6, amount: 60 },
      { id: 7, amount: 70 },
      { id: 8, amount: 80 },
      { id: 9, amount: 90 },
      { id: 10, amount: 100 },
      { id: 11, amount: 110 },
      { id: 12, amount: 120 },
      { id: 13, amount: 130 },
      { id: 14, amount: 140 },
      { id: 15, amount: 150 },
      { id: 16, amount: 160 },
      { id: 17, amount: 170 },
      { id: 18, amount: 180 },
      { id: 19, amount: 190 },
      { id: 20, amount: 200 },
    ];
    const page1 = [
      { id: 1, amount: 10 },
      { id: 2, amount: 20 },
      { id: 3, amount: 30 },
      { id: 4, amount: 40 },
      { id: 5, amount: 50 },
      { id: 6, amount: 60 },
      { id: 7, amount: 70 },
      { id: 8, amount: 80 },
      { id: 9, amount: 90 },
      { id: 10, amount: 100 },
    ];
    const page2 = [
      { id: 11, amount: 110 },
      { id: 12, amount: 120 },
      { id: 13, amount: 130 },
      { id: 14, amount: 140 },
      { id: 15, amount: 150 },
      { id: 16, amount: 160 },
      { id: 17, amount: 170 },
      { id: 18, amount: 180 },
      { id: 19, amount: 190 },
      { id: 20, amount: 200 },
    ]

    expect(Utils.getPageData(data, 1)).toEqual(page1);
    expect(Utils.getPageData(data, 2)).toEqual(page2);
  });
});
