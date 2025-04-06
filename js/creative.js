// 创意互动角主逻辑
document.addEventListener('DOMContentLoaded', function() {
    // 初始化画布
    const canvas = document.getElementById('creative-canvas');
    const ctx = canvas.getContext('2d');
    let isDrawing = false;
    let currentTool = 'pattern';
    let currentColor = 'blue';
    let oxidationLevel = 0;
    
    // 设置画布尺寸
    function resizeCanvas() {
        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;
        drawBackground();
    }
    
    // 绘制背景文物残影
    function drawBackground() {
        ctx.fillStyle = 'rgba(10, 10, 10, 1)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // 添加文物X光底图
        const img = new Image();
        img.src = 'images/xray-bg.png';
        img.onload = function() {
            ctx.globalAlpha = 0.15;
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
            ctx.globalAlpha = 1.0;
        };
    }
    
    // 初始化工具交互
    function initTools() {
        // 工具选择
        document.querySelectorAll('.tool-icon').forEach(icon => {
            icon.addEventListener('click', function() {
                currentTool = this.dataset.tool;
                updateCursor();
                
                // 显示工具激活状态
                document.querySelectorAll('.tool-icon').forEach(i => i.classList.remove('active'));
                this.classList.add('active');
                
                // 工具特定功能
                if (currentTool === 'pattern') {
                    // 显示操作指引
                    const guide = document.getElementById('tool-guide');
                    guide.textContent = '纹样提取工具已激活 - 请在画布上绘制文物纹样';
                    guide.style.display = 'block';
                    
                    // 高亮画布边框
                    canvas.style.border = '3px solid #2E5266';
                    setTimeout(() => {
                        canvas.style.border = '1px solid #ccc';
                    }, 2000);
                    
                    // 自动选择蓝色作为默认颜色
                    document.querySelector('.color-option[data-color="blue"]').click();
                } else if (currentTool === 'material') {
                    const guide = document.getElementById('tool-guide');
                    guide.textContent = '材质模拟工具已激活 - 选择颜色后在画布上涂抹应用材质效果';
                    guide.style.display = 'block';
                }
            });
        });
        
        // 颜色选择
        document.querySelectorAll('.color-option').forEach(color => {
            color.addEventListener('click', function() {
                // 移除其他选项的选中状态
                document.querySelectorAll('.color-option').forEach(opt => {
                    opt.classList.remove('selected');
                });
                
                // 设置当前选中状态
                this.classList.add('selected');
                currentColor = this.dataset.color;
                updateCursor();
            });
            
            // 默认选中蓝色选项
            if (color.dataset.color === 'blue') {
                color.classList.add('selected');
            }
        });
        
        // 氧化程度控制
        const slider = document.querySelector('.oxidation-slider');
        slider.addEventListener('input', function() {
            oxidationLevel = parseInt(this.value);
            updateOxidationEffect();
        });
    }
    
    // 更新光标样式
    function updateCursor() {
        switch(currentTool) {
            case 'pattern':
                canvas.style.cursor = 'crosshair';
                break;
            case 'material':
                canvas.style.cursor = 'pointer';
                break;
            case 'ar':
                canvas.style.cursor = 'move';
                break;
        }
    }
    
    // 更新氧化效果
    function updateOxidationEffect() {
        // 根据氧化程度调整画布滤镜
        const greenValue = Math.min(100, oxidationLevel * 0.7);
        canvas.style.filter = `sepia(${oxidationLevel}%) hue-rotate(${greenValue}deg)`;
    }
    
    // 画布绘制逻辑
    function initDrawing() {
        canvas.addEventListener('mousedown', startDrawing);
        canvas.addEventListener('mousemove', draw);
        canvas.addEventListener('mouseup', stopDrawing);
        canvas.addEventListener('mouseout', stopDrawing);
        
        function startDrawing(e) {
            isDrawing = true;
            draw(e);
        }
        
        function draw(e) {
            if (!isDrawing) return;
            
            const rect = canvas.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            ctx.lineWidth = 5;
            ctx.lineCap = 'round';
            ctx.lineJoin = 'round';
            
            // 根据工具和颜色设置样式
            switch(currentTool) {
                case 'pattern':
                    ctx.strokeStyle = getPatternColor();
                    ctx.globalCompositeOperation = 'source-over';
                    break;
                case 'material':
                    ctx.strokeStyle = getMaterialColor();
                    ctx.globalCompositeOperation = 'multiply';
                    break;
            }
            
            ctx.lineTo(x, y);
            ctx.stroke();
            ctx.beginPath();
            ctx.moveTo(x, y);
        }
        
        function stopDrawing() {
            isDrawing = false;
            ctx.beginPath();
        }
    }
    
    // 获取图案颜色
    function getPatternColor() {
        switch(currentColor) {
            case 'blue': return '#2E5266';
            case 'tang': return '#e63946';
            case 'bronze': return '#d4af37';
            default: return '#2E5266';
        }
    }
    
    // 获取材质颜色
    function getMaterialColor() {
        switch(currentColor) {
            case 'blue': 
                return createMaterialTexture('#2E5266', 'ceramic');
            case 'tang': 
                return createMaterialTexture('#e63946', 'pottery');
            case 'bronze': 
                return createMaterialTexture('#d4af37', 'metal');
            default: 
                return createMaterialTexture('#2E5266', 'ceramic');
        }
    }
    
    // 创建材质纹理
    function createMaterialTexture(baseColor, type) {
        const patternCanvas = document.createElement('canvas');
        patternCanvas.width = 100;
        patternCanvas.height = 100;
        const patternCtx = patternCanvas.getContext('2d');
        
        // 根据材质类型创建不同纹理
        switch(type) {
            case 'ceramic':
                // 青花瓷纹理
                patternCtx.fillStyle = baseColor;
                patternCtx.fillRect(0, 0, 100, 100);
                patternCtx.globalAlpha = 0.3;
                for(let i=0; i<20; i++) {
                    patternCtx.beginPath();
                    patternCtx.arc(
                        Math.random()*100, 
                        Math.random()*100, 
                        Math.random()*5+2, 
                        0, Math.PI*2
                    );
                    patternCtx.fillStyle = '#fff';
                    patternCtx.fill();
                }
                break;
                
            case 'pottery':
                // 唐三彩纹理
                patternCtx.fillStyle = baseColor;
                patternCtx.fillRect(0, 0, 100, 100);
                patternCtx.globalAlpha = 0.4;
                for(let i=0; i<30; i++) {
                    patternCtx.beginPath();
                    patternCtx.moveTo(
                        Math.random()*100, 
                        Math.random()*100
                    );
                    patternCtx.lineTo(
                        Math.random()*100, 
                        Math.random()*100
                    );
                    patternCtx.strokeStyle = '#fff';
                    patternCtx.lineWidth = 1;
                    patternCtx.stroke();
                }
                break;
                
            case 'metal':
                // 青铜器纹理
                patternCtx.fillStyle = baseColor;
                patternCtx.fillRect(0, 0, 100, 100);
                patternCtx.globalAlpha = 0.5;
                for(let i=0; i<50; i++) {
                    patternCtx.beginPath();
                    patternCtx.rect(
                        Math.random()*100, 
                        Math.random()*100, 
                        Math.random()*10+2, 
                        Math.random()*10+2
                    );
                    patternCtx.fillStyle = '#000';
                    patternCtx.fill();
                }
                break;
        }
        
        return ctx.createPattern(patternCanvas, 'repeat');
    }
    
    // AR按钮功能
    function initARButton() {
        const arBtn = document.querySelector('.ar-button');
        arBtn.addEventListener('click', function() {
            alert('AR功能需要移动设备支持，请使用手机扫描二维码访问');
        });
    }
    
    // 初始化作品展示
    function initGallery() {
        // 这里可以添加从服务器加载用户作品的逻辑
        const gallery = document.querySelector('.artwork-tiles');
        
        // 清空现有内容
        gallery.innerHTML = '';
        
        // 示例作品
        const sampleWorks = [
    {
      id: 1,
      title: "青铜鼎",
      likes: 42,
      pattern: "bronze-pattern",
      image: "bronze-ding.png",
      author: "博物馆藏品"
    },
    {
      id: 2,
      title: "青花瓷瓶", 
      likes: 38,
      pattern: "blue-white-pattern",
      image: "blue-vase.png",
      author: "博物馆藏品"
    },
    {
      id: 3,
      title: "唐三彩马",
      likes: 29,
      pattern: "tang-tri-pattern",
      image: "tang-horse.png",
      author: "博物馆藏品"
    }
        ];
        
        sampleWorks.forEach(work => {
            const tile = document.createElement('div');
            tile.className = 'artwork-tile';
            tile.innerHTML = `
                <div class="tile-header" style="height: ${Math.min(150, work.likes)}px">
                <div class="artwork-image-container">
                    <img src="images/${work.image}" alt="${work.title}" class="artwork-image">
                    <div class="artwork-pattern-overlay ${work.pattern}"></div>
                </div>
                    <span class="artwork-title">${work.title}</span>
                </div>
                <div class="tile-body">
                    <div class="tile-author">${work.author}</div>
                    <div class="tile-likes">${work.likes} 点赞</div>
                </div>
            `;
            gallery.appendChild(tile);
        });
        
        // 添加调试信息
        console.log('已加载', sampleWorks.length, '个示例作品');
    }
    
    // 初始化所有功能
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    initTools();
    initDrawing();
    initARButton();
    initGallery();
});
