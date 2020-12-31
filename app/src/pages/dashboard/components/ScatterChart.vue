<template>
  <div>
    <canvas
      :id="chartId"
    />
  </div>
</template>

<script>
import Chart from 'chart.js';
import ChartAnnotation from 'chartjs-plugin-annotation';
import targetsAsAnnotation from 'src/helpers/chart/targetsAsAnnotation';
import { date, uid } from 'quasar';

const { formatDate } = date;

export default {
  name: 'ScatterChart',

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

  data() {
    return {
      chart: null,
    };
  },

  computed: {
    chartId() {
      return `scatter-chart-${uid()}`;
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

  methods: {
    chartData() {
      return this.records.map(record => ({
        x: Number(formatDate(record.time, 'HH.mm')),
        y: record.dextro,
      }));
    },

    chartConfig() {
      return {
        type: 'scatter',
        data: {
          datasets: [{
            label: 'Scatter Dataset',
            backgroundColor: 'rgb(48, 48, 47)',
            pointBackgroundColor: 'rgb(255, 255, 255)',
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
          // maintainAspectRatio: false,
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
                autoSkip: false,
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
  height: 450px
</style>
