// 详情页脚本
document.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    const relicName = urlParams.get('id') || "青铜器：商代四羊方尊"; // 默认显示四羊方尊

    // 文物数据 (与forum.html中的文物对应)
    const culturalRelics = [
        {
            id: "青铜器：商代四羊方尊",
            title: "青铜器：商代四羊方尊",
            author: "青铜器专家",
            dynasty: "商代",
            content: "四羊方尊是中国现存商代青铜方尊中最大的一件，1938年出土于湖南宁乡县。尊高58.3厘米，重34.5公斤，造型雄奇，肩部四角是四个卷角羊头，尊腹即为羊的前胸，羊腿则附于高圈足上。整个器物用块范法浇铸，一气呵成，显示了高超的铸造水平。",
            avatar: "images/user-avatar.jpg",
            image: "images/british-museum.png",
            timestamp: "2025-04-05T10:00:00Z"
        },
        {
            id: "瓷器：北宋汝窑天青釉碗",
            title: "瓷器：北宋汝窑天青釉碗",
            author: "瓷器专家",
            dynasty: "北宋",
            content: "汝窑为宋代五大名窑之首，以天青釉闻名于世。这件天青釉碗造型简洁优雅，釉色如雨后初晴的天空，釉面开片自然，底部有三个细小支钉痕。",
            avatar: "images/user-avatar.jpg",
            image: "images/judge-good.png.jpg",
            timestamp: "2025-04-05T09:30:00Z"
        },
        {
            id: "书画：清明上河图",
            title: "书画：清明上河图",
            author: "书画专家",
            dynasty: "北宋",
            content: "清明上河图是北宋画家张择端创作的绢本设色画，现藏于北京故宫博物院。作品宽24.8厘米，长528.7厘米，生动记录了北宋都城汴京的城市面貌和当时社会各阶层人民的生活状况。",
            avatar: "images/user-avatar.jpg",
            image: "images/british-museum.png",
            timestamp: "2025-04-05T09:15:00Z"
        },
        {
            id: 13,
            title: "周.青铜饕餮纹尊",
            author: "历史系学生",
            dynasty: "西周",
            content: "这个纹饰好特别，有人知道它的含义吗？",
            avatar: "images/user-avatar.jpg",
            image: "images/周.青铜饕餮纹尊.jpg",
            timestamp: "2025-04-05T09:30:00Z"
        },
        {
            id: 14,
            title: "战国.云纹漆器",
            author: "艺术爱好者",
            dynasty: "战国",
            content: "这个漆器的云纹好美啊！",
            avatar: "images/user-avatar.jpg",
            image: "images/战国.云纹漆器.jpg",
            timestamp: "2025-04-05T09:15:00Z"
        },
        {
            id: 15,
            title: "秦.兵马俑制作之谜",
            author: "旅行者",
            dynasty: "秦代",
            content: "刚参观完兵马俑，太壮观了！",
            avatar: "images/user-avatar.jpg",
            image: "images/秦.兵马俑制作之谜.jpg",
            timestamp: "2025-04-05T09:00:00Z"
        }
    ];

    // 评论数据
    const commentsData = {
        "青铜器：商代四羊方尊": [
            {
                id: 1,
                author: "青铜器专家",
                content: "四羊方尊是中国青铜铸造工艺的巅峰之作，四个卷角羊头造型独特，体现了商代工匠高超的技艺。羊在古代象征吉祥，可能与祭祀活动有关。",
                likes: 120,
                isLiked: false,
                isBookmarked: false,
                isExpert: true,
                timestamp: "2025-04-05T09:30:00Z"
            },
            {
                id: 2,
                author: "博物馆讲解员",
                content: "这件文物出土于河南安阳殷墟，是商王武丁为祭祀其母戊而铸造的。",
                likes: 85,
                isLiked: false,
                isBookmarked: false,
                timestamp: "2025-04-05T09:15:00Z"
            },
            {
                id: 4,
                author: "历史爱好者",
                content: "每次看到这件文物都感到震撼，古人的铸造技术太厉害了！",
                likes: 42,
                isLiked: false,
                isBookmarked: false,
                timestamp: "2025-04-05T08:45:00Z"
            },
            {
                id: 5,
                author: "考古学生",
                content: "请问鼎腿上的纹饰有什么特殊含义吗？",
                likes: 28,
                isLiked: false,
                isBookmarked: false,
                timestamp: "2025-04-05T08:30:00Z"
            },
            {
                id: 6,
                author: "文物修复专家",
                content: "这件文物在1959年曾进行过大规模修复，修复过程采用了传统工艺与现代技术相结合的方法。",
                likes: 76,
                isLiked: false,
                isBookmarked: false,
                isExpert: true,
                timestamp: "2025-04-05T08:15:00Z"
            }
        ],
        "瓷器：北宋汝窑天青釉碗": [
            {
                id: 3,
                author: "瓷器专家",
                content: "汝窑天青釉被誉为'雨过天青云破处'，釉色温润如玉，开片自然。这件碗底部有三个细小支钉痕，是典型的汝窑特征。",
                likes: 95,
                isLiked: false,
                isBookmarked: false,
                isExpert: true,
                timestamp: "2025-04-05T09:15:00Z"
            },
            {
                id: 7,
                author: "艺术史教授",
                content: "从纹饰风格判断，这件青铜尊应属于西周中期作品，具有典型的王室礼器特征。",
                likes: 63,
                isLiked: false,
                isBookmarked: false,
                isExpert: true,
                timestamp: "2025-04-05T09:00:00Z"
            },
            {
                id: 8,
                author: "游客",
                content: "纹饰好精美啊！不知道古人是怎么雕刻出来的？",
                likes: 31,
                isLiked: false,
                isBookmarked: false,
                timestamp: "2025-04-05T08:45:00Z"
            },
            {
                id: 9,
                author: "青铜器收藏家",
                content: "这种纹饰在拍卖会上很受欢迎，具有很高的艺术价值。",
                likes: 47,
                isLiked: false,
                isBookmarked: false,
                timestamp: "2025-04-05T08:30:00Z"
            }
        ],
        "书画：清明上河图": [
            {
                id: 10,
                author: "书画专家",
                content: "清明上河图描绘了北宋汴京的繁华景象，画中有814个人物、60多匹牲畜、28艘船只，生动展现了宋代城市生活。",
                likes: 58,
                isLiked: false,
                isBookmarked: false,
                isExpert: true,
                timestamp: "2025-04-05T09:00:00Z"
            },
            {
                id: 11,
                author: "工艺研究员",
                content: "战国漆器制作工艺极为复杂，需经过数十道工序才能完成。",
                likes: 72,
                isLiked: false,
                isBookmarked: false,
                isExpert: true,
                timestamp: "2025-04-05T08:45:00Z"
            },
            {
                id: 12,
                author: "美术学生",
                content: "云纹的线条流畅优美，想临摹学习这种纹样！",
                likes: 35,
                isLiked: false,
                isBookmarked: false,
                timestamp: "2025-04-05T08:30:00Z"
            }
        ],
        "周.青铜饕餮纹尊": [
            {
                id: 13,
                author: "考古学家",
                content: "兵马俑的发现改写了世界对中国古代雕塑艺术的认知。",
                likes: 89,
                isLiked: false,
                isBookmarked: false,
                isExpert: true,
                timestamp: "2025-04-05T09:15:00Z"
            },
            {
                id: 14,
                author: "历史教师",
                content: "每个兵马俑的面部表情都独一无二，展现了秦代工匠的高超技艺。",
                likes: 64,
                isLiked: false,
                isBookmarked: false,
                timestamp: "2025-04-05T09:00:00Z"
            },
            {
                id: 15,
                author: "旅游博主",
                content: "现场看比照片震撼多了，推荐大家都去看看！",
                likes: 52,
                isLiked: false,
                isBookmarked: false,
                timestamp: "2025-04-05T08:45:00Z"
            }
        ]
    };

    // 查找当前文物
    const currentRelic = culturalRelics.find(relic => relic.id === relicName);
    
    if (currentRelic) {
        // 渲染文物详情
        renderRelicDetails(currentRelic);
        
        // 渲染评论
        renderComments(currentRelic.id);
    } else {
        // 默认显示第一个文物
        renderRelicDetails(culturalRelics[0]);
        renderComments(culturalRelics[0].id);
    }

    // 渲染文物详情
    function renderRelicDetails(relic) {
        document.getElementById('relic-title').textContent = relic.title;
        document.getElementById('relic-name').textContent = relic.title;
        document.getElementById('relic-author').textContent = relic.author;
        document.getElementById('relic-dynasty').textContent = relic.dynasty;
        document.getElementById('relic-content').textContent = relic.content;
        document.getElementById('relic-avatar').src = relic.avatar;
        document.getElementById('relic-image').src = relic.image;
        document.getElementById('relic-time').textContent = new Date(relic.timestamp).toLocaleString();
    }

    // 渲染评论
    function renderComments(relicId) {
        const commentsContainer = document.getElementById('comments-container');
        const comments = commentsData[relicId] || [];
        
        commentsContainer.innerHTML = '';
        
        // 排序评论 - 专家评论置顶
        const sortedComments = [...comments].sort((a, b) => {
            if (a.isExpert && !b.isExpert) return -1;
            if (!a.isExpert && b.isExpert) return 1;
            return 0;
        });

        sortedComments.forEach(comment => {
            const commentElement = document.createElement('div');
            commentElement.className = `comment ${comment.isExpert ? 'expert-comment' : ''}`;
            commentElement.innerHTML = `
                <div class="comment-header">
                    <img src="images/${comment.author.includes('专家') ? 'expert-avatar.jpg' : 'user-avatar.jpg'}" 
                         alt="${comment.author}头像" class="avatar">
                    <div>
                        <span class="comment-author">${comment.author}</span>
                        <span class="comment-time">${new Date(comment.timestamp).toLocaleString()}</span>
                    </div>
                </div>
                <div class="comment-content">
                    <p>${comment.content}</p>
                </div>
                <div class="comment-actions">
                    <button class="like-btn ${comment.isLiked ? 'liked' : ''}" 
                            data-comment-id="${comment.id}">
                        👍 点赞 (${comment.likes})
                    </button>
                    <button class="bookmark-btn ${comment.isBookmarked ? 'bookmarked' : ''}" 
                            data-comment-id="${comment.id}">
                        ⭐ 收藏
                    </button>
                </div>
            `;
            commentsContainer.appendChild(commentElement);
        });

        // 添加评论点赞事件
        document.querySelectorAll('.like-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                const commentId = parseInt(this.dataset.commentId);
                const comment = comments.find(c => c.id === commentId);
                
                comment.isLiked = !comment.isLiked;
                comment.likes += comment.isLiked ? 1 : -1;
                
                this.classList.toggle('liked');
                this.innerHTML = `👍 点赞 (${comment.likes})`;
            });
        });

        // 添加评论收藏事件
        document.querySelectorAll('.bookmark-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                const commentId = parseInt(this.dataset.commentId);
                const comment = comments.find(c => c.id === commentId);
                
                comment.isBookmarked = !comment.isBookmarked;
                this.classList.toggle('bookmarked');
            });
        });
    }

    // 评论表单提交
    document.querySelector('.comment-form').addEventListener('submit', function(e) {
        e.preventDefault();
        const textarea = this.querySelector('textarea');
        const content = textarea.value.trim();
        
        if (content) {
            addComment(content);
            textarea.value = '';
        }
    });

    // 添加评论
    function addComment(content) {
        const commentsContainer = document.getElementById('comments-container');
        const newComment = {
            id: Date.now(),
            author: "游客",
            content: content,
            likes: 0,
            isLiked: false,
            isBookmarked: false,
            timestamp: new Date().toISOString()
        };
        
        const currentRelicId = currentRelic ? currentRelic.id : culturalRelics[0].id;
        
        if (!commentsData[currentRelicId]) {
            commentsData[currentRelicId] = [];
        }
        
        commentsData[currentRelicId].unshift(newComment);
        renderComments(currentRelicId);
    }
});
