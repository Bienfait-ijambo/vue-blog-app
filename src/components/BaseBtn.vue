<script lang="ts" setup>
import Spinner from './Spinner.vue'
defineProps<{
  btnName:string
  loading: boolean
  spinnerSize: string
  disabled: boolean
}>()
</script>

<template>
  <button
    :disabled="loading"
    :loading="loading"
  >
    <span v-if="!loading">
      <!-- <i :class="`bi bi-${icon}`"></i> -->
      {{ btnName }}
    </span>

    <Spinner :spinnerSize="spinnerSize" v-else> </Spinner>
  </button>
</template>
