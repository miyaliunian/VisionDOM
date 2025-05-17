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
  };
});
</script>

<style scoped>
.element-info-panel {
  position: absolute;
  /* bottom: -200px; */
  left: 0;
  /* width: 100%; */
  width: 600px;
  min-width: 400px;
  background-color: #37086b;
  color: #ffffff;
  border-radius: 8px;
  opacity: 0;
  transform: translateY(10px);
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  overflow: hidden;
  max-height: 0;
  z-index: 1001;
  font-family: "Microsoft YaHei", sans-serif;
  border: 1px solid #5a1ca8;
  margin-top: 0px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
}

.element-info-panel.show {
  opacity: 1;
  transform: translateY(0);
  max-height: 220px;
  min-height: 120px;
}

.info-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 15px;
  background-color: #4b1098;
  border-bottom: 1px solid #5a1ca8;
  margin-bottom: 5px;
}

.element-type {
  display: flex;
  align-items: center;
  gap: 8px;
}

.tag-name {
  color: #42b6ff;
  font-weight: bold;
}

.element-id {
  color: #ff9c00;
}

.element-class {
  color: #42b6ff;
}

.element-size {
  font-size: 0.8rem;
  color: #b8b8b8;
  background-color: rgba(0, 0, 0, 0.2);
  padding: 3px 8px;
  border-radius: 10px;
  margin-left: 10px;
}

.info-content {
  padding: 10px 15px;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 5px;
}

.text-content {
  flex: 1;
  overflow: hidden;
  margin-right: 15px;
}

.info-label {
  font-size: 0.7rem;
  color: #b8b8b8;
  margin-bottom: 4px;
}

.text-preview {
  font-size: 0.85rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  padding: 4px 8px;
  background-color: rgba(0, 0, 0, 0.2);
  border-left: 2px solid #42b6ff;
  margin-top: 2px;
}

.element-stats {
  display: flex;
  gap: 20px;
  margin-left: 10px;
}

.stat-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.2);
  padding: 6px 10px;
  border-radius: 4px;
  margin: 0 5px;
}

.stat-value {
  font-size: 1rem;
  font-weight: bold;
  color: #42b6ff;
  margin-bottom: 2px;
}

.stat-label {
  font-size: 0.7rem;
  color: #b8b8b8;
}

.attributes-list {
  padding: 5px 15px 12px;
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  background-color: #37086b;
}

.attribute-item {
  background-color: #4b1098;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 0.75rem;
  display: flex;
  align-items: center;
  gap: 6px;
  border: 1px solid #5a1ca8;
  margin: 2px;
}

.attr-name {
  color: #ff9c00;
}

.attr-value {
  color: #42b6ff;
  max-width: 100px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
