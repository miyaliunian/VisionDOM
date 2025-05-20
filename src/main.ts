import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import router from "./router"; // 新增
import { OpenCVInit } from "./utils/opencvUtils";

// 初始化OpenCV
OpenCVInit()
  .then(() => {
    console.log("OpenCV initialized successfully");
    const app = createApp(App);
    app.use(router); // 新增
    app.mount("#app");
  })
  .catch((error) => {
    console.error("Failed to initialize OpenCV:", error);
  });
