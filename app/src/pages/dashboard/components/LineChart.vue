<template>
  <div>
    <canvas :id="chartId" />
  </div>
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
    id: {
      type: String,
      required: true,
    },
    records: {
      type: Array,
      required: true,
    },
    timeFormat: {
      type: String,
      required: false,
      default: () => 'D/MM',
    },
  },

  watch: {
    records(newData, oldData) {
      this.updateChart(newData, oldData);
    },
  },

  methods: {
    chartData() {
      return this.records.map(record => record[this.id].average);
    },

    chartLabels() {
      return this.records.map(record => formatDate(record.time, this.timeFormat));
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
          maintainAspectRatio: true,
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
                stepSize: 50,
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
  width: 100%;
  height: 250px;
</style>
