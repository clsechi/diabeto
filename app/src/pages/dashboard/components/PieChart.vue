<template>
  <div>
    <canvas :id="chartId" />
  </div>
</template>

<script>
import ChartMixin from 'src/mixins/chart';

export default {
  name: 'PieChart',

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
      return this.records.map(({ data }) => data);
    },

    chartLabels() {
      return this.records.map(({ label }) => label);
    },

    chartConfig() {
      return {
        type: 'pie',
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
        },
      };
    },
  },
};
</script>

<style lang="stylus">
#myChart
  width: 100%;
  height: 250px;
</style>
