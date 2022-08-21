<template>
<div>
  <div v-if="cities.length === 0" class="no-cities">
    <p>No cities added, add a new one?</p>
    <button @click="addCity">Add City</button>
  </div>
  <div class="all-cities" :class="{'theme-bright': lightMode}">
    <div class="city-link" v-for="(city, index) in cities" v-bind:key="index">
      <City v-bind:city="city" v-bind:remove="remove"/>
    </div>
  </div>
</div>
</template>

<script>
import City from "../components/City"


export default {
  name: 'Home',
  props: ['cities', 'remove', 'lightMode'],
  methods: {
    addCity() {
      this.$emit("add-city");
    },
  },
  components: {
    City
  }
}
</script>

<style lang="scss" scoped>
.no-cities {
  position: absolute;
  min-height: 100vh;
  max-width: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: #fff;

  button {
    margin-top: 15px;
    border-radius: 8px;
    padding: 8px 25px;
    border: none;
    cursor: pointer;
    transition: 500ms ease all;

    &:hover {
      outline: none;
      transform: scale(0.98);
    }
    &:focus {
      outline: none;
    }
  }
}
.all-cities {
  display: grid;
  padding-top: 81px;
  background-color: #0e1b28;
  width: 100%;
  min-height: 100vh;
  grid-auto-rows: 250px;
  @media (min-width: 480px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (min-width: 768px) {
    grid-template-columns: repeat(3, 1fr);
  }

  &.theme-bright {
    background-color: #3b96f9;
  }
}
</style>