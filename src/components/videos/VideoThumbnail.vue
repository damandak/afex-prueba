<template>
  <div class="video-thumbnail">
    <img :src="video.thumbnail_medium" alt="video thumbnail" @click="$emit('descriptionModal', video)"/>
    <div class="duration-container">
      <p>{{ processDuration(video.duration) }}</p>
    </div>
    <!--Delete Button-->
    <div class="delete-button" @click="$emit('deleteModal', video)">
      <img src="@/assets/delete.svg" alt="delete button" />
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
const emits = defineEmits(["deleteModal", "descriptionModal"]);

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
.video-thumbnail {
  width: 263px;
  height: 150px;
  position: relative;
  cursor: pointer;
  &:hover {
    opacity: 0.8;
    transition: opacity 0.2s ease-in-out;
  }
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  .delete-button {
    position: absolute;
    top: 8px;
    right: 9px;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    &:hover {
      opacity: 0.7;
    }
    img {
      border-radius: 4px;
      background-color: white;
    }
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
</style>