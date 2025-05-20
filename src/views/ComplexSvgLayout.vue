<template>
  <div class="complex-layout">
    <header class="header">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="48"
        height="48"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <circle cx="12" cy="12" r="10" />
        <path d="m16 12-4 4-4-4" />
        <path d="M12 8v8" />
      </svg>
      <h1>复杂 SVG 布局示例</h1>
      <p>这是一个包含 SVG 图标和多种布局元素的 Vue 组件。</p>
    </header>
    <section class="card-section">
      <div class="card">
        <h2>卡片一</h2>
        <p>卡片内容，带有阴影和圆角。</p>
      </div>
      <div class="card">
        <h2>卡片二</h2>
        <p>更多内容展示。</p>
      </div>
      <div class="card">
        <h2>卡片三</h2>
        <p>支持响应式布局。</p>
      </div>
    </section>
    <section class="image-section">
      <img
        src="https://images.unsplash.com/photo-1533738363-b7f9aef128ce?q=80&w=400&auto=format&fit=crop"
        alt="示例图片"
      />
      <div class="image-desc">图片说明文字</div>
    </section>
  </div>
</template>

<script setup lang="ts">
// 这里可以添加逻辑
</script>

<style scoped>
.complex-layout {
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  padding: 30px;
  background: #f7fafc;
  min-height: 100vh;
}
.header {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  margin-bottom: 30px;
}
.header svg {
  color: #42b983;
}
.header h1 {
  font-size: 2rem;
  margin: 0;
}
.header p {
  color: #666;
  margin: 0;
}
.card-section {
  display: flex;
  gap: 20px;
  justify-content: center;
  margin-bottom: 30px;
  flex-wrap: wrap;
}
.card {
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  padding: 20px 30px;
  min-width: 180px;
  max-width: 220px;
  text-align: center;
}
.card h2 {
  margin: 0 0 10px 0;
  font-size: 1.2rem;
  color: #2c3e50;
}
.card p {
  margin: 0;
  color: #888;
}
.image-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
}
.image-section img {
  max-width: 320px;
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.07);
}
.image-desc {
  color: #555;
  font-size: 1rem;
}
@media (max-width: 600px) {
  .card-section {
    flex-direction: column;
    align-items: center;
  }
  .card {
    max-width: 90vw;
    min-width: 0;
  }
}
</style>
