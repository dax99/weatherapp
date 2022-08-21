<template>
    <div class="current-weather">
        <div class="container">
            <div class="weather-info">
                <span class="city">{{this.currentWeather.name}}</span>
                <span class="current-temperature">{{Math.round(this.currentWeather.main.temp)}}&deg;</span>
                <span class="feels-like">Feels like {{Math.round(this.currentWeather.main.feels_like)}}&deg;</span>
            
                <div class="high-low-temperatures">
                    <div class="high">
                        <i class="fas fa-chevron-up"></i>
                        <span>{{Math.round(this.currentWeather.main.temp_max)}}&deg;</span>
                    </div>
                    <div class="low">
                        <i class="fas fa-chevron-down"></i>
                        <span>{{Math.round(this.currentWeather.main.temp_min)}}&deg;</span>
                    </div>
                </div>
                <img class="current-condition-img" :src="require(`../../public/conditions/${this.currentWeather.weather[0].icon}.svg`)" alt="weather icon" />
                <span class="condition">{{this.currentWeather.weather[0].description}}</span>
            </div>
            <div class="weather-icon">
                <img v-if="isDay" src="../../public/sun.png" alt="sun" />
                <img v-if="isNight" src="../../public/moon.png" alt="moon" />
            </div>

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
            <div></div>
        </div>
    </div>
</template>

<script>
export default {
    name: "CurrentWeather",
    props: ["isDay", "isNight", "currentWeather"],
};
</script>

<style lang="scss" scoped>
.current-weather {
    margin-top: 90px;
    border-bottom: 1px solid #fff;

    .container {
        margin: 30px 0;
        min-height: 366px;
        position: relative;
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-pack: justify;
            -ms-flex-pack: justify;
                justify-content: space-between;
        color: #fff;
    }

    span {
        display: block;
    }

    .weather-info {
        padding-top: 30px;
        z-index: 4;

        .city {
            font-size: 24px;
            font-weight: 500;
        }

        .current-temperature {
            margin-top: 40px;
            font-size: 80px;
            font-weight: 600;
        }

        .current-condition-img {
            width: 40px;
            height: auto;
            margin: 60px 0 8px 0;
        }
    }

    .high-low-temperatures {
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;

        .high,
        .low {
            display: -webkit-box;
            display: -ms-flexbox;
            display: flex;
            i {
                margin-right: 5px;
            }
        }
        .high {
            margin-right: 15px;
        }

    }

    .condition {
        text-transform: capitalize;
        font-size: 1.1em;
    }

    .feels-like {
        font-size: 1em;
        margin-bottom: 15px;
    }

    .weather-icon {
        height: 100%;
        position: absolute;
        right: -180px;
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-align: center;
            -ms-flex-align: center;
                align-items: center;
        img {
            width: 366px;
            height: 366px;
        }
    }

    .additional-info {
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        -ms-flex-wrap: wrap;
            flex-wrap: wrap;
        color: #fff;

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
            margin-bottom: 20px;

            span:nth-child(1) {
                font-size: 12px;
                margin-bottom: 8px;
            }
            span:nth-child(2) {
                font-weight: 600;
            }
        }

        div:nth-child(5),
        div:nth-child(6) {
            margin-bottom: 0;
        }
        @media (max-width: 767px) {
            display: none;
        }
    }
}
</style>