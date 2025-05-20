<template>
  <div class="element-info-panel" :class="{ show: visible }">
    <div class="info-header">
      <div class="element-type">
        <span class="tag-name">{{ elementInfo.tagName }}</span>
        <span v-if="elementInfo.id" class="element-id"
          >#{{ elementInfo.id }}</span
        >
        <span v-if="elementInfo.className" class="element-class"
          >.{{ elementInfo.className }}</span
        >
      </div>
      <div class="element-size">
        {{ elementInfo.width }}×{{ elementInfo.height }}px
      </div>
    </div>

    <div class="info-content">
      <div v-if="elementInfo.textContent" class="text-content">
        <div class="info-label">内容:</div>
        <div class="text-preview">{{ elementInfo.textContent }}</div>
      </div>

      <div class="element-stats">
        <div class="stat-item">
          <div class="stat-value">{{ elementInfo.childCount }}</div>
          <div class="stat-label">子元素</div>
        </div>
        <div class="stat-item">
          <div class="stat-value">{{ elementInfo.attributes.length }}</div>
          <div class="stat-label">属性</div>
        </div>
      </div>
      <div v-if="elementInfo.compDesc" class="comp-desc">
        <span class="info-label">组件描述:</span>
        <span class="desc-value">{{ elementInfo.compDesc }}</span>
      </div>
    </div>

    <div v-if="elementInfo.attributes.length > 0" class="attributes-list">
      <div
        v-for="(attr, index) in elementInfo.attributes"
        :key="index"
        class="attribute-item"
      >
        <span class="attr-name">{{ attr.name }}</span>
        <span class="attr-value">{{ attr.value }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps, computed } from "vue";

const props = defineProps({
  element: {
    type: Object,
    default: null,
  },
  visible: {
    type: Boolean,
    default: true,
  },
});

const elementInfo = computed(() => {
  if (!props.element)
    return {
      tagName: "",
      id: "",
      className: "",
      width: 0,
      height: 0,
      textContent: "",
      childCount: 0,
      attributes: [],
      compDesc: "",
    };

  const rect = props.element.getBoundingClientRect();
  const attributes = [];

  // 获取元素的所有属性
  for (let i = 0; i < props.element.attributes.length; i++) {
    const attr = props.element.attributes[i];
    if (attr.name !== "id" && attr.name !== "class") {
      attributes.push({
        name: attr.name,
        value: attr.value,
      });
    }
  }

  // 获取文本内容，去除多余空格
  let textContent = props.element.textContent?.trim() || "";
  if (textContent.length > 50) {
    textContent = textContent.substring(0, 50) + "...";
  }

  // 获取 data-comp-desc 属性
  let compDesc = "";
  if (
    props.element.hasAttribute &&
    props.element.hasAttribute("data-comp-desc")
  ) {
    compDesc = props.element.getAttribute("data-comp-desc") || "";
  }

  return {
    tagName: props.element.tagName.toLowerCase(),
    id: props.element.id,
    className:
      typeof props.element.className === "string"
        ? props.element.className.trim()
        : "",
    width: Math.round(rect.width),
    height: Math.round(rect.height),
    textContent,
    childCount: props.element.children.length,
    attributes,
    compDesc,
  };
});
</script>

<style scoped>
.element-info-panel {
  position: absolute;
  left: 0;
  width: 420px;
  min-width: 260px;
  background: linear-gradient(135deg, #232946 0%, #121629 100%);
  color: #e0e6f7;
  border-radius: 18px;
  opacity: 0;
  transform: translateY(10px) scale(0.98);
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  overflow: hidden;
  max-height: 0;
  z-index: 1001;
  font-family: "JetBrains Mono", "Fira Mono", "Consolas", "Microsoft YaHei",
    sans-serif;
  border: 1.5px solid #3e4a7b;
  margin-top: 0px;
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.25), 0 1.5px 6px 0 #1a1a2e;
  backdrop-filter: blur(8px);
}

.element-info-panel.show {
  opacity: 1;
  transform: translateY(0) scale(1);
  max-height: 320px;
  min-height: 140px;
}

.info-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 22px 10px 22px;
  background: linear-gradient(90deg, #2d3250 60%, #232946 100%);
  border-bottom: 1.5px solid #3e4a7b;
  margin-bottom: 0px;
}

.element-type {
  display: flex;
  align-items: center;
  gap: 10px;
}

.tag-name {
  color: #7fffd4;
  font-weight: bold;
  font-size: 1.1rem;
  letter-spacing: 0.5px;
  text-shadow: 0 1px 4px #1a1a2e44;
}

.element-id {
  color: #ffb86c;
  font-size: 1rem;
  font-weight: 500;
}

.element-class {
  color: #7fffd4;
  font-size: 1rem;
}

.element-size {
  font-size: 0.85rem;
  color: #a0a8c3;
  background: rgba(127, 255, 212, 0.08);
  padding: 4px 12px;
  border-radius: 12px;
  margin-left: 12px;
  box-shadow: 0 1px 4px #1a1a2e22;
}

.info-content {
  padding: 14px 22px 8px 22px;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 0px;
  gap: 18px;
}

.text-content {
  flex: 1;
  overflow: hidden;
  margin-right: 10px;
}

.info-label {
  font-size: 0.8rem;
  color: #a0a8c3;
  margin-bottom: 4px;
  letter-spacing: 0.2px;
}

.text-preview {
  font-size: 0.95rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  padding: 5px 10px;
  background: linear-gradient(90deg, #232946 60%, #2d3250 100%);
  border-left: 3px solid #7fffd4;
  margin-top: 2px;
  border-radius: 6px;
  color: #e0e6f7;
  box-shadow: 0 1px 4px #1a1a2e22;
}

.element-stats {
  display: flex;
  gap: 18px;
  margin-left: 8px;
}

.stat-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  background: linear-gradient(135deg, #232946 60%, #2d3250 100%);
  padding: 7px 14px;
  border-radius: 8px;
  margin: 0 3px;
  box-shadow: 0 1px 4px #1a1a2e22;
}

.stat-value {
  font-size: 1.08rem;
  font-weight: bold;
  color: #7fffd4;
  margin-bottom: 2px;
  text-shadow: 0 1px 4px #1a1a2e44;
}

.stat-label {
  font-size: 0.8rem;
  color: #a0a8c3;
}

.attributes-list {
  padding: 7px 22px 14px 22px;
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  background: transparent;
}

.attribute-item {
  background: linear-gradient(90deg, #232946 60%, #2d3250 100%);
  padding: 5px 12px;
  border-radius: 6px;
  font-size: 0.85rem;
  display: flex;
  align-items: center;
  gap: 7px;
  border: 1px solid #3e4a7b;
  margin: 2px;
  color: #e0e6f7;
  box-shadow: 0 1px 4px #1a1a2e22;
}

.attr-name {
  color: #ffb86c;
}

.attr-value {
  color: #7fffd4;
  max-width: 120px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.comp-desc {
  margin: 10px 0 0 0;
  font-size: 1.05rem;
  color: #ffb86c;
  display: flex;
  align-items: center;
  gap: 8px;
  background: linear-gradient(90deg, #232946 60%, #2d3250 100%);
  border-radius: 6px;
  padding: 5px 12px;
  box-shadow: 0 1px 4px #1a1a2e22;
}

.desc-value {
  color: #7fffd4;
  font-size: 1.05rem;
  font-weight: 500;
  letter-spacing: 0.2px;
}

@media (max-width: 600px) {
  .element-info-panel {
    width: 98vw;
    min-width: 0;
    border-radius: 12px;
  }
  .info-header,
  .info-content,
  .attributes-list {
    padding-left: 10px;
    padding-right: 10px;
  }
}
</style>
