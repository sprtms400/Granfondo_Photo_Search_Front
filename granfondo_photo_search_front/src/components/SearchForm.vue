<template>
    <div class="search-container">
      <input type="text" v-model="searchQuery" placeholder="Search...">
      <button @click="submitSearch">Search</button>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        searchQuery: '',
      };
    },
    methods: {
      submitSearch() {
        // 검색 로직 구현
        console.log(this.searchQuery);
      },
    },
  };
  </script>
  
  <style>
  body, html {
    margin: 0;
    padding: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #333; /* 진회색 배경 */
    font-family: 'Arial', sans-serif;
  }
  
  .search-container {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  input[type="text"] {
    padding: 10px;
    font-size: 16px;
    border: none;
    outline: none;
    border-radius: 5px 0 0 5px;
    width: 300px; /* 입력창 너비 설정 */
  }
  
  button {
    padding: 10px 20px;
    font-size: 16px;
    border: none;
    background-color: #555; /* 버튼 배경색 */
    color: white; /* 버튼 글자색 */
    cursor: pointer;
    border-radius: 0 5px 5px 0;
    transition: background-color 0.3s ease;
  }
  
  button:hover {
    background-color: #777; /* 버튼 호버 효과 */
  }
  </style>
  