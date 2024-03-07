<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import Error from '@/components/Error.vue'
import BaseBtn from '@/components/BaseBtn.vue'

import { reactive, ref } from 'vue'
import useVuelidate from '@vuelidate/core'
import { required, email } from '@vuelidate/validators'
import type { ILoginUserInput, IRegisterInput } from './auth-types'
import { loginUser } from './actions/LoginUser'
import { showError } from '@/helper/ToastNotification'
import { isError } from '@/helper/types'

const loginUserInput = ref<ILoginUserInput>({
  email: '',
  password: ''
})

const rules = {
  email: { required, email },
  password: { required }
}

const loadingStatus = ref(false)

const v$ = useVuelidate(rules, loginUserInput)

async function login() {
  const result = await v$.value.$validate()
  if (!result) return

  try {
    loadingStatus.value = true

    const data = await loginUser(loginUserInput.value)
    localStorage.setItem('userData', JSON.stringify(data))
    window.location.href = '/admin'
    v$.value.$reset()
    loadingStatus.value = false
  } catch (error:any) {
    loadingStatus.value = false
    // if (isError(error)) {
      showError(error.message)
    // }
  }
}


</script>

<template>
  <div class="row">
    <div class="card">
      <div class="card-header"><h3>Login</h3></div>
      <div class="card-body">
        <form action="" @submit.prevent="login">
          <div class="form-group mb-2">
            <label for="">E-mail</label>

            <Error :Vdata="v$.email.$errors">
              <input
                type="text"
                @blur="v$.email.$touch"
                placeholder="E-mail"
                v-model="loginUserInput.email"
                class="form-control"
                name="email"
              />
            </Error>
          </div>

          <div class="form-group">
            <label for="">Password</label>

            <Error :Vdata="v$.password.$errors">
              <input
                type="text"
                @blur="v$.password.$touch"
                placeholder="Password"
                v-model="loginUserInput.password"
                class="form-control"
                name="password"
              />
            </Error>
          </div>

          <div class="form-group">
            <RouterLink to="/register">Create an account</RouterLink>
          </div>
          <br />
          <div class="form-group">
            <BaseBtn
              class="btn w-100 btn-primary btn-block"
              :loading="loadingStatus"
              btnName="Log in"
            />
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
