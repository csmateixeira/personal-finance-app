import { PaginatePipe } from './page.pipe';

describe('PagePipe', () => {
  it('create an instance', () => {
    const pipe = new PaginatePipe();
    expect(pipe).toBeTruthy();
  });
});
