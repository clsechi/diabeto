import Chart from 'chart.js';
import { uid } from 'quasar';

const lengthUpdated = (newData, oldData) => (
  Boolean(newData) && Boolean(oldData) && (newData.length !== oldData.length)
);

const checkRequiredMethods = (object) => {
  const methods = [
    'chartLabels',
    'chartData',
    'chartConfig',
  ];

  const result = methods.every(method => typeof object[method] === 'function');

  if (!result) throw new Error('Missing methods in parent component');
};

/**
 * @mixin
 *
 * Provides methods to handle chart reactivity
 *
 * The component need to have the methods bellow
 *
 * @method chartLabels()
 * @method chartData()
 * @method chartConfig()
 *
 * Use a watcher calling updateChart() to handle reactivity
 */
export default {
  data() {
    return {
      chart: null,
      chartId: uid(),
    };
  },

  created() {
    checkRequiredMethods({ ...this });
  },

  mounted() {
    this.drawChart();
  },

  /**
   * Destroy the chart instance to avoid memory leak
   */
  beforeDestroy() {
    this.chart.destroy();
  },

  methods: {
    /**
     * Used by watcher to handle reactivity on chart
     * Check for length equality to avoid the complete chart recreation unnecessarily
     * Only update the chart when the length difference exists, generate problems in some plugins
     *
     * @param {array} newData
     * @param {array} oldData
     */
    updateChart(newData, oldData, forceDestroy = false) {
      if (forceDestroy || lengthUpdated(newData, oldData)) {
        this.chart.destroy();
        this.drawChart();
        this.$log.debug(`Chart ${this.chartId} recreated`);
      } else {
        this.chart.data.labels = this.chartLabels();
        this.chart.data.datasets[0].data = this.chartData();
        this.chart.update();
        this.$log.debug(`Chart ${this.chartId} updated`);
      }
    },

    drawChart() {
      const ctx = document.getElementById(this.chartId).getContext('2d');
      this.chart = new Chart(ctx, this.chartConfig());
    },
  },
};
