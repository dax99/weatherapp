<template>
    <div class="hourly-weather">
        <div class="container">
            <div class="hourly-temp" v-for="(time,index) in this.forecast.hourly.slice(0,24)" :key="index">
                <HourlyTemp :time="time" :index="index" />
            </div>
        </div>
    </div>
</template>

<script>
import HourlyTemp from "./HourlyTemp"
export default {
    name: "HourlyWeather",
    props: ["forecast"],
    components: {
        HourlyTemp,
    },
};
</script>

<style lang="scss" scoped>

.hourly-weather {
    padding: 30px 0;
    border-bottom: 1px solid #fff;

    .container {
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
            -webkit-box-pack: justify;
                -ms-flex-pack: justify;
                    justify-content: space-between;
        max-width: 100vw;
        overflow: scroll;
        padding: 0;
        margin: 0 20px;

        &::-webkit-scrollbar {
            display: none;
        }
    }
}

</style>