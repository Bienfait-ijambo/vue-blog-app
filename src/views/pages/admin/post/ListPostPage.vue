<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { RouterLink, RouterView } from 'vue-router'
import { getPosts } from './actions/getPosts'
import type { IPost } from './admin-types'
import { _debounce } from '@/helper/util'
// import HelloWorld from './components/HelloWorld.vue'
import Pagination from '@/components/pagination/LaravelVuePagination.vue'
import { Alert } from '@/helper/SweetAlert'
import { deletePost } from './actions/deletePost'
import { showError } from '@/helper/ToastNotification'

const posts = ref<any>([])
const query = ref<string>('')
const loadingStatus = ref(false)

const search = _debounce(async function () {
  showPosts(1, query.value)
}, 300)

async function showPosts(page: number = 1, query: string = '') {
  try {
    loadingStatus.value = true
    const data = await getPosts(page, query)
    posts.value = data as any
    loadingStatus.value = false
  } catch (error) {
    console.log(error)
    if (error instanceof Error) {
      showError(error.message)
    }
  }
}

function removePost(id: number) {
  Alert.confirmMsg().then(async ({ data }) => {
    await deletePost(id)
    showPosts()
  })
}

onMounted(async () => {
  showPosts()
})
</script>

<template>
  <div class="row">
    <div class="col-md-6">
      <h3>List post</h3>
      <br />
      <br />
      <br />
      <div class="card">
        <div class="card-header">
          Posts
          <RouterLink to="/posts" style="float: right" class="btn btn-primary">
            <b>+</b> New Post</RouterLink
          >
        </div>
        <div class="card-body">
          <div class="row mb-2">
            <div class="col-md-4">
              <input
                type="text"
                @keydown="search"
                v-model="query"
                class="form-control"
                placeholder="search..."
              />
              <span v-if="loadingStatus" style="color: blue;"> <b>Loading.....</b> </span>
            </div>
          </div>

          <table class="table table-striped table-bordered table-hover">
            <thead>
              <tr>
                <td>ID</td>
                <td>Post title</td>
                <td>Post content</td>

                <td>Update</td>
                <td>Delete</td>
              </tr>
            </thead>

            <tbody v-for="post in posts?.data" :key="post.id">
              <tr>
                <td>{{ post.id }}</td>
                <td>{{ post.title }}</td>
                <td>{{ post.post_content }}</td>

                <td><button class="btn btn-outline-primary btn-sm">Update</button></td>
                <td>
                  <button class="btn btn-outline-danger btn-sm" @click="removePost(post.id)">
                    Delete
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <Pagination :data="posts" @pagination-change-page="showPosts" />
    </div>
  </div>
</template>
