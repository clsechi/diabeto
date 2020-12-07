<template>
  <canvas
    :id="chartId"
  />
</template>

<script>
import Chart from 'chart.js';
import ChartAnnotation from 'chartjs-plugin-annotation';
import targetsAsAnnotation from 'src/helpers/chart/targetsAsAnnotation';
import { date, uid } from 'quasar';

const { formatDate } = date;

export default {
  name: 'LineChart',

  props: {
    records: {
      type: Array,
      required: true,
    },
  },

  data() {
    return {
      chart: null,
    };
  },

  computed: {
    chartId() {
      return `line-chart-${uid()}`;
    },
  },

  watch: {
    records() {
      this.updateChart();
    },
  },

  mounted() {
    this.drawChart();
  },

  beforeDestroy() {
    this.chart.destroy();
  },

  methods: {
    chartData() {
      return this.records
        .map(record => record.dextro)
        .filter(dextro => Boolean(dextro))
        .reverse();
    },

    chartLabels() {
      return this.records.map(record => formatDate(record.time, 'HH:mm'));
    },

    chartConfig() {
      return {
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
        plugins: [ChartAnnotation],
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
          annotation: {
            annotations: [...targetsAsAnnotation],
          },
        },
      };
    },

    updateChart() {
      this.chart.data.labels = this.chartLabels();
      this.chart.data.datasets[0].data = this.chartData();
      this.chart.update();
    },

    drawChart() {
      const ctx = document.getElementById(this.chartId).getContext('2d');
      this.chart = new Chart(ctx, this.chartConfig());
    },
  },
};
</script>

<style lang="stylus">
#myChart
  width: 100%
  height: 50px
</style>
