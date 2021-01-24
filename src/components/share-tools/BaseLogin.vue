<template>
    <div class="flex justify-center items-center h-screen px-5">
        <div class="card p-16 flex justify-center items-center flex-col w-full md:w-3/5 lg:w-2/5 rounded-lg">
            <h2 class="text-gray-900 font-bold mb-5 text-md text-center">Welcome! <br /> Please login to get access to the chat.</h2>
            <button class="py-2 px-4 flex justify-center items-center w-full font-medium text-md tracking-wider text-gray-900 rounded-md bg-green-400 shadow-md focus:outline-none hover:bg-green-300 transition duration-300" v-if="!isLogin" @click="login">
                <img class="w-6 mr-2" src="@/assets/imgs/search.svg" alt="google" /> Login
            </button>
        </div>
    </div>
</template>

<script>
import {mapActions, mapState} from 'vuex';

export default {
    name: 'BaseLogin',
    methods: {
        login() {
            this.userLogin();
        },
        ...mapActions({
            userLogin:'userMod/setUser',
        })
    },
    computed: {
        ...mapState('userMod', {
            isLogin: state => state.user
        }),
    }
}
</script>