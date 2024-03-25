<template>
  <div>
    <h1 class="page-title">Search Results</h1>
    <div v-if="loading" class="loading-spinner">Loading...</div>
    <div class="gallery">
      <div v-for="photo in photosInfo" :key="photo.photoId" class="photo-card">
        <img :src="photo.imageUrl" :alt="`Photo ID: ${photo.photoId}`" class="photo-image" @click="showDetailModal(photo)"/>
        <div class="photo-info">
            <p>출처 : {{photo.author}}</p>
            <p>대회 : {{photo.competition}}</p>
            <p>촬영시간 : {{photo.photographedTime}}</p>
        </div>
      </div>
    </div>
    <DetailModal v-if="showModal" :photoInfo="photoInfo" @close="showModal = false"/>
    <div class="navi">
        <button @click="loadPreviousPage" :disabled="currentPage === 0">Previous</button>
        <button @click="loadNextPage" :disabled="!hasMore">Next</button>
    </div>
    <p v-if="!hasMore">No more results</p>
  </div>
</template>

<script>
import DetailModal from './DetailModal.vue';
import * as photoManager from '@/services/photoManager';

export default {
  components: {
    DetailModal
  },
  data() {
    return {
      selectedCompetition: '',
      rankList: [],
      photosInfo: [],
      itemsPerPage: 40,
      currentPage: 0,
      hasMore: true,
      loading: false,
      showModal: false,
      photoInfo: {}, //모달에 표시할 상세 정보
    };
  },
  created() {
    this.loadPageData();
  },
  watch: {
    '$route.query.selectedCompetition': {
      immediate: true,
      handler() {
        this.selectedCompetition = this.$route.query.selectedCompetition;
      }
    },
    '$route.query.rankList': {
      immediate: true,
      handler() {
        this.initPage();
        this.loadPageData(); // 데이터 로딩 메서드 호출
      }
    }
  },
  methods: {
    initPage() {
        this.rankList = this.$route.query.rankList;
        console.log('this.rankList', this.rankList)
    },
    async loadPageData() {
      this.loading = true;
      try {
        const startIndex = this.currentPage * this.itemsPerPage;
        const partOfRankList = this.rankList.slice(startIndex, startIndex + this.itemsPerPage)
        const response = await photoManager.getPhotos_byList(partOfRankList);

        let photoDatas = response.data;
        for (let i = 0 ; i < photoDatas.length ; i++) {
            photoDatas[i].imageUrl = await photoManager.photoURL_assembler_original(this.selectedCompetition, photoDatas[i].photoId);
        }
        this.photosInfo = photoDatas;
        console.log('this.photosInfo : ', this.photosInfo)
        this.hasMore = this.photosInfo.length === this.itemsPerPage;

      } catch (error) {
        console.error('Error fetching items:', error);
      } finally {
        this.loading = false;
        this.$nextTick(() => {
          window.scrollTo(0, 0)
        });
      }
    },
    loadNextPage() {
      if (this.hasMore) {
        this.currentPage++;
        this.loadPageData();
      }
    },
    loadPreviousPage() {
      if (this.currentPage > 0) {
        this.currentPage--;
        this.loadPageData();
      }
    },
    async showDetailModal(photo) {
        try {
            let annotated_image_url = '';
            let numberplate_image_url = '';
            if (photo.isPhotoAnalyzedNumberPlate === true) {
                annotated_image_url = await photoManager.photoURL_annotated_image(this.selectedCompetition, photo.photoId);
                numberplate_image_url = await photoManager.photoURL_cropped_number_plate_image(this.selectedCompetition, photo.photoId);
                console.log('numberplate_image_url : ', numberplate_image_url)
            }
            photo.annotated_image_url = annotated_image_url
            photo.numberplate_image_url = numberplate_image_url
            console.log('showDetailModal : ', photo);
            
            this.photoInfo = photo;
            this.showModal = true;
        } catch (error) {
            console.error('Error fetching detailed info:', error);
        }
    }
  }
};
</script>

<style>
.page-title {
  margin-top: 60px; /* 원하는 마진 크기로 조정 */
}
/* 홈 아이콘 스타일 */
.home-icon {
  width: 24px;
  height: 24px;
  cursor: pointer;
}

/* 갤러리 스타일 */
.gallery {
  margin-top: 4800px; /* 4800 px */
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  margin-left: auto; /* 갤러리 좌우 중앙 정렬을 위한 설정 */
  margin-right: auto; /* 갤러리 좌우 중앙 정렬을 위한 설정 */
  max-width: 1200px; /* 최대 너비 설정 (필요에 따라 조정) */
}

.photo-card {
  width: calc(25% - 16px); /* 각 카드의 너비 */
  margin-bottom: 20px; /* 카드 간의 수직 간격 */
  box-shadow: 0 8px 35px rgba(0,0,0,0.1); /* 그림자 효과 */
  overflow: hidden; /* 이미지가 카드 영역을 넘어가지 않도록 */
  background-color: #929292; /* 카드 배경색을 어둡게 설정하여 하얀색 텍스트와 대비 */
}

.photo-image {
  /* 이미지 스타일 (기존 설정에 추가) */
  margin: 2%;
  display: block; /* 블록 레벨 요소로 설정 */
  width: 96%; /* 부모 요소의 전체 너비를 차지하도록 설정 */
  height: auto; /* 이미지의 높이를 자동으로 조절 */
}

.photo-info {
  color: white; /* 글자색을 하얀색으로 설정 */
  font-family: 'Arial', sans-serif; /* 모던한 느낌을 주는 글꼴 설정 */
  text-shadow: 8px 8px 16px 5px rgba(0, 0, 0, 10); /* 텍스트에 약간의 그림자 효과를 추가 */
  padding: 10px; /* 내부 여백 추가 */
  background-color: rgba(0, 0, 0, 0.5); /* 배경색을 투명한 검정색으로 설정하여 대비를 증가 */
  margin: 10px 0; /* 위아래 여백 추가 */
}
.photo-info p {
  font-size: 12px; /* 글자 크기 조정 */
  margin-top: 5px; /* 상단 여백 조정 */
  margin-bottom: 5px; /* 하단 여백 조정 */
}
.navi {
  display: flex; /* Flexbox를 사용하여 내부 요소를 가로로 배열 */
  justify-content: center; /* 가로 방향으로 중앙 정렬 */
  gap: 10px; /* 버튼 사이의 간격 */
  padding: 20px 0; /* 상단과 하단에 여백 추가 */
}
.navi button {
  width: 120px; /* 버튼의 너비 지정 */
  height: 40px; /* 버튼의 높이 지정 */
  padding: 5px 10px; /* 버튼 내부의 상하좌우 여백 지정 */
  font-size: 16px; /* 버튼 내 텍스트 크기 지정 */
  cursor: pointer; /* 마우스 오버 시 커서 변경 */
  border-radius: 6px; /* 버튼의 테두리 스타일 지정 */
  background-color: #929292; /* 버튼 배경색 지정 */
  margin: 0 5px; /* 버튼 간의 여백 지정 */
}


</style>