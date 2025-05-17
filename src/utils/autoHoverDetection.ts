import {
  createOverlay,
  detectAndDrawBoundingBox,
  captureElementScreenshot,
  downloadScreenshot,
} from "./opencvUtils";
import { createApp, h } from "vue";
import ElementInfoPanel from "../components/ElementInfoPanel.vue";

let overlay: HTMLDivElement | null = null;
let captureTimeout: number | null = null;
let currentElement: HTMLElement | null = null;
let isEnabled = false;
let infoPanelContainer: HTMLDivElement | null = null;
let infoPanelApp: any = null;

// 配置选项
interface HoverOptions {
  captureOnHover?: boolean;
  autoDownload?: boolean;
  captureDelay?: number;
  borderColor?: string;
  backgroundColor?: string;
  excludeSelectors?: string[];
  showInfoPanel?: boolean;
}

let options: HoverOptions = {
  captureOnHover: true,
  autoDownload: true,
  captureDelay: 500,
  borderColor: "3px solid limegreen",
  backgroundColor: "rgba(0, 255, 0, 0.1)",
  excludeSelectors: [
    ".no-hover-detect",
    "body",
    "html",
    "script",
    "style",
    "head",
  ],
  showInfoPanel: true,
};

// 创建Vue组件信息面板
const createVueInfoPanel = (
  element: HTMLElement,
  parentElement: HTMLElement
): void => {
  // 创建容器
  infoPanelContainer = document.createElement("div");
  infoPanelContainer.style.position = "absolute";
  infoPanelContainer.style.bottom = "-10px"; // 增加距离，确保不重叠
  infoPanelContainer.style.left = "0";
  infoPanelContainer.style.width = "100%";
  infoPanelContainer.style.zIndex = "1001";
  infoPanelContainer.style.marginTop = "80px"; // 增加外边距

  parentElement.appendChild(infoPanelContainer);

  // 创建Vue应用
  infoPanelApp = createApp({
    render() {
      return h(ElementInfoPanel, {
        element,
        visible: true,
      });
    },
  });

  infoPanelApp.mount(infoPanelContainer);
};

// 处理鼠标移动
const handleMouseMove = (event: MouseEvent) => {
  if (!isEnabled) return;

  // 获取鼠标下的元素
  const target = event.target as HTMLElement;
  debugger;

  // 如果是排除的元素，则不处理
  if (shouldExcludeElement(target)) return;

  // 如果是当前已经处理的元素，则不重复处理
  if (target === currentElement) return;

  // 清除之前的元素
  clearCurrentElement();

  // 设置新的当前元素
  currentElement = target;

  // 创建并显示覆盖层
  overlay = createOverlay(currentElement, {
    borderColor: options.borderColor,
    backgroundColor: options.backgroundColor,
  });
  detectAndDrawBoundingBox(currentElement, overlay);

  // 创建并显示Vue信息面板
  if (options.showInfoPanel && overlay && currentElement) {
    createVueInfoPanel(currentElement, overlay);
  }

  // 如果启用了悬停截图功能，延迟后捕获截图
  if (options.captureOnHover) {
    captureTimeout = window.setTimeout(async () => {
      if (currentElement) {
        const screenshotDataUrl = await captureElementScreenshot(
          currentElement
        );
        if (screenshotDataUrl && options.autoDownload) {
          // 使用元素的id、class或标签名作为文件名
          const name = getElementName(currentElement);
          downloadScreenshot(screenshotDataUrl, name);
        }
      }
    }, options.captureDelay || 500);
  }
};

// 处理鼠标离开
const handleMouseLeave = () => {
  clearCurrentElement();
};

// 清除当前元素的相关资源
const clearCurrentElement = () => {
  // 卸载Vue应用
  if (infoPanelApp) {
    infoPanelApp.unmount();
    infoPanelApp = null;
  }

  // 移除信息面板容器
  if (infoPanelContainer && infoPanelContainer.parentNode) {
    infoPanelContainer.parentNode.removeChild(infoPanelContainer);
    infoPanelContainer = null;
  }

  // 移除覆盖层
  if (overlay && overlay.parentNode) {
    overlay.parentNode.removeChild(overlay);
    overlay = null;
  }

  // 清除截图超时
  if (captureTimeout) {
    clearTimeout(captureTimeout);
    captureTimeout = null;
  }

  currentElement = null;
};

// 判断是否应该排除该元素
const shouldExcludeElement = (element: HTMLElement): boolean => {
  if (!element) return true;

  // 检查是否在排除选择器列表中
  for (const selector of options.excludeSelectors || []) {
    if (element.matches(selector)) return true;
  }

  // 检查元素是否太小
  const rect = element.getBoundingClientRect();
  if (rect.width < 10 || rect.height < 10) return true;

  return false;
};

// 获取元素的名称用于文件命名
const getElementName = (element: HTMLElement): string => {
  if (element.id) return `id_${element.id}`;
  if (
    element.className &&
    typeof element.className === "string" &&
    element.className.trim()
  ) {
    return `class_${element.className.trim().replace(/\s+/g, "_")}`;
  }
  return `tag_${element.tagName.toLowerCase()}_${Date.now()}`;
};

// 启用自动悬停检测
const enableAutoHoverDetection = (customOptions?: HoverOptions) => {
  // 合并自定义选项
  options = { ...options, ...customOptions };

  // 如果已经启用，先禁用再重新启用
  if (isEnabled) {
    disableAutoHoverDetection();
  }

  // 添加事件监听器
  document.addEventListener("mousemove", handleMouseMove);
  document.addEventListener("mouseleave", handleMouseLeave);

  isEnabled = true;

  console.log("自动悬停检测已启用");
};

// 禁用自动悬停检测
const disableAutoHoverDetection = () => {
  // 移除事件监听器
  document.removeEventListener("mousemove", handleMouseMove);
  document.removeEventListener("mouseleave", handleMouseLeave);

  // 清除当前元素
  clearCurrentElement();

  isEnabled = false;

  console.log("自动悬停检测已禁用");
};

// 更新选项
const updateHoverOptions = (customOptions: HoverOptions) => {
  options = { ...options, ...customOptions };

  // 如果已启用，需要重新启用以应用新选项
  if (isEnabled) {
    disableAutoHoverDetection();
    enableAutoHoverDetection(options);
  }
};

// 只导出一次
export {
  enableAutoHoverDetection,
  disableAutoHoverDetection,
  updateHoverOptions,
};
