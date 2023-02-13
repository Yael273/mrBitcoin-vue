<template>
  <section class="main-layout charts-container">
    <!-- <h1>view stats</h1> -->
    <nav>
      <RouterLink to="/stats/average">Average</RouterLink>
    <RouterLink to="/stats/Value">Value</RouterLink>
    </nav>
    <router-view></router-view>
    <!-- <AvgChart />
    <ValueChart /> -->
  </section>
</template>

<script>
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