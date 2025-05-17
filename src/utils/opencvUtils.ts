import cv from 'opencv-ts'

    export const OpenCVInit = (): Promise<void> => {
      return new Promise((resolve, reject) => {
        if (cv.getBuildInformation) {
          resolve()
        } else {
          // 如果OpenCV还没有加载完成，等待它加载
          const waitForOpenCV = () => {
            if (cv.getBuildInformation) {
              resolve()
            } else {
              setTimeout(waitForOpenCV, 100)
            }
          }
          waitForOpenCV()
          
          // 设置超时，防止无限等待
          setTimeout(() => {
            reject(new Error('OpenCV initialization timeout'))
          }, 30000)
        }
      })
    }

    export const createOverlay = (element: HTMLElement, options: { borderColor?: string, backgroundColor?: string } = {}): HTMLDivElement => {
      const overlay = document.createElement('div')
      overlay.style.position = 'absolute'
      overlay.style.zIndex = '1000'
      overlay.style.border = options.borderColor || '3px solid limegreen'
      overlay.style.backgroundColor = options.backgroundColor || 'rgba(0, 255, 0, 0.1)'
      overlay.style.pointerEvents = 'none'
      overlay.style.boxSizing = 'border-box'
      overlay.style.borderRadius = '4px'
      
      return overlay
    }

    export const detectAndDrawBoundingBox = (element: HTMLElement, overlay: HTMLDivElement): void => {
      try {
        const rect = element.getBoundingClientRect()
        
        // 调整滚动位置
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop
        const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft
        
        // 使用OpenCV创建一个矩形
        const rect_points = new cv.Point(rect.left + scrollLeft, rect.top + scrollTop)
        const rect_size = new cv.Size(rect.width, rect.height)
        
        // 应用OpenCV的矩形到overlay元素
        overlay.style.left = `${rect_points.x}px`
        overlay.style.top = `${rect_points.y}px`
        overlay.style.width = `${rect_size.width}px`
        overlay.style.height = `${rect_size.height}px`
        
        document.body.appendChild(overlay)
      } catch (error) {
        console.error('Error in OpenCV detection:', error)
      }
    }

    // 创建元素截图功能
    export const captureElementScreenshot = async (element: HTMLElement): Promise<string> => {
      try {
        // 使用html2canvas捕获元素截图
        const html2canvas = (await import('html2canvas')).default
        const canvas = await html2canvas(element, {
          backgroundColor: null,
          logging: false,
          useCORS: true
        })
        
        // 将canvas转换为OpenCV的Mat对象
        const imgData = canvas.getContext('2d')?.getImageData(0, 0, canvas.width, canvas.height)
        if (!imgData) throw new Error('Failed to get image data from canvas')
        
        // 创建OpenCV的Mat对象
        const src = cv.matFromImageData(imgData)
        
        // 可以在这里添加OpenCV的图像处理操作
        // 例如：边缘检测、模糊、锐化等
        const dst = new cv.Mat()
        
        // 示例：应用高斯模糊
        const ksize = new cv.Size(5, 5)
        cv.GaussianBlur(src, dst, ksize, 0, 0, cv.BORDER_DEFAULT)
        
        // 将处理后的图像转回canvas
        const tempCanvas = document.createElement('canvas')
        tempCanvas.width = dst.cols
        tempCanvas.height = dst.rows
        cv.imshow(tempCanvas, dst)
        
        // 释放OpenCV资源
        src.delete()
        dst.delete()
        
        // 返回处理后的图像的DataURL
        return tempCanvas.toDataURL('image/png')
      } catch (error) {
        console.error('Error capturing screenshot:', error)
        return ''
      }
    }

    // 自动下载截图
    export const downloadScreenshot = (dataUrl: string, elementName: string = 'screenshot'): void => {
      try {
        // 创建一个隐藏的a标签
        const downloadLink = document.createElement('a')
        downloadLink.href = dataUrl
        downloadLink.download = `${elementName}_${new Date().getTime()}.png`
        downloadLink.style.display = 'none'
        
        // 添加到文档中并触发点击
        document.body.appendChild(downloadLink)
        downloadLink.click()
        
        // 清理DOM
        setTimeout(() => {
          document.body.removeChild(downloadLink)
        }, 100)
      } catch (error) {
        console.error('Error downloading screenshot:', error)
      }
    }