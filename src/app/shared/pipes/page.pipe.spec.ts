import {PaginatePipe} from './page.pipe';
import {TransactionsUtils} from '../../transactions/transactions.utils';

describe('PagePipe', () => {
  const pipe = new PaginatePipe();
  const allData: string[] = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'];
  const page: string[] = ['1', '2', '3'];

  beforeEach(() => {
    spyOn(TransactionsUtils, 'getPageData').and.returnValue(page);
  });

  it('should return the correct page data', () => {
    expect(pipe.transform<string>(allData, 2)).toEqual(page);
    expect(TransactionsUtils.getPageData).toHaveBeenCalledWith(allData, 2);
  });

  it('should return empty page data if value passed in is null', () => {
    expect(pipe.transform<string>(null, 2)).toEqual([]);
    expect(TransactionsUtils.getPageData).not.toHaveBeenCalled();
  });

  it('should return data for page 1 if page passed in is null', () => {
    expect(pipe.transform<string>(allData, null)).toEqual(page);
    expect(TransactionsUtils.getPageData).toHaveBeenCalledWith(allData, 1);
  });
});
