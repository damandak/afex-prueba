<template>
  <div class="warning-container" :class="color">
    {{ message }}
    <img src="@/assets/delete.svg" alt="close button" @click="$emit('closeWarning')" />
  </div>
</template>
<script setup>
const props = defineProps({
  message: {
    type: String,
    required: true,
  },
  color: {
    type: String,
    required: true,
  },
});
const emits = defineEmits(["closeWarning"]);
</script>
<style scoped lang="scss">
.warning-container {
  width: 70%;
  min-height: 40px;
  position: absolute;
  top: 2%;
  left: 50%;
  transform: translate(-50%, 0%);
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  opacity: 1;
  transition: all 0.5s ease-in-out;
  color: white;
  img {
    position: absolute;
    right: 10px;
    cursor: pointer;
    color: white;
    filter: invert(100%) sepia(76%) saturate(0%) hue-rotate(60deg) brightness(107%) contrast(101%);
    &:hover {
      opacity: 0.7;
    }
  }
}
.red {
  background-color: #ff0033ad;
}
.green {
  background-color: #03ab41d5;
}
@media screen and (max-width: 768px) {
  .warning-container {
    width: 100%;
    font-size: 13px;
    top: 0;
    border-radius: 0px;
  }
}
</style>