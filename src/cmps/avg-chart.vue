<template>
  <section class="chart">
    <Line
      v-if="avgBlockSize"
      id="my-chart-id"
      :options="chartOptions"
      :data="getChartData"
    />
  </section>
</template>
  
  <script>
import { bitcoinService } from "../services/bitcoin.service";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from "chart.js";
import { Line } from "vue-chartjs";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

export default {
  name: "LineChart",
  components: { Line },
  data() {
    return {
      avgBlockSize: null,
      chartOptions: {
        responsive: true,
      },
    };
  },
  async created() {
    this.avgBlockSize = await bitcoinService.getAvgBlockSize();
  },
  computed: {
    getChartData() {
      return {
        labels: this.getDataLabels,
        datasets: [
          {
            label: this.getDataLabel,
            data: this.getDatasetData,
            fill: false,
            borderColor: "rgb(75, 192, 192)",
            color: 'white',
            tension: 0.1,
            backgroundColor: "#f7931a99",
            // pointRadius: 0,
          },
        ],
      };
    },
    getDataLabels() {
      return this.avgBlockSize.values.map((value) => {
        const date = new Date(value.x * 1000);
        return `${date.getDate() + 1}.${date.getMonth() + 1}`;
      });
    },
    getDatasetData() {
      return this.avgBlockSize.values.map((value) => value.y);
    },
    getDataLabel() {
      return this.avgBlockSize.description;
    },
  },
};
</script>
  
  <style lang="scss">
</style>