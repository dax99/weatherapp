<template>
  <div class="daily-foercast">
    <div>
        <span>{{new Date(this.day.dt * 1000).toLocaleString("en-us", {weekday: "long"})}}</span>
    </div>
    <div class="condition">
        <img :src="require(`../../public/conditions/${this.day.weather[0].icon}.svg`)" :alt="`Weather icon for ${this.day.weather[0].description} ${index}`">
    </div>
    <div class="weather">
        <i class="fas fa-chevron-up"></i> <span class="high">{{Math.round(this.day.temp.max)}}&deg;</span>
        <i class="fas fa-chevron-down"></i> <span class="low">{{Math.round(this.day.temp.min)}}&deg;</span>
    </div>
  </div>
</template>

<script>
export default {
    name: "dailyForecast",
    props: ["day", "index"],
}
</script>

<style lang="scss" scoped>

.daily-foercast {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
        -ms-flex-align: center;
            align-items: center;
    -webkit-box-pack: justify;
        -ms-flex-pack: justify;
            justify-content: space-between;
    color: #fff;

    div {
        flex: 1;
    }

    .condition {
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-align: center;
            -ms-flex-align: center;
                align-items: center;
        -webkit-box-pack: center;
            -ms-flex-pack: center;
                justify-content: center;

        img {
            width: 20px;
        }
    }

    .weather {
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-pack: end;
            -ms-flex-pack: end;
                justify-content: flex-end;

        span {
            min-width: 20px;
        }
        
        i {
            margin-right: 10px;
        }

        .high {
            margin-right: 18px;
        }
    }
}

</style>