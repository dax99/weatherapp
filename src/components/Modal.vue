<template>
  <div @click="closeModal" class="modal" ref="modal">
      <div class="modal-wrap" ref="modalWrap">
          <label for="city-name">Enter Location</label>
          <input type="text" name="city-name" placeholder="Enter The City Name" v-model="city" />
          <button @click="addCity">Add</button>
      </div>
  </div>
</template>

<script>
import axios from "axios"
import db from "../firebase/firebaseinit";
import Swal from 'sweetalert2';
export default {
    name: "modal",
    props: ['APIkey', 'cities'],
    data() {
        return {
            city: "",
        };
    },
    methods: {
        closeModal(e) {
            if(e.target === this.$refs.modal) {
                this.$emit("close-modal");
            }
        },
        async addCity() {
            if(this.city === "") {
                Swal.fire({
                title: 'Error!',
                text: 'Please enter the city name!',
                icon: 'error',
                background: 'rgb(12 25 44)',
                showCloseButton: true,
                color: '#fff',
                confirmButtonText: 'OK',
                confirmButtonColor: "rgb(193 78 78)",
                confirmButtonClass: 'custom-button-error',
                });
            }
            else if(this.cities.some((res) => res.city === this.city.toLowerCase())) {
                Swal.fire({
                title: 'Error!',
                text: `${this.city} already exists!`,
                icon: 'error',
                background: 'rgb(12 25 44)',
                showCloseButton: true,
                color: '#fff',
                confirmButtonText: 'OK',
                confirmButtonColor: "rgb(193 78 78)",
                confirmButtonClass: 'custom-button-error',
                });
                
            } else {
                try {
                    const res = await axios.get(
                        `https://api.openweathermap.org/data/2.5/weather?q=${this.city}&units=metric&appid=${this.APIkey}`
                    );
                    const data = await res.data;
                    db.collection("cities").doc().set({
                        city: this.city.toLowerCase(),
                        currentWeather: data,
                    }).then(() => {
                        this.$emit("close-modal");
                    });
                }
                catch {
                    Swal.fire({
                    title: 'Error!',
                    text: `${this.city} does not exist.`,
                    icon: 'error',
                    background: 'rgb(12 25 44)',
                    showCloseButton: true,
                    color: '#fff',
                    confirmButtonText: 'OK',
                    confirmButtonColor: "rgb(193 78 78)",
                    confirmButtonClass: 'custom-button-error',
                    });
                }
            }
        },
    },
};
</script>

<style lang="scss" scoped>

.modal {


    width: 100%;
    height: 100%;
    position: fixed;
    z-index: 101;
    background-color: rgba(0, 0, 0, 0.5);
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
            justify-content: center;
    -webkit-box-align: center;
    -ms-flex-align: center;
            align-items: center;

    label {
        color: #fff;
    }

    .modal-wrap {
        max-width: 450px;
        border-radius: 8px;
        width: 80%;
        padding: 20px;
        background-color: #0e1b28;

        input {
            color: #fff;
            border: none;
            background-color: transparent;
            border-bottom: 1px solid #fff;
            padding: 6px 4px;
            margin: 10px 0 20px;
            width: 100%;

            &:focus {
                outline: none;
            }
        }

        button {
            background-color: #222325;
            color: #fff;
            padding: 6px 20px;
            border-radius: 8px;
            border: none;
        }
    }
}
</style>