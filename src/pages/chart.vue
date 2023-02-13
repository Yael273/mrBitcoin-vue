<template>
  <section class="charts-container">
    <AvgChart />
    <ValueChart />
  </section>
</template>

<script>
import { bitcoinService } from "../services/bitcoin.service";
import AvgChart from "@/cmps/avg-chart.vue";
import ValueChart from "@/cmps/value-chart.vue";

export default {
  components: {
    AvgChart,
    ValueChart,
  },
};
</script>

<style lang="scss">
</style>