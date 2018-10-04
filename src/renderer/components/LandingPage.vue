<template>
  <Wrapper>
    <Header>
      <Btn v-b-modal.userModal @click="clearUser">Create User</Btn>
      <Btn v-b-modal.postModal @click="clearPost">Create Post</Btn>
    </Header>
    
    <SidePanel 
      :users="users" 
      :posts="posts" 
      v-on:showAllPosts="showPosts" 
      v-on:showAllUsers="showUsers"
      v-on:showUserPosts="showUserPost"
      v-on:showComments="showComments">
    </SidePanel>     

    <MainContent 
      :users="users"
      :posts="posts"
      :userPosts="userPosts"
      :comments="comments"
      :showTable="showTable"
      v-on:editUser="editUser" 
      v-on:deleteUser="deleteUser"
      v-on:editPost="editPost"
      v-on:deletePost="deletePost">
    </MainContent>

    <b-alert
      dismissible
      :variant="showMsg.type"
      :show="showMsg.show"
      @dismissed="showMsg.show=false">
      {{ showMsg.message }}
    </b-alert>

    <b-modal id="userModal" hide-footer :title="update ? 'Update ' + name : 'Create new user'">
      <b-form v-on:submit="submitMethod">

        <b-alert
          dismissible
          :variant="showMsg.modal.type"
          :show="showMsg.modal.show"
          @dismissed="showMsg.show=false">
          <ul v-if="showMsg.modal.message.length > 1 ">
            <li v-for="msg in showMsg.modal.message">{{ msg }}</li>
          </ul>
          <div v-else>
            {{ showMsg.modal.message[0] }}
          </div>
        </b-alert>

        <b-form-group 
          label="Name">
          <b-form-input 
            type="text"
            required
            v-model="name">
          </b-form-input>
        </b-form-group>

        <b-form-group 
          label="Username">
          <b-form-input 
            type="text"
            required
            v-model="userName">
          </b-form-input>
        </b-form-group>

        <b-form-group 
          label="Email">
          <b-form-input 
            type="email"
            required
            v-model="email">
          </b-form-input>
        </b-form-group>

        <b-form-group 
          label="City">
          <b-form-input 
            type="text"
            v-model="city">
          </b-form-input>
        </b-form-group>

        <b-form-group 
          label="Street">
          <b-form-input 
            type="text"
            v-model="street">
          </b-form-input>
        </b-form-group>

        <div class="text-right">
          <b-button type="submit" variant="primary">{{update ? 'Update' : 'Submit'}}</b-button>
          <b-button type="reset" variant="danger" v-on:click="hideModal('userModal')">Cancel</b-button>
        </div>
      </b-form>
    </b-modal>
    
    <b-modal id="postModal" hide-footer :title="update ? 'Update post' : 'Create new post'">
      <b-form v-on:submit="submitPostMethod">
        <b-form-group 
          label="Title">
          <b-form-input 
            type="text"
            required
            v-model="post.title">
          </b-form-input>
        </b-form-group>

        <b-form-group 
          label="Author">
          <b-form-select 
            v-model="post.userID"
            :options="userFilter"
            size="md">
          </b-form-select>
        </b-form-group>

        <b-form-group>
          <b-form-textarea 
            id="textarea1"
            v-model="post.description"
            placeholder="Enter something"
            :rows="3"
            :max-rows="6">
          </b-form-textarea>
        </b-form-group>

        <div class="text-right">
          <b-button type="submit" variant="primary">{{update ? 'Update' : 'Submit'}}</b-button>
          <b-button type="reset" variant="danger" v-on:click="hideModal('postModal')">Cancel</b-button>
        </div>
      </b-form>
    </b-modal>
  </Wrapper> 
</template>

<script>
  import store from '../store'
  import SidePanel from '@/components/SidePanel'
  import MainContent from '@/components/MainContent'
  import {Wrapper, Header, Btn} from '@/assets/styles'

  export default {
    name: 'landing-page',
    components: { Wrapper, Header, Btn, SidePanel, MainContent},
    computed: {
      users () {
        return store.state.users
      },
      posts () {
        return store.state.posts
      },
      userFilter () {
          var usersArr = []

          if( store.state.users ) {
            store.state.users.map((user) => {
              usersArr.push({ value: user['id'], text: user['name'] })
            })
          }   
          
          return usersArr
      }
    },
    data () {
      return {
        name: null,
        userName: null,
        email: null,
        city: null,
        street: null,
        update: false,
        selectedUserID: null,
        selectedPostID: null,
        showTable: 'users',
        userPosts: null,
        comments: null,
        showMsg: {
          show: false,
          type: 'danger',
          message: null,
          modal: {
            show: false,
            type: 'danger',
            message: []
          }
        },
        post: {
          userID: null,
          title: null,
          description: null
        }
      }
    },
    methods: {
      submitMethod (e) {
        if( this.update ) {
          return this.updateUser(this.selectedUserID)
        } else {
          return this.addUser(e)
        }
      },
      submitPostMethod (e) {
        if( this.update ) {
          return this.updatePost(this.selectedPostID)
        } else {
          return this.addPost(e)
        }
      },
      addUser (e) {
        e.preventDefault()

        // check if the username || email exists
        const usernameExists = this.checkIfDoesExist(store.state.users, 'username', this.userName)
        const emailExists = this.checkIfDoesExist(store.state.users, 'email', this.email)

        if( usernameExists || emailExists ) {

          let msgArr = []

          if(usernameExists) msgArr.push('Username has already been taken.')
          if(emailExists) msgArr.push('Email already exists!')

          this.showMsg.modal.show = true
          this.showMsg.modal.message = msgArr

        } else {
          const lastUser = store.state.users.length > 0 ? store.state.users.slice(-1)[0].id : 0
        
          const newUserID = lastUser + 1

          store.commit('addUser', {
            "id": newUserID,
            "name": this.name,
            "username": this.userName,
            "email": this.email,
            "city": this.city,
            "street": this.street
          })

          this.showMsg.type = "success"
          this.showMsg.show = true
          this.showMsg.message = "User successfuly added."

          this.hideModal('userModal')
        }

      },
      editUser(userID) {
        const selectedUser = store.state.users.filter(user => user.id === userID)
        this.name = selectedUser[0].name
        this.userName = selectedUser[0].username
        this.email = selectedUser[0].email
        this.city = selectedUser[0].city
        this.street = selectedUser[0].street

        this.update = true
        this.selectedUserID = userID
      },
      updateUser(userID) {
        store.commit('updateUser', {
          userID: userID,
          values: {
            "name": this.name,
            "username": this.userName,
            "email": this.email,
            "city": this.city,
            "street": this.street
          } 
        })

        this.hideModal('userModal')

        this.showMsg.type = "success"
        this.showMsg.show = true
        this.showMsg.message = "User successfuly updated."
      },
      clearUser () {
        this.name = null
        this.userName = null
        this.email = null
        this.city = null
        this.street = null
        this.update = false
      },
      deleteUser(userID) {

        var comments = store.state.posts.filter((post) => {
          return post.comments.filter(comment => comment.userID == userID).length > 0
        }).length

        // check if the user has posts
        if( store.state.posts.filter(post => (post.userID == userID)).length > 0 || comments.length > 0 ) {
          this.showMsg.type = "danger"
          this.showMsg.show = true
          this.showMsg.message = "Unable to delete user."
        } else {
          store.commit('removeUser', userID);

          this.showMsg.type = "info"
          this.showMsg.show = true
          this.showMsg.message = "User deleted."
        }

      },
      clearPost() {
        this.post.title = null,
        this.post.description = null,
        this.post.userID = null
        this.update = false
      },
      addPost(e) {
        e.preventDefault()

        const lastPost = store.state.posts.length > 0 ? store.state.posts.slice(-1)[0].id : 0
        
        const newPostID = lastPost + 1

        store.commit("addPost", {
          "id": newPostID,
          "userID": this.post.userID,
          "title": this.post.title,
          "description": this.post.description,
          "comments": []
        })

        this.hideModal('postModal')

        this.showMsg.show = true
        this.showMsg.type = "success"
        this.showMsg.message = "Post successfuly added."

      },
      editPost (postID) {
        const selectedPost = store.state.posts.filter(post => (post.id == postID))

        this.post.userID = selectedPost[0].userID
        this.post.title = selectedPost[0].title
        this.post.description = selectedPost[0].description

        this.update = true
        this.selectedPostID = postID
      },
      updatePost (postID) {
        store.commit("updatePost", {
          postID: postID,
          values: {
            "userID": this.post.userID,
            "title": this.post.title,
            "description": this.post.description
          } 
        })

        this.hideModal('postModal')

        this.showMsg.show = true
        this.showMsg.type = "success"
        this.showMsg.message = "Post successfuly updated."
      },
      deletePost (postID) {
        store.commit("removePost", postID)

        this.showMsg.type = "info"
        this.showMsg.show = true
        this.showMsg.message = "Post deleted."
      },
      showPosts () {
        this.showTable = 'posts'
      },
      showUsers () {
        this.showTable = 'users'
      },
      showUserPost (userPosts) {
        this.userPosts = userPosts
        this.showTable = 'userposts'
      },
      showComments (comments) {
        this.comments = comments
        this.showTable = 'comments'
      },
      hideModal (modalID) {
        this.$root.$emit('bv::hide::modal', modalID)
      },
      checkIfDoesExist(object, key, value) {
        return object.filter(obj => obj[key] == value).length > 0 ? true : false
      }
    }
  }
</script>

<style>
  div[role="alert"] {
    position: absolute;
    top: 3px;
    right: 15px;
  }

  div[role="alert"] button.close {
    padding: 7px;
  }

  div[role="alert"] ul {
    padding: 0;
    margin: 0;
  }
</style>