import {FormatAmountPipe} from './format-amount.pipe';

describe('FormatAmountPipe', () => {
  const pipe = new FormatAmountPipe();

  it('should format a positive amount correctly', () => {
    expect(pipe.transform(123.5)).toEqual('+$123.5');
  });

  it('should format a negative amount correctly', () => {
    expect(pipe.transform(-456.75)).toEqual('-$456.75');
  })
});
