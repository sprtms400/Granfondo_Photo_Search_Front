<template>
  <div>
    <h2>검색 결과</h2>
    <ul>
      <li v-for="result in searchResults" :key="result.id">
        {{ result.name }} <!-- 예시로 result 객체에 name 속성이 있다고 가정 -->
      </li>
    </ul>
  </div>
</template>

<script>
export default {
    // data() {
    //   return {
    //     idList: [],
    //     indexBookmark: 0,
    //   };
    // },
    // methods: {
    //   async wheelDown() {
    //     this.isSearching = true;
    //     try {
    //     } catch (error) {
    //     } finally {
    //     }
    //   }
    // }
  };
</script>
