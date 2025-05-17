<template>
      <div ref="container">
        <slot></slot>
      </div>
    </template>

    <script setup lang="ts">
    import { ref, onMounted, onUnmounted } from 'vue'
    import { createOverlay, detectAndDrawBoundingBox, captureElementScreenshot, downloadScreenshot } from '../utils/opencvUtils'

    const props = defineProps<{
      borderColor?: string
      backgroundColor?: string
      captureOnHover?: boolean
      elementName?: string
      autoDownload?: boolean
    }>()

    const container = ref<HTMLElement | null>(null)
    let overlay: HTMLDivElement | null = null
    let captureTimeout: number | null = null

    const handleMouseEnter = async () => {
      if (container.value && !overlay) {
        overlay = createOverlay(container.value, {
          borderColor: props.borderColor,
          backgroundColor: props.backgroundColor
        })
        detectAndDrawBoundingBox(container.value, overlay)
        
        // 如果启用了悬停截图功能，延迟500ms后捕获截图
        if (props.captureOnHover !== false) {
          captureTimeout = window.setTimeout(async () => {
            const screenshotDataUrl = await captureElementScreenshot(container.value!)
            if (screenshotDataUrl) {
              // 使用元素名称或默认名称
              const name = props.elementName || `element_${Date.now()}`
              
              // 如果启用了自动下载，直接下载截图
              if (props.autoDownload !== false) {
                downloadScreenshot(screenshotDataUrl, name)
              }
            }
          }, 500)
        }
      }
    }

    const handleMouseLeave = () => {
      if (overlay && overlay.parentNode) {
        overlay.parentNode.removeChild(overlay)
        overlay = null
      }
      
      // 清除截图延迟
      if (captureTimeout) {
        clearTimeout(captureTimeout)
        captureTimeout = null
      }
    }

    onMounted(() => {
      if (container.value) {
        container.value.addEventListener('mouseenter', handleMouseEnter)
        container.value.addEventListener('mouseleave', handleMouseLeave)
      }
    })

    onUnmounted(() => {
      if (container.value) {
        container.value.removeEventListener('mouseenter', handleMouseEnter)
        container.value.removeEventListener('mouseleave', handleMouseLeave)
      }
      if (overlay && overlay.parentNode) {
        overlay.parentNode.removeChild(overlay)
      }
      if (captureTimeout) {
        clearTimeout(captureTimeout)
      }
    })
    </script>