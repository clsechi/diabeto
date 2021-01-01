<template>
  <canvas
    :id="chartId"
  />
</template>

<script>
import addAnnotations from 'src/helpers/chart/annotations';
import ChartMixin from 'src/mixins/chart';
import { date } from 'quasar';

const { formatDate } = date;

export default {
  name: 'LineChart',

  mixins: [
    ChartMixin,
  ],

  props: {
    records: {
      type: Array,
      required: true,
    },
  },

  watch: {
    records(newData, oldData) {
      // temporary fix, see T-43
      this.updateChart(newData, oldData, true);
    },
  },

  methods: {
    chartData() {
      return this.records
        .map(record => record.dextro)
        .filter(dextro => Boolean(dextro))
        .reverse();
    },

    chartLabels() {
      return this.records
        .map(record => formatDate(record.time, 'HH:mm'))
        .reverse();
    },

    chartConfig() {
      return addAnnotations({
        type: 'line',
        data: {
          labels: this.chartLabels(),
          datasets: [{
            data: this.chartData(),
            borderColor: 'rgba(255, 99, 132, 1)',
          }],
          fill: false,
          borderWidth: 0,
        },
        options: {
          legend: {
            display: false,
          },
          maintainAspectRatio: false,
          elements: {
            line: {
              fill: false,
              tension: 0.2,
            },
          },
          scales: {
            yAxes: [{
              ticks: {
                beginAtZero: true,
              },
            }],
            xAxes: [{
              gridLines: {
                display: false,
              },
            }],
          },
        },
      });
    },
  },
};
</script>

<style lang="stylus">
#myChart
  width: 100%
  height: 50px
</style>
