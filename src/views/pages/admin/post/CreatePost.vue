<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import Error from '@/components/Error.vue'
import BaseBtn from '@/components/BaseBtn.vue'

import { reactive, ref } from 'vue'
import useVuelidate from '@vuelidate/core'
import { required, email } from '@vuelidate/validators'
import { createPost } from './actions/createPost'
import type { ICreatePostInput } from './admin-types'
import { showError, successMsg } from '@/helper/ToastNotification'

const postInput = ref<ICreatePostInput>({
  title: '',
  post_content: ''
})

const rules = {
  title: { required },
  post_content: { required }
}

const loadingStatus = ref(false)

const v$ = useVuelidate(rules, postInput)

async function savePost() {

  const result = await v$.value.$validate()
    if (!result) return

  try {
    loadingStatus.value=true

    const data = await createPost(postInput.value)
    postInput.value={} as ICreatePostInput
    loadingStatus.value=false
    v$.value.$reset()
    successMsg(data.message)
  } catch (error) {
    console.log('error on call',error)
    loadingStatus.value = false
    for (const message of error as string[]) {
      showError(message)
    }
  }
}
</script>

<template>
  <div class="row">
    
    <div class="col-md-4">
      <br/>
      <h3>Post page</h3>
      <form action="" @submit.prevent="savePost">
        <div class="form-group">
          <label for="">Post Title</label>

          <Error :Vdata="v$.title.$errors">
            <input
              type="text"
              @blur="v$.title.$touch"
              placeholder=""
              v-model="postInput.title"
              class="form-control"
              name="title"
            />
          </Error>
        </div>
        <div class="form-group mb-2">
          <label for="">Content</label>

          <Error :Vdata="v$.title.$errors">
            <textarea
              name="content"
              @blur="v$.postContent.$touch"
              v-model="postInput.post_content"
              class="form-control"
              cols="10"
              rows="5"
            ></textarea>
          </Error>
        </div>
        <br />
        <RouterLink to="/list-posts">See Posts</RouterLink>
        <br />
        <div class="form-group" style="float: right">
           <BaseBtn
              class="btn w-100 btn-primary btn-block"
              :loading="loadingStatus"
              btnName="Create New Post"
            />
        </div>
      </form>
    </div>
  </div>
</template>
