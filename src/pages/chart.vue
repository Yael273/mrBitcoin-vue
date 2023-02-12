<template>
  <section class="chart">
    <Line id="my-chart-id" :options="chartOptions" :data="chartDataAvgBlockSize" />
    <Line id="my-chart-id" :options="chartOptions" :data="chartDataMarketPrice" />
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
} from "chart.js";
import { Line } from "vue-chartjs";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default {
  name: "LineChart",
  components: { Line },
  data() {
    return {
      //   exchangeRate: null,
      exchangeRate: "0.00004586",
      avgBlockSize: null,
      MarketPrice: null,
      chartDataAvgBlockSize: {
        labels: "",
        datasets: [
          {
            label: "",
            data: "",
            fill: false,
            borderColor: "rgb(75, 192, 192)",
            tension: 0.1,
          },
        ],
      },
      chartDataMarketPrice: {
        labels: "",
        datasets: [
          {
            label: "",
            data: "",
            fill: false,
            borderColor: "rgb(75, 150, 192)",
            tension: 0.1,
          },
        ],
      },
      chartOptions: {
        responsive: true,
      },
    };
  },
  async created() {
    // this.exchangeRate = await bitcoinService.getRate();
    // this.exchangeRate = await bitcoinService.getMarketPriceHistory();
    // this.exchangeRate = await bitcoinService.getAvgBlockSize();
    this.avgBlockSize = bitcoinService.getAvgBlockSizeLocal();
    this.MarketPrice = bitcoinService.getMarketPriceHistoryLocal();

    //avgBlockSize chart
    this.chartDataAvgBlockSize.datasets[0].data = this.avgBlockSize.values.map(
      (value) => value.y
    );
    this.chartDataAvgBlockSize.labels = this.avgBlockSize.values.map((value) => value.x);
    this.chartDataAvgBlockSize.datasets[0].label = this.avgBlockSize.description;

    //MarketPrice chart
    this.chartDataMarketPrice.datasets[0].data = this.MarketPrice.values.map(
      (value) => value.y
    );
    this.chartDataMarketPrice.labels = this.MarketPrice.values.map(
      (value) => value.x
    );
    this.chartDataMarketPrice.datasets[0].label = this.MarketPrice.description;
  },
};
</script>

<style lang="scss">
#my-chart-id{
  width: 500px;
}
</style>