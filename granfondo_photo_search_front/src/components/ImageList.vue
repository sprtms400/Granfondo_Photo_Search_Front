<template>
    <div class="image-list">
      <div v-for="image in images" :key="image.id" class="image-item">
        <img :src="image.url" :alt="image.title" />
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      images: Array,
    },
  };
  </script>
  
  <style>
  .image-list {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 20px; /* 이미지 사이의 간격 */
    padding: 20px; /* 이미지 리스트 주변의 패딩 */
  }
  
  .image-item {
    border-radius: 10px; /* 이미지의 모서리를 둥글게 */
    overflow: hidden; /* 이미지가 컨테이너를 넘어서지 않도록 */
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); /* 이미지에 그림자 효과 추가 */
  }
  
  .image-item img {
    width: 100%; /* 이미지의 너비를 컨테이너에 맞춤 */
    height: auto; /* 이미지의 높이를 자동으로 조절하여 비율 유지 */
    transition: transform 0.3s ease; /* 이미지 호버 시 확대 효과를 위한 전환 */
  }
  
  .image-item:hover img {
    transform: scale(1.05); /* 이미지 호버 시 약간 확대 */
  }
  </style>
  