<!-- DetailModal.vue -->
<template>
  <div class="modal">
    <div class="modal-content">
      <span class="close-button" @click="closeModal">&times;</span>
      <img v-if="photoInfo.annotated_image_url !== ''" :src="photoInfo.annotated_image_url" alt="Annotated Image" class="modal-image">
      <img v-if="photoInfo.numberplate_image_url !== ''" :src="photoInfo.numberplate_image_url" alt="Number Plate Image" class="modal-image">
      <div class="info">
        <h3>상세 정보</h3>
        <div class="number-info">
            <h4>번호 정보</h4>
            <div v-if="photoInfo.numberPlate && photoInfo.numberPlate.length">
                <p v-for="(plate, index) in photoInfo.numberPlate" :key="index">번호판 {{ index + 1 }}: {{ plate.numberPlate }}</p>
            </div>
                <p v-if="!photoInfo.numberPlate || !photoInfo.numberPlate.length">번호판 정보 없음</p>
        </div>
        <div class="appearance-info">
          <h4>특징 정보</h4>
          <ul>
            <li v-if="photoInfo.appearance.sex">성별: {{ photoInfo.appearance.sex }}</li>
            <li v-if="photoInfo.appearance.helmet">헬멧: {{ photoInfo.appearance.helmet.color }}</li>
            <li v-if="photoInfo.appearance.eyewear">고글: {{ photoInfo.appearance.eyewear.color }}</li>
            <li v-if="photoInfo.appearance.upper">상의: {{ photoInfo.appearance.upper.color }}, {{ photoInfo.appearance.upper.type }}</li>
            <li v-if="photoInfo.appearance.lower">하의: {{ photoInfo.appearance.lower.color }}, {{ photoInfo.appearance.lower.type }}</li>
            <li v-if="photoInfo.appearance.socks">양말: {{ photoInfo.appearance.socks.color }}</li>
            <li v-if="photoInfo.appearance.shoes">신발: {{ photoInfo.appearance.shoes.color }}</li>
            <li v-if="photoInfo.appearance.gloves">장갑: {{ photoInfo.appearance.gloves.color }}</li>
            <li v-if="photoInfo.appearance.bicycle">자전거: {{ photoInfo.appearance.bicycle.color }}</li>
            <!-- 기타 상세 정보 -->
          </ul>
        </div>
      </div>
    </div>
    <span class="close-button" @click="closeModal">&times;</span>
  </div>
</template>

<script>
export default {
  props: ['photoInfo'],
  methods: {
    closeModal() {
      this.$emit('close');
    },
    printNumberPlate(photoInfo) { 
        if (photoInfo.numberPlate && (photoInfo.numberPlate.length > 1)) {
            return `번호 정보 1 , 2: ${photoInfo.numberPlate[1].numberPlate}, ${photoInfo.numberPlate[2].numberPlate}`
        } else {
            return `번호 검출되지 않음`;
        }
    },
    printAppearance(photoInfo) {
        let sex = '';
        let helmet = '';
        let eyewear = '';
        let upper = '';
        let lower = '';
        let socks = '';
        let shoes = '';
        let gloves = '';
        let bicycle = '';
        if (photoInfo.appearance.sex) {
            sex = photoInfo.appearance.sex;
        }
        if (photoInfo.appearance.helmet) {
            helmet = photoInfo.appearance.helmet.color;
        }
        if (photoInfo.appearance.bicycle) { 
            bicycle = photoInfo.appearance.bicycle.color;
        }
        if (photoInfo.appearance.eyewear) {
            eyewear = photoInfo.appearance.eyewear.color;
        }
        if (photoInfo.appearance.upper) {
            upper = `${photoInfo.appearance.upper.sleeve} sleeve ${photoInfo.appearance.upper.color} upper`;
        }
        if (photoInfo.appearance.lower) {
            lower = `${photoInfo.appearance.lower.sleeve} sleeve ${photoInfo.appearance.lower.color} lower`;
        }
        if (photoInfo.appearance.socks) {
            socks = photoInfo.appearance.socks.color;
        }
        if (photoInfo.appearance.shoes) {
            shoes = photoInfo.appearance.shoes.color;
        }
        if (photoInfo.appearance.gloves) {
            gloves = photoInfo.appearance.gloves.color;
        }

        return `성별 : ${sex}, 헬멧 색상: ${helmet}, 자전거 색상: ${bicycle}, 상의: ${upper}, 하의: ${lower}, 고글: ${eyewear}, 장갑: ${gloves}, 양말:${socks}, 신발:${shoes}`
    }
  }
}
</script>

<style>
.modal {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1000;
  /* background-color: rgba(0, 0, 0, 0.5); 이 줄을 수정하거나 제거 */
  background-color: transparent; /* 완전히 투명하게 설정 */
}

.modal-content {
  background-color: #929292;
  padding: 20px;
  border-radius: 5px;
  max-width: 600px;
  width: 90%;
}

.modal-content img {
  max-width: 80%; /* 모달 너비를 넘지 않도록 설정 */
  max-height: 80vh; /* 화면 높이의 80%를 넘지 않도록 설정 */
  display: block; /* 이미지를 블록 레벨 요소로 설정 */
  margin: 0 auto 20px; /* 수평 중앙 정렬 및 하단에 20px 여백 */
  object-fit: contain; /* 이미지의 비율을 유지하면서 최대 크기 내에 맞춤 */
  border: 1px solid #ddd; /* 이미지 경계에 윤곽 추가 */
  padding: 5px; /* 이미지 내부 여백 */
  box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.2); /* 윤곽 주변에 그림자 효과 */
}

.modal-content h4 {
  margin-top: 5px; /* 위쪽 마진을 줄임 */
  margin-bottom: 5px; /* 아래쪽 마진을 줄임 */
}


.images-container {
  display: flex; /* 이미지를 가로로 배열 */
  justify-content: space-around; /* 이미지 사이에 공간을 균등하게 배치 */
  flex-wrap: wrap; /* 필요시 이미지를 다음 줄로 넘김 */
}
.info {
  color: #f5f5f5;
  background-color: #333;
  padding: 10px;
  border-radius: 5px;
}

.info h3 {
  margin: 0;
  padding-bottom: 10px;
  border-bottom: 1px solid #ddd;
}
.number-info p {
    margin: 5px 0;
    padding-left: 30px;
    font-size: 13px; /* 글자 크기 조정 */
}

.appearance-info p, .appearance-info ul {
  padding-left: 30px;
  margin: 5px 0;
}

.appearance-info ul {
  list-style-type: none;
  font-size: 13px; /* 글자 크기 조정 */
  margin-top: 5px; /* 상단 여백 조정 */
  margin-bottom: 5px; /* 하단 여백 조정 */
}

.appearance-info li {
  margin: 5px 0;
}

.close-button {
  position: absolute; /* 절대 위치 */
  bottom: -60px; /* 모달 하단 중앙 바깥에 위치 */
  left: 50%; /* 왼쪽에서 50% 떨어진 곳에 위치 */
  transform: translateX(-50%); /* 정확한 중앙으로 조정 */
  width: 50px; /* 버튼의 너비 */
  height: 50px; /* 버튼의 높이 */
  background-color: rgba(255, 255, 255, 0.75); /* 반투명한 배경색 */
  color: #000; /* X 글자색 */
  text-align: center; /* 텍스트 중앙 정렬 */
  line-height: 50px; /* 세로 중앙 정렬을 위해 line-height를 버튼 높이와 동일하게 설정 */
  font-size: 24px; /* X 글자 크기 */
  border-radius: 50%; /* 동그라미 형태 */
  cursor: pointer; /* 클릭 가능한 커서 모양 */
  z-index: 1050; /* 모달 내용 위에 표시되도록 z-index 설정 */
}

</style>