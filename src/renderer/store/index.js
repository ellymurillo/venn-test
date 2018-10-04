import Vue from 'vue'
import Vuex from 'vuex'

import modules from './modules'

Vue.use(Vuex)

export default new Vuex.Store({
  modules,
  state: {
    users: null,
    posts: null
  },
  strict: process.env.NODE_ENV !== 'production',
  mutations: {
    getUsers(state, users) {
      state.users = users
    },
    getPosts (state, posts) {
      state.posts = posts
    },
    addUser (state, user) {
      state.users.push(user)
    },
    removeUser (state, userID) {
      state.users.some((item, index) => {
        if(item.id === userID) {
          state.users.splice(index, 1)
        } 
      })
    },
    updateUser(state, params) {
      state.users.some((item, index) => {
        if(item.id === params.userID) {
          state.users[index].name = params.values.name
          state.users[index].username = params.values.username
          state.users[index].email = params.values.email
          state.users[index].city = params.values.city
          state.users[index].street = params.values.street
        }
      })
    },
    addPost(state, post) {
      state.posts.push(post)
    },
    removePost (state, postID) {
      state.posts.some((item, index) => {
        if(item.id === postID) {
          state.posts.splice(index, 1)
        } 
      })
    },
    updatePost(state, params) {
      state.posts.some((item, index) => {
        if(item.id === params.postID) {
          state.posts[index].userID = params.values.userID
          state.posts[index].title = params.values.title
          state.posts[index].description = params.values.description
        }
      })
    }
  }
})
