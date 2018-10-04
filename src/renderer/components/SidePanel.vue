<template>
    <Aside>
        <Search placeholder="Search" v-model="findUser" />
        <Icon v-on:click="showAllUsers">Users</Icon>
        <SideListing v-if="searchedUsers && searchedUsers.length > 0">
            <li v-for="user in searchedUsers">
                <a v-on:click="showUserPosts(user.id)">
                    {{ user.name }}
                </a>
            </li>
        </SideListing>
        <SideListing v-else-if="findUser != '' && searchedUsers && searchedUsers.length == 0">
            <div>Username not found..</div>
        </SideListing>
        <SideListing class="users" v-else>
           <li v-for="user in users">
               <a v-on:click="showUserPosts(user.id)">
                   {{ user.name }}
                </a>
            </li>
        </SideListing>
        
        <hRule />
        
        <Search placeholder="Search" v-model="findPost" />
        <Icon v-on:click="showAllPosts">Posts</Icon>
        <SideListing v-if="searchedPosts && searchedPosts.length > 0">
            <li v-for="post in searchedPosts">
                <a v-on:click="showComments(post.id)">
                    {{ post.title }}
                </a>
            </li>
        </SideListing>
        <SideListing v-else-if="findPost != '' && searchedPosts && searchedPosts.length == 0">
            <div>Post not found..</div>
        </SideListing>
        <SideListing v-else>
            <li v-for="post in posts">
                <a v-on:click="showComments(post.id)">
                    {{ post.title }}
                </a>
            </li>
        </SideListing>
    </Aside> 
</template>

<script>
    import _ from 'lodash'
    import axios from 'axios'
    import store from '../store'
    import {Aside, Search, Icon, SideListing, hRule} from '@/assets/styles'

    export default {
        name: 'side-bar',
        components: {Aside, Search, Icon, SideListing, hRule},
        data () {
           return {
               findUser: null,
               findPost: null,
               searchedUsers: null,
               searchedPosts: null,
               userPosts: null,
           }
        },
        props: ['users', 'posts'],
        watch: {
            findUser: function () {
                this.debounceSearchUser.call(this)
            },
            findPost: function () {
                this.debounceSearchPost.call(this)
            }
        },
        created () {
            this.debounceSearchUser = _.debounce(this.debounceSearchUser, 1000)
            this.debounceSearchPost= _.debounce(this.debounceSearchPost, 1000)
        },
        methods: {
            debounceSearchUser () {
                axios
                    .get('https://my-json-server.typicode.com/ellymurillo/fakedbs/users?username=' + this.findUser )
                        .then((response) => {
                            const localUsers = store.state.users.filter(user => (user.username == this.findUser))
                            
                            if(localUsers.length > 0 || this.searchedUsers != null) {
                                this.searchedUsers = localUsers
                            } else {                               
                                this.searchedUsers  = response.data
                            }
                        })
            },
            debounceSearchPost () {
                axios
                    .get('https://my-json-server.typicode.com/ellymurillo/fakedbs/posts?title=' + this.findPost )
                        .then((response) => {
                            const localPosts = store.state.posts.filter(post => (post.title == this.findPost))
                            
                            if(localPosts.length > 0 || this.searchedPosts != null) {
                                this.searchedPosts = localPosts
                            } else {
                                this.searchedPosts = response.data
                            }

                        })
            },
            showUserPosts (userID) {
                axios
                    .get('https://my-json-server.typicode.com/ellymurillo/fakedbs/posts?userID=' + userID )
                        .then((response) => {
                            const localPosts = store.state.posts.filter(post => (post.userID == userID))

                            if(localPosts.length > 0 || this.userPosts != null) {
                                this.userPosts = localPosts
                            } else {
                                this.userPosts = response.data
                            }
                        })
                        .then(() => {
                            this.$emit('showUserPosts', this.userPosts)
                        })
            },
            showComments (postID) {
                var comments = store.state.posts.filter(post => post.id == postID)[0].comments
                this.$emit('showComments', comments)
            },
            showAllUsers () {
                this.$emit('showAllUsers')
            }, 
            showAllPosts () {
                this.$emit('showAllPosts')
            }
        }
    }
</script>