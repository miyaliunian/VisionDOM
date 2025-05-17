import { createApp } from 'vue'
    import './style.css'
    import App from './App.vue'
    import { OpenCVInit } from './utils/opencvUtils'

    // 初始化OpenCV
    OpenCVInit().then(() => {
      console.log('OpenCV initialized successfully')
      const app = createApp(App)
      app.mount('#app')
    }).catch(error => {
      console.error('Failed to initialize OpenCV:', error)
    })