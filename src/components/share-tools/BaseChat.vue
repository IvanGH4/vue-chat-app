<template>
    <div class="p-4">
        <button class="py-2 px-4 flex justify-center items-center ml-auto font-medium text-md tracking-wider text-gray-100 rounded-md bg-gray-500 shadow-md focus:outline-none hover:bg-gray-400 transition duration-300" @click="logout">
            <i class="fas fa-sign-out-alt text-gray-100 mr-2"></i> Logout
        </button>

        <div class="flex justify-center items-center">
            <div class="chat-box w-full md:w-7/12 h-96 rounded-lg p-6">
                <div class="h-4/5 w-full overflow-y-auto" ref="scrollable">
                    <div v-for="(msg, idx) in msgs" :key="idx" :class="[sentOrReceived(msg.userID)]"> <!-- 'p-2': true, 'w-2/5': true, sentOrReceived(msg.userId) -->
                        <h2 class="text-green-900 text-xs">{{msg.displayName}}</h2>
                        <div class="flex justify-start items-center mb-3">
                            <img class="w-10 h-10 rounded-full mr-2" :src="msg.photoUrl" :alt="msg.displayName">
                            <p class="rounded-md px-5 py-1 bg-blue-900 text-white text-sm">{{msg.text}}</p>
                        </div>
                    </div>
                </div>
                <div class="flex justify-center items-center h-1/5">
                    <form class="w-full" @submit.prevent="sendMessage">
                        <input class="px-5 py-2 rounded-md w-3/4" type="text" placeholder="Send a message" required v-model="msg" />
                        <button class="px-5 py-2 rounded-md w-1/4 bg-blue-500 hover:bg-blue-400 focus:outline-none transition duration-300" type="submit">
                            <i class="far fa-paper-plane"></i>
                        </button>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';

export default {
    name: 'BaseChat',
    data() {
        return {
            msg: ''
        }
    },
    async mounted() {
        try {
           await this.$store.dispatch('msgMod/getMessages'); 
        } catch (error) {
            console.log(error);
        } finally {
            setTimeout(() => {
              this.$toasted.show('Welcome to the chat!', { 
                theme: "toasted-primary", 
                type: "success",
                position: "bottom-center", 
                duration : 3000,
                fullWidth: true,
            }); 
            }, 500);
        }
    },
    methods: {
        logout() {
            this.userLogout();
        },
        sendMessage() {
            try {
                this.$store.dispatch('msgMod/addMessage', {
                    'text':this.msg,
                    'displayName': this.user.displayName,
                    'photoUrl': this.user.photoURL,
                    'createdAt': Date.now(),
                    'userID': this.user.uid
                });
            } catch (error) {
                console.log(error);
            } finally {
                this.msg = '';
                let container = this.$refs.scrollable;
                setTimeout(() => {
                    container.scrollTop = container.scrollHeight; 
                }, 500); 
            }
        },
        ...mapActions({
            userLogout:'userMod/setLogOut',
        }),
        // async getMsg() {
        //     try {
        //         await this.$store.dispatch('msgMod/getMessages', this.user.uid)
        //     } catch (error) {
        //         console.log(error);
        //     }
        // },
        sentOrReceived(id) {
            return id === this.user.uid ? 'w-full flex flex-col items-end' : null
        }
    },
    computed: {
        ...mapState('userMod', {
            user: state => state.user
        }),
        ...mapState('msgMod', {
            msgs: state => state.messages,
        }),
    }
}
</script>