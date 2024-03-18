// store.js
import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    // 상태 데이터를 저장하는 state 객체 정의
    searchResults: []                   // 검색 결과
  },
  mutations: {
    // 상태 변경을 위한 뮤테이션 메소드 정의
    SET_SEARCH_RESULTS(state, searchResults) {
        state.searchResults = searchResults;
    }
  },
  actions: {
    // 비동기 작업을 처리하는 액션 메소드 정의
    async fullTextVectorSearch({ commit }, { query, top_k }) {
        try {
          const response = await axios.get(`http://localhost:3000/photo/search/vector?natural_query=${query}&top_k=${top_k}`);
          console.log("Search results:", response.data);
          commit('SET_SEARCH_RESULTS', response.data); // 뮤테이션 커밋
        } catch (error) {
          console.error("Error searching for photos:", error);
        }
    }
  }
});

export default store;
