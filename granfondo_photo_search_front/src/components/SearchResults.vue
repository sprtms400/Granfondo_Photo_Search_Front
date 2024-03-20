<template>
  <div>
    <h1>Search Results</h1>
    <ul>
      <li v-for="id in rankList" :key="id">Result ID: {{ id }}</li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      rankList: []
    };
  },
  created() {
    this.fetchRankList();
  },
  watch: {
    // $route 객체를 감시합니다.
    '$route.query.rankList': {
      immediate: true, // 컴포넌트 생성 시 즉시 실행
      handler(newVal, oldVal) {
        // 쿼리 파라미터가 변경될 때 실행할 동작
        console.log('Query parameter changed:', newVal, oldVal)
        this.fetchRankList();
      }
    }
  },
  methods: {
    fetchRankList() {
      // URL에서 rankList 쿼리 파라미터를 읽어옵니다.
      const rankListParam = this.$route.query.rankList;
      console.log('rankListParam:', rankListParam)
    }
  }
};
</script>
