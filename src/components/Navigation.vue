<template>
<div class="headers-wrapper">
    <header v-if="homepageActive" class="container add-city" :class="{'theme-bright': lightMode}">
        <nav class="home">
            <img src="../../public/logo.png" alt="Zeus logo">
            <div class="right">
                <i  v-if="lightMode" @click="lightModeToggle" class="fas fa-moon" id="moon" title="Dark Mode"></i>
                <i  v-else @click="lightModeToggle" class="fas fa-sun" id="sun" title="Light Mode"></i>
                <i @click="removeCity" ref="removeCity" class="fa-solid fa-trash-can" title="Delete City"></i>
                <i @click="refreshPage" class="fa-solid fa-arrow-rotate-right" title="Refresh Page"></i>
                <i @click="addCity" class="fas fa-plus" title="Add City"></i>
            </div>
        </nav>
    </header>
    <header v-else class="container" :class="{day: isDay, night: isNight}">
        <nav>
            <router-link class="router-link" :to="{name: 'Home'}">
                <i class="fa-solid fa-angle-left"></i>
            </router-link>
            <span>
                {{ new Date().toLocaleString("en-us", { weekday: "short" }) }},
                {{ new Date().toLocaleString("en-us", { month: "short" }) }}
                {{ new Date().toLocaleString("en-us", { day: "2-digit" }) }}
            </span>
            <span>&deg; C</span>
        </nav>
    </header>
</div>
</template>

<script>
export default {
    name: "Navigation",
    // watch: {
    //     lightMode: function() {
    //         localStorage.setItem("lightMode", JSON.stringify(this.lightMode));
    //     }
    // },
    // created() {
    //     this.lightMode = JSON.parse(localStorage.getItem("lightMode"));
    // },
    props: ["homepageActive", "isDay", "isNight", "lightMode"],
    methods: {
        addCity() {
            this.$emit("add-city");
        },
        refreshPage() {
            location.reload();
        },
        removeCity() {
            this.$refs.removeCity.classList.toggle('remove-active');
            this.$emit("remove-city");
        },
        lightModeToggle() {
            this.$emit("toggle-light-mode");
        }
    }
} 
</script>

<style lang="scss" scoped>
.add-city {
    background-color: #0e1b28;
    box-shadow: rgba(0, 0, 0, 0.1) 0 1px 0 0, rgba(0, 0, 0, 0.06) 0 1px 2px 0;

    &.theme-bright {
        background-color: #3b96f9;
    }
}
header {
    position: fixed;
    z-index: 100;
    width: 100%;
    nav {
        padding: 30px 0;
        display: flex;
        color: #fff;
        -webkit-box-pack: justify;
        -ms-flex-pack: justify;
           justify-content: space-between;
    }
    nav.home {
        padding: 15px 0;
        img {
            height: 50px;
        }
    }
    .remove-active {
        color: #c71212;
    }
    .router-link {
        color: #fff;
    }
    .right {
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
            -webkit-box-align: center;
                -ms-flex-align: center;
                    align-items: center;
        i {
            font-size: 20px;
        }
        i:not(:first-child) {
            margin-left: 20px;
        }
    }
}
</style>