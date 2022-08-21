<template>
  <div class="main">
    <div v-if="isLoading" class="loading" :class="{'theme-bright': lightMode}">
      <span class="loader"></span>
    </div>
    <div v-else class="app">
      <Modal v-if="modalOpen" v-on:close-modal="toggleModal" v-bind:APIkey="APIkey" :cities="cities" />
      <Navigation v-on:add-city="toggleModal" v-on:remove-city="toggleRemove" v-on:toggle-light-mode="toggleLightMode" v-bind:lightMode="lightMode" :homepageActive="homepageActive" :isDay="isDay" :isNight="isNight" />
      <router-view :isDay="isDay" :isNight="isNight" v-bind:cities="cities" v-bind:remove="remove" v-bind:lightMode="lightMode" v-bind:APIkey="APIkey" v-on:is-day="dayTime" v-on:is-night="nightTime" v-on:resetDays="resetDays" v-on:add-city="toggleModal" />
    </div>
  </div>
</template>

<script>
import axios from "axios"
import db from "./firebase/firebaseinit";
import Navigation from "./components/Navigation.vue";
import Modal from "./components/Modal.vue";
export default {
  name: "App",
  components: {
    Navigation,
    Modal
  },
  data() {
    return {
      isDay: null,
      isNight: null,
      APIkey: "76f7d57e80d9f34c664f6ec854610fa5",
      cities: [],
      modalOpen: null,
      remove: null,
      homepageActive: null,
      isLoading: true,
      lightMode: false,
    }
  },
  created() {
    this.getCityInfo();
    this.checkRoute();
    this.lightMode = JSON.parse(localStorage.getItem("lightMode"));
  },
  methods: {
    getCityInfo() {
      let firebaseDB = db.collection("cities");
      firebaseDB.onSnapshot((snap) => {
        if(snap.docs.length === 0) {
          this.isLoading = false;
        }
        snap.docChanges().forEach(async (doc) => {
          if (doc.type === "added" && !doc.doc.Nd) {
            try{
              const response = await axios.get(
                `https://api.openweathermap.org/data/2.5/weather?q=${doc.doc.data().city}&units=metric&appid=${this.APIkey}`);
                const data = response.data;
                firebaseDB.doc(doc.doc.id).update({
                  currentWeather: data,
                }).then(() => {
                  this.cities.push(doc.doc.data());
                  this.isLoading = false;
                })
            }
            catch(error){
              console.log(error);
            }
          } else if(doc.type === "added" && doc.doc.Nd) {
            this.cities.push(doc.doc.data());
          } else if(doc.type === "removed") {
            this.cities = this.cities.filter(city => city.city !== doc.doc.data().city);
          }
        });
      })
    },
    toggleModal() {
      this.modalOpen = !this.modalOpen;
    },
    toggleLightMode() {
      this.lightMode = !this.lightMode;
      localStorage.setItem("lightMode", JSON.stringify(this.lightMode));
    },
    toggleRemove() {
      this.remove = !this.remove;
    },
    checkRoute() {
      if(this.$route.name === "Home") {
        this.homepageActive = true;
      }
      else {
        this.homepageActive = false;
      }
    },
    dayTime() {
      this.isDay = !this.isDay;
    },
    nightTime() {
      this.isNight = !this.isNight;
    },
    resetDays() {
      this.isDay = false;
      this.isNight = false;
    }
  },
  watch: {
    $route() {
      this.checkRoute();
    },
  },
};
</script>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Open Sans', sans-serif;
}

.day {
    transition: 500ms ease all;
    background-color: #3b96f9;
    box-shadow: rgba(0, 0, 0, 0.1) 0 1px 0 0, rgba(0, 0, 0, 0.06) 0 1px 2px 0;
}

.night {
    transition: 500ms ease all;
    background-color: #142a5f;
    box-shadow: rgba(0, 0, 0, 0.1) 0 1px 0 0, rgba(0, 0, 0, 0.06) 0 1px 2px 0;
}

.main {
  height: 100vh;
  margin: 0 auto;
  .container {
    padding: 0 20px;
  } 
}

.loading {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    height: 100%;
    width: 100%;
    background-color: #0e1b28;
    -webkit-box-pack: center;
        -ms-flex-pack: center;
            justify-content: center;
    -webkit-box-align: center;
        -ms-flex-align: center;
            align-items: center;

  &.theme-bright {
    background-color: #3b96f9;
    .loader {
      background: #fff;
    }
    .loader::before {
      background: #fff;
    }
    .loader::after {
      background: #3b96f9;
    }
  }
  .loader {
    width: 48px;
    height: 48px;
    background: #fff712;
    display: block;
    margin: 20px auto;
    position: relative;
    box-sizing: border-box;
    animation: rotationBack 1s ease-in-out infinite reverse;
  }
  .loader::before {
    content: '';  
    box-sizing: border-box;
    left: 0;
    top: 0;
    transform: rotate(45deg);
    position: absolute;
    width: 48px;
    height: 48px;
    background: #fff712;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.15);
  }
  .loader::after {
    content: '';  
    box-sizing: border-box;
    width: 32px;
    height: 32px;
    border-radius: 50%;
    position: absolute;
    left: 50%;
    top: 50%;
    background: #fff712;
    transform: translate(-50%, -50%);
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.15);
  }
  @keyframes rotationBack {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(-360deg);
    }
  }
}
</style>
