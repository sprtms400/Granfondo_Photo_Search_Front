<template>
  <div id="app">
    <router-view :key="$route.fullPath"></router-view>
  </div>
</template>


<script>

export default {
  components: {
  },
  data() {
    return {
      images: [],
      isLoading: false // 로딩 상태를 관리하는 변수
    };
  },
  methods: {
  }
}
</script>
