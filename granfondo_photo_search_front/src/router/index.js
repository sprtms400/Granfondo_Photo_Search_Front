// router/index.js
import Vue from 'vue';
import Router from 'vue-router';
import SearchPage from '@/components/SearchForm.vue';
import SearchResults from '@/components/SearchResults.vue';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/search-page',
      component: SearchPage
    },
    {
      path: '/results',
      name: 'search-results',
      component: SearchResults,
      props: true           // 컴포넌트 호출 시 parameter 전송 허용
    }
    // 다른 라우트 설정들...
  ]
});