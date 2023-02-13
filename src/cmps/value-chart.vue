<template>
  <div class="chart">
    <Line
      v-if="MarketPrice"
      id="my-chart-id"
      :options="chartOptions"
      :data="getChartData"
    />
  </div>
</template>

<script>
import { bitcoinService } from "../services/bitcoin.service.js";
import { Line } from "vue-chartjs";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from "chart.js";

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
);

export default {
  name: "LineChart",
  components: { Line },
  data() {
    return {
      MarketPrice: null,
      chartOptions: {
        responsive: true,
      },
    };
  },
  async created() {
    this.MarketPrice = await bitcoinService.getMarketPriceHistory();
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
            tension: 0.1,
            backgroundColor: "#f7931a99",
          },
        ],
      };
    },
    getDataLabels() {
      return this.MarketPrice.values.map((value) => {
        const date = new Date(value.x * 1000);
        return `${date.getDate() + 1}.${date.getMonth() + 1}`;
      });
    },
    getDatasetData() {
      return this.MarketPrice.values.map((value) => value.y);
    },
    getDataLabel() {
      return this.MarketPrice.description;
    },
  },
};
</script>

<style lang="scss">
</style>