import {ChartOptionsPipe} from './chart-options.pipe';
import {Series} from '../models/models';

describe('ChartOptionsPipe', () => {
  const pipe: ChartOptionsPipe = new ChartOptionsPipe();

  it('should return the chart options object based on the series passed in', () => {
    const series: Series = {
      data: [1, 2, 3],
      themes: ['#abc', '#def', '#fab'],
      totalSpending: 55,
      totalBudget: 101
    }

    expect(pipe.transform(series)).toEqual({
      title: {
        text: '<p class="text-preset1 text-grey-900">$55</p>',
        verticalAlign: 'middle',
        y: 20,
        floating: true,
      },
      subtitle: {
        text: '<p class="text-preset5 text-grey-500">of $101 limit</p>',
        verticalAlign: 'middle',
        y: 28,
        floating: true,
      },
      tooltip: {
        enabled: false
      },
      plotOptions: {
        series: {
          allowPointSelect: false,
          cursor: 'pointer',
          dataLabels: {
            enabled: false
          }
        }
      },
      series: [
        {
          name: 'Budget',
          data: [1, 2, 3],
          colors: ['#abc', '#def', '#fab'],
          type: 'pie',
          innerSize: '80%',
          size: '80%',
          opacity: 0.75,
          borderWidth: 0,
          borderRadius: 0,
        },
        {
          name: 'Budget',
          data: [1, 2, 3],
          colors: ['#abc', '#def', '#fab'],
          type: 'pie',
          innerSize: '80%',
          size: '100%',
          borderWidth: 0,
          borderRadius: 0,
        }

      ]
    });
  });

  it('should return empty data if value passed in is null', () => {
    expect(pipe.transform(null)).toEqual({});
  });
});
