<template>
  <div id="app">
    <SearchForm @search="fetchImages" />
    <div v-if="isLoading" class="spinner"></div> <!-- 로딩 스피너 추가 -->
    <ImageList v-if="!isLoading" :images="images" />
  </div>
</template>


<script>
import axios from 'axios';
import SearchForm from './components/SearchForm.vue';
import ImageList from './components/ImageList.vue';

export default {
  components: {
    SearchForm,
    ImageList
  },
  data() {
    return {
      images: [],
      isLoading: false // 로딩 상태를 관리하는 변수
    };
  },
  methods: {
    async fetchImages(searchQuery) {
      this.isLoading = true; // 검색 시작 시 로딩 상태를 true로 설정
      try {
        const response = await axios.get(`http://localhost:3000/photo/search/vector?natural_query=${searchQuery}`);
        this.images = response.data.images;
      } catch (error) {
        console.error("Error fetching images:", error);
      } finally {
        this.isLoading = false; // 검색 완료 시 로딩 상태를 false로 설정
      }
    }
  }
}
</script>
