<template>
  <div id="app-container">
    <header>
      <h1>OpenCV.js 元素悬停高亮演示</h1>
      <p class="subtitle">鼠标悬停时自动创建边界框和截图</p>
      <div class="controls">
        <button @click="toggleHoverDetection" :class="{ active: hoverEnabled }">
          {{ hoverEnabled ? "禁用" : "启用" }}悬停检测
        </button>
        <button @click="toggleAutoDownload" :class="{ active: autoDownload }">
          {{ autoDownload ? "禁用" : "启用" }}自动下载
        </button>
        <button @click="toggleInfoPanel" :class="{ active: showInfoPanel }">
          {{ showInfoPanel ? "隐藏" : "显示" }}元素信息
        </button>
      </div>
    </header>
    <main>
      <HomeView />
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import HomeView from "./views/HomeView.vue";
import {
  enableAutoHoverDetection,
  disableAutoHoverDetection,
  updateHoverOptions,
} from "./utils/autoHoverDetection";

const hoverEnabled = ref(false);
const autoDownload = ref(true);
const showInfoPanel = ref(true);

const toggleHoverDetection = () => {
  hoverEnabled.value = !hoverEnabled.value;
  if (hoverEnabled.value) {
    enableAutoHoverDetection({
      autoDownload: autoDownload.value,
      showInfoPanel: showInfoPanel.value,
    });
  } else {
    disableAutoHoverDetection();
  }
};

const toggleAutoDownload = () => {
  autoDownload.value = !autoDownload.value;
  updateHoverOptions({
    autoDownload: autoDownload.value,
  });
};

const toggleInfoPanel = () => {
  showInfoPanel.value = !showInfoPanel.value;
  updateHoverOptions({
    showInfoPanel: showInfoPanel.value,
  });
};

onMounted(() => {
  // 默认不启用，让用户手动点击启用
  hoverEnabled.value = false;
});
</script>

<style>
:root {
  --primary-color: #42b983;
  --secondary-color: #35495e;
  --text-color: #2c3e50;
  --light-bg: #f8f9fa;
  --border-radius: 8px;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  background-color: var(--light-bg);
  color: var(--text-color);
  line-height: 1.6;
}
</style>

<style scoped>
#app-container {
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: var(--text-color);
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

header {
  background: linear-gradient(135deg, var(--primary-color), #2c8c67);
  padding: 30px 20px;
  color: white;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

header h1 {
  font-size: 2.5rem;
  margin-bottom: 10px;
  font-weight: 600;
}

.subtitle {
  font-size: 1.2rem;
  opacity: 0.9;
  max-width: 600px;
  margin: 0 auto 20px auto;
}

.controls {
  display: flex;
  justify-content: center;
  gap: 15px;
  margin-top: 15px;
}

button {
  padding: 8px 16px;
  background-color: rgba(255, 255, 255, 0.2);
  color: white;
  border: 2px solid rgba(255, 255, 255, 0.4);
  border-radius: 4px;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.3s ease;
}

button:hover {
  background-color: rgba(255, 255, 255, 0.3);
}

button.active {
  background-color: rgba(255, 255, 255, 0.4);
  border-color: white;
}

main {
  flex-grow: 1;
  padding: 30px 20px;
  background-color: var(--light-bg);
}

footer {
  background-color: var(--secondary-color);
  padding: 20px;
  color: white;
  font-size: 0.9rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
}

.footer-links {
  display: flex;
  gap: 20px;
  margin-top: 10px;
}

.footer-link {
  color: rgba(255, 255, 255, 0.8);
  text-decoration: none;
  transition: color 0.3s ease;
}

.footer-link:hover {
  color: white;
  text-decoration: underline;
}

@media (max-width: 768px) {
  header h1 {
    font-size: 1.8rem;
  }

  .subtitle {
    font-size: 1rem;
  }
}
</style>
