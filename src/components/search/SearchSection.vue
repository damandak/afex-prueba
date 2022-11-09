<template>
  <div class="search-wrapper">
    <h1 class="main-title">Añadir nuevo video</h1>
    <div class="search-container">
      <input
        type="text"
        class="search-input"
        placeholder="Añadir"
        v-model="search"
        @keyup.enter="searchVideo"
      />
      <button class="search-button" @click="$emit('searchVideo', search)">
        Añadir
      </button>
    </div>
  </div>
</template>
<script setup>
import { ref } from "vue";

const emit = defineEmits(["searchVideo"]);
var search = ref("");

</script>
<style scoped lang="scss">
.search-wrapper {
  margin: 120px auto 125px auto;
  width: 70%;
  min-width: 360px;
  max-width: 1076px;
  h1.main-title {
    font-size: 28.33px;
    font-weight: 500;
    margin-bottom: 16px;
  }
  .search-container {
    height: 57px;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    input {
      height: 100%;
      width: 76.5%;
      box-sizing: border-box;
      /* Blanco pleno */
      background: #FFFFFF;
      /* borde de campos */
      border: 1px solid rgba(0, 0, 0, 0.3);
      border-radius: 5px 0px 0px 5px;
      padding-left: 23px;
      font-size: 16px;
      font-weight: 400;
    }
    button {
      height: 100%;
      width: 23.5%;
      /* Secundario 2 */
      background: #136AE4;
      box-shadow: 0px 1px 1px rgba(0, 0, 0, 0.2), 0px 1px 4px rgba(0, 0, 0, 0.12), 0px 2px 2px rgba(0, 0, 0, 0.14);
      border-radius: 0px 10px 10px 0px;
      padding: auto;
      /* Blanco calido */
      color: #FBFBFB;
      font-family: 'Montserrat', sans-serif;
      font-style: normal;
      font-weight: 700;
      font-size: 16px;
      line-height: 21px;
      cursor: pointer;
      &:hover {
        background: #0F5BCB;
      }
    }
  }
}
@media screen and (max-width: 768px) {
  .search-wrapper {
    width: 90%;
    min-width: 300px;
    margin: 50px auto 20px auto;
    text-align: center;
  }
}
</style>