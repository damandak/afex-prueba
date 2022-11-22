<template>
  <div class="player-modal-wrapper" @click.self="$emit('closePlayerModal')">
    <iframe v-if="video.platform == 'youtube'"
      :src="'https://www.youtube.com/embed/' + video.id + '?enablejsapi=1'"
      title="YouTube video player"
      frameborder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowfullscreen
    ></iframe>
    <div class="player-modal-close" @click="$emit('closePlayerModal')">
      <img src="@/assets/delete.svg" alt="close button" />
    </div>
  </div>
</template>
<script setup>
const props = defineProps({
  video: {
    type: Object,
    required: true,
  },
});
const emits = defineEmits(["closePlayerModal"]);
</script>
<style lang="scss" scoped>
.player-modal-wrapper {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #020202cf;
  z-index: 100;
  text-align: center;
  iframe {
    width: 80%;
    height: 80%;
    position: absolute;
    top: 10%;
    left: 10%;
  }
  .player-modal-close {
    position: absolute;
    top: 10px;
    left: 50%;
    transform: translateX(-50%);
    background-color: white;
    height:40px;
    width:40px;
    border-radius:10px;
    cursor: pointer;
    &:hover {
      opacity: 0.7;
    }
    img {
      width: 50px;
      height: 50px;
    }
  }
}
@media screen and (max-width: 768px) {
  .player-modal-wrapper {
    iframe {
      width: 100%;
      height: 50vh;
      position: absolute;
      top: 0;
      left: 0;
      transform: translateY(50%);
    }
  }
}
</style>
