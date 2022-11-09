<template>
  <div class="description-modal-wrapper" @click.self="$emit('closeDescriptionModal')">
    <div class="description-modal">
      <div class="description-modal-thumbnail" @click="$emit('playVideo', video)">
        <img
          class="dmt-thumbnail"
          :src="video.thumbnail_high"
          alt="video thumbnail"
        />
        <img
          class="dmt-play"
          src="@/assets/play.png"
          alt="play button"
        />
        <div class="duration-container">
          <p>{{ processDuration(video.duration) }}</p>
        </div>
      </div>
      
      <div class="description-modal-content">
        <h1>{{ video.title }}</h1>
        <p>{{ video.description }}</p>
      </div>
      <div class="description-modal-close" @click="$emit('closeDescriptionModal')">
        <img src="@/assets/vector_close.png" alt="close button" />
      </div>
    </div>
  </div>
</template>

<script setup>
import moment from "moment";
const props = defineProps({
  video: {
    type: Object,
    required: true,
  },
});
const emits = defineEmits([
  "descriptionModal",
  "closeDescriptionModal",
  "playVideo",
]);

const processDuration = (duration) => {
  const momentDuration = moment.duration(duration);
  const hours = momentDuration.hours();
  const minutes = momentDuration.minutes();
  const seconds = momentDuration.seconds();
  return `${hours ? hours + ":" : ""}${
    minutes ? (minutes < 10 ? "0" + minutes : minutes) + ":" : ""
  }${seconds < 10 ? "0" + seconds : seconds}`;
};
</script>

<style scoped lang="scss">
.description-modal-wrapper {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #0202027b;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 100;
  .description-modal {
    max-width: 1096px;
    min-width: 300px;
    width: 66%;
    height: 438px;
    /* Blanco calido */
    background: #FBFBFB;
    /* card shadow */
    box-shadow: 0px 20px 20px rgba(0, 0, 0, 0.07);
    border-radius: 15px;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    position: relative;
  }
  .description-modal-thumbnail {
    width: 45%;
    position: relative;
    cursor: pointer;
    &:hover {
      .dmt-play {
        opacity: 0.7;
      }
    }
    .dmt-thumbnail {
      width: 100%;
    }
    .dmt-play {
      width: 57px;
      height: 54px;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      transition: all 0.3s ease;
    }
    .duration-container {
      position: absolute;
      bottom: 8px;
      right: 9px;
      background-color: #000000;
      border-radius: 4px;
      padding: 2px 4px;
      p {
        color: white;
        font-size: 12px;
      }
    }
  }
  .description-modal-content {
    width: 45%;
    display: flex;
    gap: 16px;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    height: 80%;
    overflow: auto;
    h1 {
      color: #3C3E41;
      font-weight: 500;
      font-size: 24px;
      line-height: 38px;
      overflow: auto;
    }
    p {
      font-weight: 400;
      font-size: 21px;
      line-height: 25px;
      color: #3C3E41;
      overflow: auto;
      max-height: 50%;
    }
  }
  .description-modal-close {
    position: absolute;
    top: 20px;
    right: 20px;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    &:hover {
      opacity: 0.7;
    }
    img {
      width: 21.42px;
      height: 17.5px;
      border-radius: 4px;
      background-color: white;
    }
  }
}
@media screen and (max-width: 768px) {
  .description-modal-wrapper {
    .description-modal {
      width: 90%;
      height: 90%;
      flex-direction: column;
      gap: 10px;
      justify-content: flex-start;
      align-items: center;
      padding: 15px;
      .description-modal-thumbnail {
        width: auto;
        height: 35%;
        .dmt-thumbnail {
          width: 100%;
          height: 100%;
        }
      }
      .description-modal-content {
        width: 90%;
        height: 60%;
        h1 {
          font-size: 20px;
        }
        p {
          font-size: 16px;
        }
      }
    }
  }
}
</style>
