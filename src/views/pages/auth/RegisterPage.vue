<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import Error from '@/components/Error.vue'
import BaseBtn from '@/components/BaseBtn.vue'

import { reactive, ref } from 'vue'
import useVuelidate from '@vuelidate/core'
import { required, email } from '@vuelidate/validators'
import type { IRegisterInput } from './auth-types'
import { registerUser } from './actions/RegisterUser'
import { showError, successMsg } from '@/helper/ToastNotification'

const registerUserInput = ref<IRegisterInput>({
  name: '',
  email: '',
  password: ''
})

const rules = {
  name: { required },
  email: { required, email },
  password: { required }
}

const loadingStatus = ref(false)

const v$ = useVuelidate(rules, registerUserInput)

async function register() {
  const result = await v$.value.$validate()
  if (!result) return

  try {
    loadingStatus.value = true

    const data = await registerUser(registerUserInput.value)
    registerUserInput.value = {} as IRegisterInput
    successMsg(data.message)
    
    v$.value.$reset()
    loadingStatus.value = false
  } catch (error) {
    loadingStatus.value = false
    for (const message of error as string[]) {
      showError(message)
    }
  }
}
</script>

<template>
  <div class="row">
    <div class="card">
      <div class="card-header"><h3>Register</h3></div>
      <div class="card-body">
        <form @submit.prevent="register">
          <div class="form-group mb-2">
            <label for="">Name</label>

            <Error :Vdata="v$.name.$errors">
              <input
                type="text"
                @blur="v$.name.$touch"
                placeholder="Name"
                v-model="registerUserInput.name"
                class="form-control"
                name="name"
              />
            </Error>
          </div>

          <div class="form-group mb-2">
            <label for="">E-mail</label>

            <Error :Vdata="v$.email.$errors">
              <input
                type="text"
                @blur="v$.email.$touch"
                placeholder="E-mail"
                v-model="registerUserInput.email"
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
                v-model="registerUserInput.password"
                class="form-control"
                name="password"
              />
            </Error>
          </div>
          <br />

          <div class="form-group">
            <RouterLink to="/">Log in</RouterLink>
          </div>
          <br />
          <div class="form-group">
            <BaseBtn
              class="btn w-100 btn-primary btn-block"
              :loading="loadingStatus"
              btnName="Register"
            />
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
