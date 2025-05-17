<template>
  <div class="home-view">
    <h2 class="title">将鼠标悬停在下方的元素上：</h2>
    <p class="instructions">
      启用悬停检测后，将鼠标移动到任何元素上，系统会自动检测并高亮显示。
    </p>

    <div class="grid-container">
      <div class="interactive-box featured" style="background-color: #42b983">
        <div class="box-content">
          <div class="icon-wrapper">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
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
          </div>
          <h3>方块 1</h3>
          <p>这是一个特色方块，带有图标和更多内容</p>
        </div>
      </div>

      <div class="interactive-box card-style" style="background-color: #2c3e50">
        <div class="card-header">
          <span class="card-badge">新</span>
          <h3>方块 2</h3>
        </div>
        <div class="card-body">
          <p>卡片式设计，带有标题和内容区域</p>
        </div>
        <div class="card-footer">
          <button class="card-button">查看详情</button>
        </div>
      </div>

      <div class="interactive-box gradient-box">
        <div class="gradient-content">
          <h3>方块 3</h3>
          <div class="stats">
            <div class="stat-item">
              <span class="stat-value">89%</span>
              <span class="stat-label">完成率</span>
            </div>
            <div class="stat-item">
              <span class="stat-value">12</span>
              <span class="stat-label">任务</span>
            </div>
          </div>
        </div>
      </div>

      <div class="interactive-box image-box">
        <img
          src="https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=500&auto=format&fit=crop&q=60"
          alt="抽象背景"
        />
        <div class="image-overlay">
          <h3>方块 4</h3>
          <p>带有背景图片的方块</p>
        </div>
      </div>

      <div class="interactive-box" style="background-color: #8e44ad80">
        方块 5
      </div>

      <div class="interactive-box" style="background-color: #e74c3c80">
        <div>方块 6</div>
      </div>
    </div>

    <div class="image-container">
      <img
        src="https://images.unsplash.com/photo-1533738363-b7f9aef128ce?q=80&w=400&auto=format&fit=crop"
        alt="示例图片"
      />
      <p>图片也可以悬停高亮</p>
    </div>

    <div class="text-block-container">
      <div class="text-block">
        这是一段可以悬停高亮的文本。尝试将鼠标移动到这段文字上，观察效果。
      </div>
      <button class="interactive-button">一个按钮</button>
    </div>
  </div>
</template>

<script setup lang="ts">
const getRandomColor = () => {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color + "80"; // Add alpha for some transparency
};
</script>

<style scoped>
.home-view {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 30px;
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
}

.title {
  font-size: 2rem;
  color: #2c3e50;
  margin-bottom: 0.5rem;
  text-align: center;
  position: relative;
  padding-bottom: 10px;
}

.title::after {
  content: "";
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 100px;
  height: 3px;
  background: linear-gradient(90deg, #42b983, #35495e);
  border-radius: 3px;
}

.instructions {
  text-align: center;
  color: #666;
  max-width: 600px;
  margin-bottom: 1rem;
}

.grid-container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(3, auto);
  gap: 25px;
  width: 90%;
  max-width: 900px;
}

/* 特色方块占据两列 */
.featured {
  grid-column: span 2;
  background: linear-gradient(135deg, #42b983, #2c8c67) !important;
  color: white;
  padding: 25px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.box-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 15px;
}

.icon-wrapper {
  background-color: rgba(255, 255, 255, 0.2);
  border-radius: 50%;
  width: 60px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 10px;
}

.box-content h3 {
  font-size: 1.5rem;
  margin: 0;
}

.box-content p {
  margin: 0;
  opacity: 0.9;
}

/* 卡片式方块 */
.card-style {
  display: flex;
  flex-direction: column;
  padding: 0 !important;
  overflow: hidden;
}

.card-header {
  padding: 15px;
  background-color: rgba(0, 0, 0, 0.2);
  position: relative;
}

.card-badge {
  position: absolute;
  top: 10px;
  right: 10px;
  background-color: #e74c3c;
  color: white;
  padding: 3px 8px;
  border-radius: 12px;
  font-size: 0.7rem;
  font-weight: bold;
}

.card-header h3 {
  margin: 0;
  color: white;
}

.card-body {
  padding: 15px;
  flex-grow: 1;
  color: white;
}

.card-body p {
  margin: 0;
}

.card-footer {
  padding: 15px;
  background-color: rgba(0, 0, 0, 0.1);
}

.card-button {
  width: 100%;
  padding: 8px;
  background-color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
  color: #2c3e50;
  transition: all 0.3s ease;
}

.card-button:hover {
  background-color: #f1f1f1;
  transform: translateY(-2px);
}

/* 渐变方块 */
.gradient-box {
  background: linear-gradient(
    45deg,
    #ff9a9e,
    #fad0c4,
    #fad0c4,
    #a1c4fd
  ) !important;
  padding: 20px !important;
  display: flex;
  align-items: center;
  justify-content: center;
}

.gradient-content {
  width: 100%;
}

.gradient-content h3 {
  margin: 0 0 15px 0;
  color: #333;
  text-align: center;
}

.stats {
  display: flex;
  justify-content: space-around;
}

.stat-item {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.stat-value {
  font-size: 1.5rem;
  font-weight: bold;
  color: #333;
}

.stat-label {
  font-size: 0.8rem;
  color: #666;
}

/* 图片方块 */
.image-box {
  position: relative;
  padding: 0 !important;
  overflow: hidden;
  height: 180px;
}

.image-box img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.image-box:hover img {
  transform: scale(1.1);
}

.image-overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.7), transparent);
  padding: 20px;
  color: white;
}

.image-overlay h3 {
  margin: 0 0 5px 0;
}

.image-overlay p {
  margin: 0;
  font-size: 0.9rem;
  opacity: 0.9;
}

.interactive-box {
  width: 100%;
  height: 180px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  font-weight: bold;
  font-size: 1.2rem;
  text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.5);
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.08);
}

.interactive-box:hover {
  transform: translateY(-5px) scale(1.03);
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1), 0 5px 15px rgba(0, 0, 0, 0.07);
}

.image-container {
  padding: 20px;
  border-radius: 12px;
  background-color: white;
  cursor: pointer;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  max-width: 450px;
  width: 90%;
}

.image-container:hover {
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.15);
  transform: translateY(-5px);
}

.image-container img {
  max-width: 100%;
  height: auto;
  border-radius: 8px;
  display: block;
  transition: all 0.3s ease;
}

.image-container:hover img {
  transform: scale(1.02);
}

.image-container p {
  margin-top: 15px;
  font-size: 1rem;
  color: #555;
  text-align: center;
}

.text-block-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  padding: 25px;
  background: linear-gradient(145deg, #f6f9fc, #e9ecef);
  border-radius: 16px;
  width: 90%;
  max-width: 650px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.05);
}

.text-block {
  padding: 20px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  cursor: pointer;
  background-color: white;
  width: 100%;
  transition: all 0.3s ease;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
  line-height: 1.6;
}

.text-block:hover {
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  border-color: #42b983;
}

.interactive-button {
  padding: 12px 25px;
  background: linear-gradient(135deg, #42b983, #2c8c67);
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1.1rem;
  font-weight: 600;
  transition: all 0.3s ease;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  letter-spacing: 0.5px;
}

.interactive-button:hover {
  background: linear-gradient(135deg, #3da876, #267a59);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
  transform: translateY(-2px);
}

@media (max-width: 768px) {
  .grid-container {
    grid-template-columns: 1fr;
  }

  .featured {
    grid-column: 1;
  }

  .interactive-box {
    height: 140px;
  }

  .title {
    font-size: 1.5rem;
  }
}
</style>
