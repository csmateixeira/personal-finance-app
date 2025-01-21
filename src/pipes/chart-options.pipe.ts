import {Pipe, PipeTransform} from '@angular/core';
import {Series} from '../models/models';
import * as Highcharts from 'highcharts';


@Pipe({
  name: 'chartOptions'
})
export class ChartOptionsPipe implements PipeTransform {

  transform(value: Series | null): Highcharts.Options {
    return value ? this.getChartOptions(value) : {};
  }

  private getChartOptions(series: Series): Highcharts.Options {
    const title: string = `<p class="text-preset1 text-grey-900">$${series.totalSpending}</p>`;
    const subtitle: string = `<p class="text-preset5 text-grey-500">of $${series.totalBudget} limit</p>`;

    return  {
      title: {
        text: title,
        verticalAlign: 'middle',
        y: 20,
        floating: true,
      },
      subtitle: {
        text: subtitle,
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
          data: series.data,
          colors: series.themes,
          type: 'pie',
          innerSize: '80%',
          size: '80%',
          opacity: 0.75,
          borderWidth: 0,
          borderRadius: 0,
        },
        {
          name: 'Budget',
          data: series.data,
          colors: series.themes,
          type: 'pie',
          innerSize: '80%',
          size: '100%',
          borderWidth: 0,
          borderRadius: 0,
        }

      ]
    };
  }
}
