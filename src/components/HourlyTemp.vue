<template>
    <div class="hour">
        <span>{{new Date(this.time.dt * 1000).toLocaleString('en-us', {hour: 'numeric'})}}</span>
        <span>
            <img :src="require(`../../public/conditions/${this.time.weather[0].icon}.svg`)" :alt="`Weather icon for ${this.time.weather[0].description} ${index}`"  />
        </span>
        <span>{{Math.round(this.time.temp)}}&deg;</span>
    </div>
</template>

<script>
export default {
    name: "HourlyTemp",
    props: ["time", "index"],
};
</script>

<style lang="scss" scoped>

.hour {
    color: #fff;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
        -ms-flex-direction: column;
            flex-direction: column;
    text-align: center;
    min-width: 47px;
    margin-right: 30px;
}

img {
    width: auto;
    height: 20px;
    display: block;
}

span {
    display: block;
    align-self: center;
}
span:nth-child(-n + 2) {
    margin-bottom: 10px;
}

</style>