  <template>
    <div>
      <div class="title-images-container">
        <img src="../assets/title.webp" alt="Before Analysis" class="title-image-left"/>
        <i class="fas fa-cog analysis-icon"></i> <!-- 돋보기 아이콘에서 기어 아이콘으로 변경 -->
        <img src="../assets/annotated_title.jpg" alt="After Analysis" class="title-image-right"/>
      </div>
      <div class="title">마라톤, 그란폰도 이미지 검색기</div>
      <div class="search-container">
        <input type="text" v-model="searchQuery" placeholder="Search...">
        <button @click="submitSearch">Search</button>
      </div>
    </div>
  </template>


  
  <script>
  import { searchService } from '@/services/searchService';

  export default {
    data() {
      return {
        searchQuery: '',
      };
    },
    methods: {
      submitSearch() {
        // 검색 로직 구현
        searchService.searchImages(this.searchQuery);
        console.log('Search query:', this.searchQuery);
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

  .title-images-container {
    display: flex; /* flex 컨테이너 설정 */
    justify-content: center; /* 가로 축 중앙 정렬 */
    align-items: center; /* 세로 축 중앙 정렬 */
    margin-bottom: 20px; /* 이미지 아래 여백 설정 */
  }

  .title-image-left, .title-image-right {
    width: 250px; /* 로고 이미지 너비 설정 */
    height: 250px; /* 로고 이미지 높이 설정 */
    display: block; /* 이미지를 블록 요소로 설정하여 margin 속성 적용 */
    margin: 0 20px; /* 이미지 사이의 간격 조정 */
    border-radius: 15px; /* 모서리 둥글게 */
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.5); /* 그림자 추가 */
  }

  .analysis-icon {
    color: white; /* 아이콘 색상 변경 */
    font-size: 30px; /* 아이콘 크기 조정 */
    margin: 0 20px; /* 좌우 여백을 통해 이미지와의 간격 설정 */
    animation: spin 2s linear infinite; /* 애니메이션 적용 */
  }

  .title {
    color: white; /* 글자색 */
    font-size: 24px; /* 글자 크기 */
    margin-bottom: 20px; /* 검색 필드와의 여백 */
    text-align: center; /* 텍스트 가운데 정렬 */
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
    width: 450px; /* 입력창 너비 설정 */
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
  