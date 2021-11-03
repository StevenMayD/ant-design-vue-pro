<template>
  <div id="app">
    <!-- <a-button>属于ant design的组件 -->
    <a-button>按钮</a-button>
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div>
    <router-view />
  </div>
</template>

