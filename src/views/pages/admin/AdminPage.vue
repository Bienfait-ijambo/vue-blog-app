<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import { logout } from './actions/logout';
// import HelloWorld from './components/HelloWorld.vue'


async function logoutUser(){
  await logout()
  window.location.href='/'
  localStorage.removeItem('userData')
}
</script>

<template>
  <div class="row" style="margin-top: 50px">
    <nav
      class="navbar navbar-expand-lg bg-body-tertiary"
      style="background-color: #e3f2fd; border: 1px solid gainsboro; border-radius: 3px"
    >
      <div class="container-fluid">
        <a class="navbar-brand" href="#"> <b>App Logo</b> </a>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavDropdown"
          aria-controls="navbarNavDropdown"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNavDropdown">
          <ul class="navbar-nav">
            <li class="nav-item">
              <RouterLink class="nav-link" to="/admin">Dashboard</RouterLink>
            </li>
            <li class="nav-item">
              <RouterLink class="nav-link" to="/posts">Posts</RouterLink>
            </li>
            <li class="nav-item" @click="logoutUser" style="cursor: pointer;">
              <a class="nav-link"  style="color:red"><b>Logout</b></a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
    
    <RouterView />
  </div>
</template>
<style>
.nav-item  a{
  color: rgb(11, 11, 11);
}
</style>
