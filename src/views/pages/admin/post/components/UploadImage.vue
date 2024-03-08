<script setup lang="ts">
import { successMsg } from '@/helper/ToastNotification'
import { postWithFormDataType, selectImage } from '@/helper/upload-image'
import { closeModal } from '@/helper/util'
import { APP } from '@/shared/App'
import { ref } from 'vue'


 const props=defineProps<{
  postId: number
}>()




const emit = defineEmits<{
  (e: "refreshPostTable"): void;
}>();

const image = ref('')

const style = ref({ height: '75px' })

function onImageChange(e: any) {
  image.value = selectImage(e, 'output')
}

function uploadFile() {
  const requestOptions: any = postWithFormDataType(
    [{ fieldName: 'postId', fieldValue: props.postId.toString() }],
    image.value
  )

  fetch(`${APP.apiURL}/posts/image`, requestOptions)
    .then((res) => res.json())
    .then((data) => {
      console.log(data)
      successMsg(data.message)

      const photoInput = document.querySelector("#photo_input") as HTMLInputElement;
      const source = document.querySelector("#output") as HTMLInputElement;
      photoInput.value = "";
      source.src = "";
      closeModal('uploadPostImage')
      emit('refreshPostTable')
    })
    .catch((error) => console.log(error))
}
</script>
<template>
  <div id="uploadPostImage" class="modal fade" role="dialog" arial-modal="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h4 class="modal-title">Upload Image</h4>
        </div>
        <div class="modal-body">
          <span id="form_result"></span>
          <form
            method="post"
            id="sample_form"
            class="form-horizontal"
            enctype="multipart/form-data"
            autocomplete="off"
            @submit.prevent="uploadFile"
          >
            <span id="form_result"></span>

            <div class="form-group">
              <div class="row">
                <label class="col-md-4">Image : </label>
                <div class="col-md-8">
                  <img :style="{ height: style.height }" id="output" />
                  <br />
                  <input
                    type="file"
                    id="photo_input"
                    @change="onImageChange"
                    required
                    accept=".jpg, .jpeg, .png, .gif, .bmp"
                  />
                </div>
              </div>
            </div>

            <br /><br /><br />
            <br />
            <div class="form-group" align="right">
              <button
                type="button"
                class="btn btn-outline-secondary"
                data-dismiss="modal"
                @click="closeModal('uploadPostImage')"
              >
                Fermer
              </button>
              <button
                name="action_button"
                id="action_button"
                class="btn btn-primary"
              >Upload</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

