<template>
  <div class="main-container">
    <SearchSection @searchVideo="searchVideo" />
    <div class="video-container">
      <VideoThumbnail
        v-for="video in orderedVideos"
        :key="video.id"
        :video="video"
        @deleteModal="deleteModal"
        @descriptionModal="descriptionModal"
      />
    </div>
    <VideoDelete
      v-if="activateDeleteModal"
      :video="deletableVideo"
      @deleteVideo="deleteVideo"
      @closeDeleteModal="closeDeleteModal"
    />
    <VideoDescription
      v-if="activateDescriptionModal"
      :video="describableVideo"
      @playVideo="playVideo"
      @closeDescriptionModal="closeDescriptionModal"
    />
    <PlayerModal
      v-if="activatePlayerModal"
      :video="playableVideo"
      @closePlayerModal="closePlayerModal"
    />
    <transition name="fade">
      <WarningComponent
        v-if="activateWarning"
        :message="warningMessage"
        :color="warningColor"
        @closeWarning="closeWarning"
      />
    </transition>
  </div>
</template>

<script setup>
import { computed, reactive, ref, onMounted } from "vue";
import { collection, doc, setDoc, getDocs, onSnapshot, deleteDoc, updateDoc } from "firebase/firestore";
import { db } from "@/firebase";
import SearchSection from '@/components/search/SearchSection.vue';
import VideoThumbnail from '@/components/videos/VideoThumbnail.vue';
import VideoDelete from '@/components/videos/VideoDelete.vue';
import VideoDescription from '@/components/videos/VideoDescription.vue';
import PlayerModal from '@/components/videos/PlayerModal.vue';
import WarningComponent from "@/components/warnings/WarningComponent.vue";

const videos = reactive([]);
const orderedVideos = computed(() => {
  return videos.sort((a, b) => a.date_added - b.date_added);
});

var deletableVideo = ref(null);
var describableVideo = ref(null);
var playableVideo = ref(null);

var warningMessage = ref("");
var warningColor = ref("");

var activateDeleteModal = ref(false);
var activateDescriptionModal = ref(false);
var activatePlayerModal = ref(false);
var activateWarning = ref(false);

const yt_url = "https://www.googleapis.com/youtube/v3/videos?";

onMounted(() => {
  onSnapshot(collection(db, "videos"), (querySnapshot) => {
    // clear videos list
    videos.splice(0, videos.length);
    querySnapshot.forEach((doc) => {
      const temp_video = {
        id: doc.id,
        date_added: doc.data().date_added,
        title: doc.data().title,
        description: doc.data().description,
        thumbnail_high: doc.data().thumbnail_high,
        thumbnail_medium: doc.data().thumbnail_medium,
        thumbnail_default: doc.data().thumbnail_default,
        url: doc.data().url,
        duration: doc.data().duration,
      };
      videos.push(temp_video);
    });
  });
});

function searchVideo(search) {
  let videoID = "";
  if (search.includes("https://www.youtube.com/watch?v=")) {
    videoID = search.split("https://www.youtube.com/watch?v=")[1];
  } else if (search.includes("https://youtu.be/")) {
    videoID = search.split("https://youtu.be/")[1];
  } else {
    activateWarning.value = true;
    warningColor.value = "red";
    warningMessage.value = "Por favor ingresa una URL válida de YouTube";
    return;
  }
  if (videoID.includes("&")) {
    videoID = videoID.split("&")[0];
  }
  if (videoID.includes("?")) {
    videoID = videoID.split("?")[0];
  }
  var existed = false;
  videos.forEach((video) => {
    if (video.id == videoID) {
      activateWarning.value = true;
      warningColor.value = "red";
      warningMessage.value = "Este video ya existe en la lista";
      existed = true;
      return;
    }
  });
  if (existed) {
    return;
  }
  var notfound = false;
  fetch(`${yt_url}id=${videoID}&key=${import.meta.env.VITE_API_KEY}&part=snippet`)
  .then((response) => response.json())
  .then((data) => {
    if(data.items.length === 0) {
      activateWarning.value = true;
      warningColor.value = "red";
      warningMessage.value = "No se encontró el video";
      notfound = true;
      return;
    } else {
      const tempID = data.items[0].id;
      const video = {
        date_added: new Date(),
        title: data.items[0].snippet.title,
        description: data.items[0].snippet.description,
        thumbnail_high: data.items[0].snippet.thumbnails.high.url,
        thumbnail_medium: data.items[0].snippet.thumbnails.medium.url,
        thumbnail_default: data.items[0].snippet.thumbnails.default.url,
        url: `https://www.youtube.com/watch?v=${tempID}`,
        duration: "",
      };
      setDoc(doc(db, "videos", tempID), video);
    }
  })
  .then(() => {
    if (notfound) {
      return;
    }
    fetch(`${yt_url}id=${videoID}&key=${import.meta.env.VITE_API_KEY}&part=contentDetails`)
      .then((response) => response.json())
      .then((data) => {
        const tempID = data.items[0].id;
        const duration = data.items[0].contentDetails.duration;
        updateDoc(doc(db, "videos", tempID), {
          duration: duration,
        });
      });
    activateWarning.value = true;
    warningColor.value = "green";
    warningMessage.value = "Video agregado correctamente";
  })
};

// Activate Modals
function deleteModal(selectedVideo) {
  deletableVideo.value = selectedVideo;
  activateDeleteModal.value = true;
}

function descriptionModal(selectedVideo) {
  describableVideo.value = selectedVideo;
  activateDescriptionModal.value = true;
}

function deleteVideo(selectedVideo) {
  deleteDoc(doc(db, "videos", selectedVideo.id));
  deletableVideo.value = null;
  activateDeleteModal.value = false;
}

// Close Modals
function closeDeleteModal() {
  deletableVideo.value = null;
  activateDeleteModal.value = false;
}

function closeDescriptionModal() {
  describableVideo.value = null;
  activateDescriptionModal.value = false;
}

function closePlayerModal() {
  playableVideo.value = null;
  activatePlayerModal.value = false;
}

function closeWarning() {
  if (activateWarning.value === true) {
    activateWarning.value = false;
    warningMessage.value = "";
    warningColor.value = "";
  }
}

// Play Video
function playVideo(selectedVideo) {
  console.log("play video");
  closeDescriptionModal();
  playableVideo.value = selectedVideo;
  activatePlayerModal.value = true;
}
</script>

<style scoped lang="scss">
.main-container {
  height: 100%;
}
.video-container {
  margin: auto;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  gap: 68px;
  width: 95%;
  max-width: 925px;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translate(-50%, -50%);
}
@media screen and (max-width: 768px) {
  .video-container {
    justify-content: space-around;
    flex-direction: column;
    align-items: center;
    gap: 20px;
  }
}
</style>


