<template>
        <Main>
            <DataTable v-if="showTable == 'users'" width="100%">
                <thead>
                    <tr>
                        <td class="text-left" colspan="100">Users</td>
                    </tr>
                    <tr>
                        <td class="with-actions">Name</td>
                        <td>User name</td>
                        <td>Email</td>
                        <td>City</td>
                        <td>Street</td>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="user in users">
                        <td class="with-actions">
                            <input type="checkbox">

                            {{user.name}}
                            
                            <div>
                                <a v-on:click="editUser(user.id)" title="edit" v-b-modal.userModal>Edit</a>|<a v-on:click="deleteUser(user.id)" title="delete">Delete</a>
                            </div>
                        </td>
                        <td>{{user.username}}</td>
                        <td>{{user.email}}</td>
                        <td>{{user.city}}</td>
                        <td>{{user.street}}</td>
                    </tr>
                </tbody>
            </DataTable>
            <DataTable v-else-if="showTable == 'userposts'" width="100%">
                <thead>
                    <tr>
                        <td class="text-left" colspan="100">User Posts</td>
                    </tr>
                    <tr>
                        <td width="50%">Title</td>
                        <td width="50%">Description</td>
                    </tr>
                </thead>
                <tbody v-if="userPosts.length > 0">
                    <tr v-for="post in userPosts">
                        <td width="50%">{{ post.title }}</td>
                        <td width="50%">{{ post.description }}</td>
                    </tr>
                </tbody>
                <tbody v-else>
                    <tr><td colspan="100">Posts not found for this user.</td></tr>
                </tbody>
            </DataTable>
            <DataTable v-else-if="showTable == 'comments'" width="100%">
                <thead>
                    <tr>
                        <td class="text-left" colspan="100">Comments</td>
                    </tr>
                    <tr>
                        <td width="50%">Author</td>
                        <td width="50%">Comment</td>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="comment in comments">
                        <td width="50%">{{ getAuthor(comment.userID) }}</td>
                        <td width="50%">{{ comment.comment }}</td>
                    </tr>
                </tbody>
            </DataTable>
            <DataTable v-else width="100%">
                <thead>
                    <tr>
                        <td class="text-left" colspan="100">Posts</td>
                    </tr>
                    <tr>
                        <td width="25%">Title</td>
                        <td width="25%">Description</td>
                        <td width="25%">Author</td>
                        <td width="25%">Actions</td>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="post in posts">
                        <td width="25%">{{ post.title }}</td>
                        <td width="25%">{{ post.description }}</td>
                        <td width="25%">{{ getAuthor(post.userID) }}</td>
                        <td width="25%">
                            <a v-on:click="editPost(post.id)" v-b-modal.postModal>Edit</a>|<a v-on:click="deletePost(post.id)">Delete</a>
                        </td>
                    </tr>
                </tbody>
            </DataTable>
        </Main>
</template>

<script>
    import store from '../store'
    import { Main, DataTable } from '@/assets/styles'

    export default {
        name: 'main-content',
        components: { Main, DataTable },
        props: [
            'posts', 
            'users', 
            'userPosts',
            'showTable',
            'comments'
        ],
        methods: {
            editUser (userID) {
                this.$emit('editUser', userID)
            },
            deleteUser (userID) {
                this.$emit('deleteUser', userID)
            },
            editPost (postID) {
                this.$emit('editPost', postID)
            },
            deletePost (postID) {
                this.$emit('deletePost', postID)
            },
            getAuthor(authorID) {
                var authorName = store.state.users.filter(user => user.id == authorID)[0].name
                return authorName
            }
        }
    }
</script>