import { db } from "@/firebase.js";

export default {
    namespaced: true,
    state: {
        messages: [],
    },
    mutations: {
        mtnMessages(state, n) {
            state.messages = n;
        },
    },
    actions: {
        addMessage:({dispatch}, data) => {
            db.collection('messages').add(data)
            .then(() => {
                console.log('success');
                dispatch('getMessages', data)
            })
            .catch((err) => {
                console.log(err);
            });
        },
        getMessages:({commit}) => {
            db.collection('messages').orderBy('createdAt').onSnapshot((query) => {
                let messages = query.docs.map(doc => doc.data());
                console.log(messages);
                commit('mtnMessages', messages);
            });
        },
    },
    getters: {
    }
}