import Vue from 'vue'
import axios from 'axios'

import App from './App'
import router from './router'
import store from './store'

// bootstrap
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import Modal from 'bootstrap-vue/es/components/modal/modal'
import Form from 'bootstrap-vue/es/components/form/form'
import Alert from 'bootstrap-vue/es/components/alert/alert'

Vue.use(Modal)
Vue.use(BootstrapVue)
Vue.use(Alert)

if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.http = Vue.prototype.$http = axios
Vue.config.productionTip = false

Vue.component({
  Modal,
  Form
})

/* eslint-disable no-new */
new Vue({
  components: { App },
  router,
  store,
  template: '<App/>',
  data () {
    return {
      users: null,
      posts: null
    }
  },
  mounted () {

    // users
    axios
      .get('https://my-json-server.typicode.com/ellymurillo/fakedbs/users')
        .then(response => (this.users = response))
        .then(() => {
          store.commit("getUsers", this.users.data)
        })

    axios
      .get('https://my-json-server.typicode.com/ellymurillo/fakedbs/posts')
        .then(response => (this.posts = response))
        .then(() => {
          store.commit("getPosts", this.posts.data)
        })

  }
}).$mount('#app')
