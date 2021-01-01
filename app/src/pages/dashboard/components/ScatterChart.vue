<template>
  <div>
    <canvas
      :id="chartId"
    />
  </div>
</template>

<script>
import ChartMixin from 'src/mixins/chart';
import ChartAnnotation from 'chartjs-plugin-annotation';
import targetsAsAnnotation from 'src/helpers/chart/targetsAsAnnotation';
import { date } from 'quasar';

const { formatDate } = date;

export default {
  name: 'ScatterChart',

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
  },

  watch: {
    records(newData, oldData) {
      this.updateChart(newData, oldData);
    },
  },

  methods: {
    chartData() {
      return this.records.map(record => ({
        x: Number(formatDate(record.time, 'HH.mm')),
        y: record.dextro,
      }));
    },

    chartLabels() {
      return [];
    },

    chartConfig() {
      return {
        type: 'scatter',
        data: {
          datasets: [{
            pointBackgroundColor: 'rgba(0, 0, 0, 1)',
            data: this.chartData(),
          }],
          fill: false,
          borderWidth: 0,
        },
        plugins: [ChartAnnotation],
        options: {
          responsive: true,
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
              },
            }],
            xAxes: [{
              ticks: {
                stepSize: 2,
              },
            }],
          },
          annotation: {
            annotations: targetsAsAnnotation(),
          },
        },
      };
    },
  },
};
</script>

<style lang="stylus">
#myChart
  width: 100%
  height: 450px
</style>
