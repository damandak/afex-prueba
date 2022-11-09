<template>
  <div class="delete-modal-wrapper" @click.self="$emit('closeDeleteModal')">
    <div class="delete-modal">
      <h1 class="delete-modal-title">¿Seguro que quieres eliminar este video?</h1>
      <div class="delete-modal-buttons">
        <button
          class="delete-modal-button sec-button"
          @click="$emit('closeDeleteModal')"
        >
          Cancelar
        </button>
        <button
          class="delete-modal-button main-button"
          @click="$emit('deleteVideo', video)"
        >
          Eliminar
        </button>
      </div>
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
const emits = defineEmits(["deleteVideo", "closeDeleteModal"]);
</script>
<style scoped lang="scss">
.delete-modal-wrapper {
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
  .delete-modal {
    max-width: 900px;
    min-width: 300px;
    width: 55%;
    height: 227px;
    background-color: #ffffff;
    border-radius: 5px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    position: relative;
    .delete-modal-title {
      text-align: left;
      max-width: 900px;
      min-width: 300px;
      position: absolute;
      padding: 58px 0px 0 90px;
      font-weight: 500;
      font-size: 24px;
      line-height: 38px;
      color: #3C3E41;
    }
    .delete-modal-buttons {
      position: absolute;
      right: 60px;
      bottom: 29px;
      .delete-modal-button {
        width: 250px;
        height: 57px;
        border-radius: 10px;
        font-size: 16px;
        font-weight: 500;
        margin-left: 25px;
        cursor: pointer;
        &:hover {
          opacity: 0.7;
        }
      }
      .main-button {
        background-color: #136ae4;
        color: #ffffff;
        box-shadow: 0px 1px 1px rgba(0, 0, 0, 0.2), 0px 1px 4px rgba(0, 0, 0, 0.12), 0px 2px 2px rgba(0, 0, 0, 0.14);
      }
      .sec-button {
        background-color: #ffffff;
        color: #136ae4;
        border: 1px solid #136ae4;
        filter: drop-shadow(0px 1px 1px rgba(0, 0, 0, 0.2)) drop-shadow(0px 1px 4px rgba(0, 0, 0, 0.12)) drop-shadow(0px 2px 2px rgba(0, 0, 0, 0.14));
      }
    }
  }
}
@media screen and (max-width: 768px) {
  .delete-modal-title {
    position: relative !important;
    padding: 0 !important;
    width: 80%;
    margin: 45px auto 60px auto;
    text-align: center !important;
  }
  .delete-modal-buttons {
    width: 80%;
    margin: 0 auto 0 auto;
    position: relative !important;
    right: inherit !important;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 0;
    flex-direction: row;
    .delete-modal-button {
      width: 30% !important;
      min-width: 100px !important;
      height: 40px !important;    }
  }
}
</style>