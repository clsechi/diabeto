<template>
  <div>
    <canvas :id="chartId" />
  </div>
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

  methods: {
    chartData() {
      return this.records.map(record => record[this.id].average);
    },

    chartLabels() {
      return this.records.map(record => formatDate(record.time, this.timeFormat));
    },

    chartConfig() {
      return {
        type: 'line',
        data: {
          labels: this.chartLabels(),
          datasets: [{
            data: this.chartData(),
            borderColor: 'rgba(255, 99, 132, 1)',
            backgroundColor: 'white',
          }],
          fill: false,
          borderWidth: 0,
        },
        plugins: [ChartAnnotation],
        options: {
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
                stepSize: 50,
                fontColor: 'white',
              },
              gridLines: {
                color: 'rgba(255, 255, 255, 0.3)',
                zeroLineColor: 'rgba(255, 255, 255, 0.3)',
              },
            }],
            xAxes: [{
              gridLines: {
                display: false,
              },
              ticks: {
                fontColor: 'white',
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
  width: 100%;
  height: 250px;
</style>
