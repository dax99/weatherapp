<template>
  <div class="additional-info container">
    <div>
        <span>Sunrise</span>
        <span>{{new Date(this.currentWeather.sys.sunrise * 1000).toLocaleString("en-us", {timeStyle: 'short'})}}</span>
    </div>
    <div>
        <span>Sunset</span>
        <span>{{new Date(this.currentWeather.sys.sunset * 1000).toLocaleString("en-us", {timeStyle: 'short'})}}</span>
    </div>
    <div>
        <span>Humidity</span>
        <span>{{this.currentWeather.main.humidity}}%</span>
    </div>
    <div>
        <span>Cloudness</span>
        <span>{{this.currentWeather.clouds.all}}%</span>
    </div>
    <div>
        <span>Wind</span>
        <span>{{Math.round(this.currentWeather.wind.speed)}}km/h</span>
    </div>
    <div>
        <span>Pressure</span>
        <span>{{this.currentWeather.main.pressure}} hPa</span>
    </div>
  </div>
</template>

<script>
export default {
    name: "Additional-info",
    props: ["currentWeather"],
}
</script>

<style lang="scss" scoped>

.additional-info {
    display: none;
    @media (max-width: 767px) {
        padding: 30px 20px;
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
            -ms-flex-wrap: wrap;
                flex-wrap: wrap;
        color: #fff;
        border-top: 1px solid #fff;

        > div {
            display: -webkit-box;
            display: -ms-flexbox;
            display: flex;
            -webkit-box-orient: vertical;
            -webkit-box-direction: normal;
                -ms-flex-direction: column;
                    flex-direction: column;
                -ms-flex-preferred-size: 50%;
                flex-basis: 50%;

            &:nth-last-child(n+3) {
                margin-bottom: 20px;
            }

            span:nth-child(1) {
                font-size: 12px;
                margin-bottom: 10px;
            }
            span:nth-child(2) {
                font-weight: 600;
            }
        }
    }
}

</style>