<template>
  <div class="weekly-foercast">
    <div class="container">
        <div class="daily" v-for="(day, index) in this.forecast.daily.slice(1, 8) " :key="index">
            <DailyForecast :day="day" :index="index" />
        </div>
    </div>
  </div>
</template>

<script>
import DailyForecast from "./DailyForecast"
export default {
    name: "weeklyForecast",
    props: ["forecast"],
    components: {
        DailyForecast,
    },
};
</script>

<style lang="scss" scoped>

.weekly-foercast {
    padding: 30px 0;

    .daily:not(:last-child) {
        margin-bottom: 25px;
    }

}

</style>