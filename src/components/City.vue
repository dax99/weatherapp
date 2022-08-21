<template>
  <div @click="goToWeather" class="city">
    <i v-if="remove" @click="removeCity" class="far fa-trash-alt remove" ref="remove"></i>
    <span class="city-name">{{this.city.city}}</span>
    <div class="weather">
        <span>{{Math.round(this.city.currentWeather.main.temp)}}&deg;</span>
        <img :src="require(`../../public/conditions/${this.city.currentWeather.weather[0].icon}.svg`)" :alt="`Weather icon for ${this.city.currentWeather.weather[0].description}`" />
    </div>
    <div class="background-image">        
        <img :src="require(`../../public/backgrounds/${this.city.currentWeather.weather[0].icon}.jpg`)" :alt="`${this.city.currentWeather.weather[0].description}`" />
        <div class="bg-overlay">

        </div>
    </div>
    
  </div>
</template>

<script>
import db from "../firebase/firebaseinit.js"
export default {
    name: "city",
    props: ['city', 'remove'],
    created() { },
    data() {
        return {
            id: null,
        }
    },
    methods: {
        removeCity() {
            db.collection('cities').where('city', '==', `${this.city.city}`).get().then(docs => {
                docs.forEach(doc => {
                    this.id = doc.id;
                });
            }).then(() => {
                db.collection('cities').doc(this.id).delete();
            });
        },
        goToWeather(e) {
            if(e.target === this.$refs.remove) {
                //
            }
            else {
                this.$router.push({name: "Weather", params: {city: this.city.city}})
            }
        }
    },
};
</script>

<style lang="scss" scoped>
    .city {
        display: flex;
        position: relative;
        -webkit-box-orient: vertical;
        -webkit-box-direction: normal;
            -ms-flex-direction: column;
                flex-direction: column;
        -webkit-box-align: center;
        -ms-flex-align: center;
            align-items: center;
        padding: 20px;
        flex-basis: 50%;
        min-height: 250px;
        color: #fff;

        .remove {
            border-radius: 0 15px 0 0;
            border: 10px solid rgb(77, 77, 77);
            background-color: rgb(77, 77, 77);
            z-index: 1;
            font-size: 20px;
            position: absolute;
            bottom: 0;
            left: 0;
        }

        .city-name {
            padding-top: 50px;
            font-weight: 500;
        }

        span {
            z-index: 1;
            text-transform: capitalize;
            font-size: 1.6em;
        }

        .weather {
            display: flex;
            z-index: 1;
            -webkit-box-pack: center;
            -ms-flex-pack: center;
                justify-content: center;
            -webkit-box-align: center;
                -ms-flex-align: center;
                    align-items: center;
            -webkit-box-flex: 1;
                -ms-flex: 1;
                    flex: 1;

            span {
                font-size: 1.6em;
                margin-right: 10px;
            }

            img {
                height: 25px;
                width: auto;
            }
        }

        .background-image {
            overflow: hidden;
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            
            img {
                width: 100%;
                min-height: 100%;
            }
        }


        .bg-overlay {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.2);
        }
    }
</style>