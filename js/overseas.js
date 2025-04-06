// 海外遗珍页面功能
document.addEventListener('DOMContentLoaded', function() {
    // 文物数据
    const artifacts = [
        {
            id: 1,
            name: "唐三彩马",
            type: "pottery",
            era: "唐代",
            material: "三彩釉陶",
            size: "高约60cm",
            images: ["images/tang-sancai-horse.png"],
            description: "唐代三彩釉陶马",
            details: "这件唐三彩马造型生动，釉色鲜艳，是唐代陶俑艺术的代表作。马匹姿态雄健，反映了唐代对西域良马的喜爱和丝绸之路文化交流的繁荣。"
        },
        {
            id: 2,
            name: "鎏金舞马衔杯银壶",
            type: "silver",
            era: "唐代",
            material: "银鎏金",
            size: "高约18cm",
            images: ["images/silver-horse-cup.png"],
            description: "唐代宫廷酒器",
            details: "这件银壶造型为舞马衔杯，工艺精湛，反映了唐代宫廷宴饮文化和马术表演的盛况。壶身鎏金装饰华丽，是唐代金银器工艺的杰出代表。"
        },
        {
            id: 3,
            name: "汝窑天青釉碗",
            type: "porcelain",
            era: "宋代",
            material: "天青釉瓷",
            size: "直径约15cm",
            images: ["images/ru-ware-bowl.png"],
            description: "宋代汝窑珍品",
            details: "汝窑为宋代五大名窑之首，此碗釉色天青，开片自然，胎质细腻，是宋代瓷器艺术的巅峰之作。传世汝窑器极为稀少，具有极高的艺术价值。"
        },
        {
            id: 4,
            name: "定窑白瓷孩儿枕",
            type: "porcelain",
            era: "宋代",
            material: "白瓷",
            size: "长约30cm",
            images: ["images/ding-ware-pillow.png"],
            description: "宋代定窑白瓷枕",
            details: "这件孩儿枕造型生动可爱，釉色洁白如雪，是宋代定窑的代表作。枕面微凹，符合人体工学，兼具实用性和艺术性。"
        },
        {
            id: 5,
            name: "地狱善行判官",
            type: "painting",
            era: "明代",
            material: "绢本设色",
            size: "约200×150cm",
            images: ["images/judge-good.png"],
            description: "明代佛教绘画",
            details: "这幅画描绘了地狱中的善行判官形象，色彩浓烈，线条流畅，反映了明代佛教绘画的艺术风格和地狱审判的宗教观念。"
        },
        {
            id: 6,
            name: "地狱恶行判官",
            type: "painting",
            era: "明代",
            material: "绢本设色",
            size: "约200×150cm",
            images: ["images/judge-bad.png"],
            description: "明代佛教绘画",
            details: "与善行判官相对应，这幅画描绘了地狱中惩罚恶行的判官形象，构图严谨，人物表情威严，具有强烈的宗教警示意义。"
        },
        {
            id: 7,
            name: "景泰蓝龙纹大盖罐",
            type: "cloisonne",
            era: "明代",
            material: "景泰蓝",
            size: "高约45cm",
            images: ["images/cloisonne-dragon.png"],
            description: "宣德年间御用监制作的景泰蓝器皿",
            details: "此罐采用景泰蓝工艺制作，金属丝网形成图案后填充彩色珐琅。根据罐子边缘铭文，它是在宣德皇帝(1426-36年)监督下，由'御用监'的宦官制作。"
        },
        {
            id: 8,
            name: "景泰蓝曼陀罗",
            type: "cloisonne",
            era: "清代",
            material: "景泰蓝",
            size: "直径约60cm",
            images: ["images/cloisonne-mandala.png"],
            description: "乾隆时期佛教法器",
            details: "这件曼陀罗制作精美，采用景泰蓝工艺，装饰有珊瑚镶嵌。从屋檐下悬挂的铃铛由玉石和银制成，原本供奉着一尊佛像，是清代宫廷佛教艺术的重要见证。"
        },
        {
            id: 9,
            name: "掐丝珐琅景泰蓝曼陀罗",
            type: "cloisonne",
            era: "清代",
            material: "景泰蓝",
            size: "直径约60cm",
            images: ["images/enamel-mandala.png"],
            description: "乾隆时期佛教法器",
            details: "乾隆皇帝(1736-1795年)下令制作了一系列景泰蓝珐琅彩曼陀罗(宇宙的微观世界，其中居住着佛陀)。这件曼陀罗制作于1772年，装饰有珊瑚镶嵌的景泰蓝，是藏传佛教艺术与清代工艺的完美结合。"
        }
    ];

    // 生成文物卡片
    const grid = document.querySelector('.artifact-grid');
    artifacts.forEach(artifact => {
        const card = document.createElement('div');
        card.className = 'artifact-card';
        card.dataset.id = artifact.id;
        card.dataset.type = artifact.type;
        card.style.backgroundImage = `url(images/${artifact.type}-pattern.png)`;
        
        card.innerHTML = `
            <div class="card-content">
                <h3>${artifact.name}</h3>
                <p>${artifact.era}</p>
                <div class="era-marker">${getEraMarker(artifact.type)}</div>
                <div class="card-preview">
                    <img src="images/${artifact.images[0]}" alt="${artifact.name}">
                </div>
            </div>
        `;
        
        // 添加点击事件
        card.addEventListener('click', () => openArtifactModal(artifact));
        
        // 智能瀑布流高度计算
        const img = new Image();
        img.src = `images/${artifact.images[0]}`;
        img.onload = function() {
            const aspectRatio = this.height / this.width;
            card.style.gridRowEnd = `span ${Math.ceil(aspectRatio * 2)}`;
        };
        
        grid.appendChild(card);
    });

    // 初始化放大镜
    function initMagnifier() {
        const magnifier = document.querySelector('.magnifier-glass');
        const slideshow = document.querySelector('.artifact-slideshow');
        
        slideshow.addEventListener('mousemove', (e) => {
            const img = slideshow.querySelector('.slide.active img');
            if (!img) return;
            
            const rect = img.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            magnifier.style.backgroundImage = `url(${img.src})`;
            magnifier.style.backgroundPosition = `-${x * 2}px -${y * 2}px`;
            magnifier.style.left = `${e.clientX + 20}px`;
            magnifier.style.top = `${e.clientY + 20}px`;
            magnifier.style.display = 'block';
        });
        
        slideshow.addEventListener('mouseleave', () => {
            magnifier.style.display = 'none';
        });
    }

    // 打开文物详情模态框
    function openArtifactModal(artifact) {
        const modal = document.querySelector('.artifact-modal');
        const slideshow = modal.querySelector('.artifact-slideshow');
        
        // 创建轮播内容
        slideshow.innerHTML = artifact.images.map(img => `
            <div class="slide">
                <img src="images/${img}" alt="${artifact.name}">
            </div>
        `).join('');
        
        // 初始化绘图画布
        initDrawingCanvas(artifact.type);
        
        modal.style.display = 'block';
    }

    // 初始化绘图功能
    function initDrawingCanvas(type) {
        const canvas = document.getElementById('drawing-canvas');
        const ctx = canvas.getContext('2d');
        
        // 根据文物类型设置画布背景
        switch(type) {
            case 'bronze':
                // 青铜器背景
                break;
            case 'porcelain':
                // 瓷器背景
                break;
            case 'scroll':
                // 经卷背景
                break;
        }
        
        // 绘图工具事件
        document.querySelectorAll('.brush-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                currentBrush = this.dataset.brush;
            });
        });
    }

    // 获取年代标记符号
    function getEraMarker(type) {
        const markers = {
            bronze: "鼎",
            porcelain: "瓷",
            scroll: "卷"
        };
        return markers[type] || "";
    }

    // 关闭模态框
    document.querySelector('.close-modal').addEventListener('click', function() {
        document.querySelector('.artifact-modal').style.display = 'none';
    });
});
