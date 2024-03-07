<template>
    <div :class="{ error: Vdata.length }">
      <slot></slot>
      <div class="input-errors" v-for="error of Vdata" :key="error.$uid">
        <div class="error-msg">{{ error.$message }}</div>
      </div>
    </div>
  </template>
  <script lang="ts">
  import { defineComponent } from "vue";
  export default defineComponent({
    props: {
      Vdata: {
        type: [Object, Array],
        required: true,
      },
    },
  });
  </script>
  
  <style scoped>
.input-errors .error-msg {
  color: red;
  font-weight: bold;
}

</style>