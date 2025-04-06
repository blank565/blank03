// 论坛交互逻辑
document.addEventListener('DOMContentLoaded', function() {
    // 发帖表单提交处理
    const postForm = document.querySelector('.post-form');
    if (postForm) {
        postForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const textarea = this.querySelector('textarea');
            const content = textarea.value.trim();
            const category = this.querySelector('#era-select').value;
            const tags = Array.from(this.querySelectorAll('input[name="tags"]:checked')).map(el => el.value);
            
            // 验证表单
            if (!content) {
                alert('请输入帖子内容！');
                textarea.focus();
                return;
            }
            
            if (category === '') {
                alert('请选择历史时期！');
                this.querySelector('#era-select').focus();
                return;
            }
            
            if (tags.length === 0) {
                alert('请至少选择一个标签！');
                this.querySelector('input[name="tags"]').focus();
                return;
            }

            console.log('表单验证通过，准备提交...');
            
            // 创建新帖子
            const title = this.querySelector('#post-title').value.trim() || '新讨论';
            const newPost = document.createElement('article');
            newPost.className = 'post';
            newPost.innerHTML = `
                <header>
                    <h3>${title}</h3>
                    <div>
                        <span class="author">新用户</span>
                        <span class="dynasty">${category}</span>
                    </div>
                </header>
                <div class="content">
                    <p>${content}</p>
                    <div class="post-tags">
                        ${tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                    </div>
                </div>
                <footer>
                    <button class="like-btn">👍 点赞 (0)</button>
                    <button class="bookmark-btn">⭐ 收藏</button>
                    <button class="delete-btn">🗑️ 删除</button>
                </footer>
            `;
                
            // 添加到帖子流顶部
            document.querySelector('.posts-stream').prepend(newPost);
            
            // 初始化新帖子的交互
            initPostInteractions(newPost);
            
            // 保存帖子到localStorage
            try {
                const posts = JSON.parse(localStorage.getItem('forumPosts')) || [];
                console.log('当前存储的帖子数量:', posts.length);
                console.log('帖子详情:', posts);
                posts.unshift({
                title: title,
                author: "新用户",
                dynasty: category,
                content: content,
                tags: tags,
                likes: 0
            });
                localStorage.setItem('forumPosts', JSON.stringify(posts));
                console.log('帖子已保存到localStorage');
                
                // 重置整个表单
                textarea.value = '';
                document.getElementById('post-title').value = '';
                this.querySelector('#era-select').selectedIndex = 0;
                this.querySelectorAll('input[name="tags"]:checked').forEach(checkbox => {
                    checkbox.checked = false;
                });
                
                // 显示成功提示
                alert('帖子发布成功！');
            } catch (e) {
                console.error('保存帖子失败:', e);
                alert('保存帖子失败: ' + e.message + '\n请检查浏览器是否支持localStorage或尝试刷新页面');
                console.log('尝试保存的内容:', {
                    title: "新讨论",
                    author: "新用户", 
                    dynasty: category,
                    content: content,
                    tags: tags,
                    likes: 0
                });
            }
        });
    }

    // 初始化帖子交互功能
    function initPostInteractions(post) {
        // 点赞按钮
        const likeBtn = post.querySelector('.like-btn');
        likeBtn.addEventListener('click', function() {
            const countText = this.textContent.match(/\((\d+)\)/);
            if (countText) {
                const count = parseInt(countText[1]);
                this.textContent = `👍 点赞 (${count + 1})`;
                this.classList.toggle('liked');
            }
        });

        // 收藏按钮
        const bookmarkBtn = post.querySelector('.bookmark-btn');
        bookmarkBtn.addEventListener('click', function() {
            this.classList.toggle('bookmarked');
            this.textContent = this.classList.contains('bookmarked') ? '⭐ 已收藏' : '⭐ 收藏';
        });

        // 删除按钮
        const deleteBtn = post.querySelector('.delete-btn');
        deleteBtn.addEventListener('click', function() {
            if (confirm('确定要删除这个帖子吗？')) {
                // 从DOM中移除帖子
                post.remove();
                
                // 检查是否是用户帖子(存储在localStorage中)
                const title = post.querySelector('h3').textContent;
                const content = post.querySelector('.content p')?.textContent;
                
                try {
                    const posts = JSON.parse(localStorage.getItem('forumPosts')) || [];
                    // 检查帖子是否存在于localStorage
                    const postExists = posts.some(p => 
                        p.title === title && p.content === content
                    );
                    
                    if (postExists) {
                        // 从localStorage中移除帖子
                        const updatedPosts = posts.filter(p => 
                            p.title !== title || p.content !== content
                        );
                        localStorage.setItem('forumPosts', JSON.stringify(updatedPosts));
                        console.log('用户帖子已从localStorage删除');
                    } else {
                        console.log('示例帖子已删除，无需操作localStorage');
                    }
                } catch (e) {
                    console.error('删除帖子失败:', e);
                }
            }
        });
    }

    // 初始化示例帖子
    const samplePosts = [
        {
            title: "青铜器鉴赏",
            author: "文物专家",
            dynasty: "商周",
            content: "这件青铜器制作精美，纹饰复杂，展现了商周时期高超的铸造工艺。",
            image: "images/british-museum.png",
            likes: 15
        },
        {
            title: "宋代瓷器",
            author: "瓷器收藏家",
            dynasty: "宋代",
            content: "宋代瓷器以青瓷著称，釉色温润如玉，造型简洁大方。",
            image: "images/judge-good.png.jpg", 
            likes: 23
        },
        {
            title: "明代书画",
            author: "艺术研究员",
            dynasty: "明代",
            content: "这幅明代山水画笔法细腻，构图严谨，体现了文人画的精髓。",
            image: "images/british-museum.png",
            likes: 8
        }
    ];

    // 加载保存的帖子和示例帖子
    const postsContainer = document.querySelector('.posts-stream');
    if (postsContainer) {
        // 从localStorage加载用户发布的帖子
        const savedPosts = JSON.parse(localStorage.getItem('forumPosts')) || [];
        savedPosts.forEach(post => {
            const postEl = document.createElement('article');
            postEl.className = 'post';
            postEl.innerHTML = `
                <header>
                    <h3>${post.title}</h3>
                    <div>
                        <span class="author">${post.author}</span>
                        <span class="dynasty">${post.dynasty}</span>
                    </div>
                </header>
                <div class="content">
                    <p>${post.content}</p>
                </div>
                <footer>
                    <button class="like-btn">👍 点赞 (${post.likes})</button>
                    <button class="bookmark-btn">⭐ 收藏</button>
                    <button class="delete-btn">🗑️ 删除</button>
                </footer>
            `;
            postsContainer.appendChild(postEl);
            initPostInteractions(postEl);
        });

        // 添加示例帖子
        samplePosts.forEach(post => {
            const postEl = document.createElement('article');
            postEl.className = 'post';
            postEl.innerHTML = `
                <header>
                    <h3>${post.title}</h3>
                    <div>
                        <span class="author">${post.author}</span>
                        <span class="dynasty">${post.dynasty}</span>
                    </div>
                </header>
                <div class="content">
                    <img src="${post.image}" alt="${post.title}" class="post-image" loading="lazy">
                    <p>${post.content}</p>
                </div>
                <footer>
                    <button class="like-btn">👍 点赞 (${post.likes})</button>
                    <button class="bookmark-btn">⭐ 收藏</button>
                    <button class="delete-btn">🗑️ 删除</button>
                </footer>
            `;
            postsContainer.appendChild(postEl);
            initPostInteractions(postEl);
        });
    }

    // 使用事件委托优化事件处理
    document.addEventListener('click', function(e) {
        // 处理帖子交互
        if (e.target.closest('.like-btn')) {
            const btn = e.target.closest('.like-btn');
            const countText = btn.textContent.match(/\((\d+)\)/);
            if (countText) {
                const count = parseInt(countText[1]);
                btn.textContent = `👍 点赞 (${count + 1})`;
                btn.classList.toggle('liked');
            }
            return;
        }

        if (e.target.closest('.bookmark-btn')) {
            const btn = e.target.closest('.bookmark-btn');
            btn.classList.toggle('bookmarked');
            btn.textContent = btn.classList.contains('bookmarked') ? '⭐ 已收藏' : '⭐ 收藏';
            return;
        }

        if (e.target.closest('.delete-btn')) {
            const btn = e.target.closest('.delete-btn');
            const post = btn.closest('.post');
            if (confirm('确定要删除这个帖子吗？')) {
                // 从DOM中移除帖子
                post.remove();
                
                // 检查是否是用户帖子(存储在localStorage中)
                const title = post.querySelector('h3').textContent;
                const content = post.querySelector('.content p')?.textContent;
                
                try {
                    const posts = JSON.parse(localStorage.getItem('forumPosts')) || [];
                    // 检查帖子是否存在于localStorage
                    const postExists = posts.some(p => 
                        p.title === title && p.content === content
                    );
                    
                    if (postExists) {
                        // 从localStorage中移除帖子
                        const updatedPosts = posts.filter(p => 
                            p.title !== title || p.content !== content
                        );
                        localStorage.setItem('forumPosts', JSON.stringify(updatedPosts));
                        console.log('用户帖子已从localStorage删除');
                    } else {
                        console.log('示例帖子已删除，无需操作localStorage');
                    }
                } catch (e) {
                    console.error('删除帖子失败:', e);
                }
            }
            return;
        }
    });

    // 初始化现有帖子
    document.querySelectorAll('.post').forEach(post => {
        // 保留初始化逻辑但移除单独的事件监听器
        const likeBtn = post.querySelector('.like-btn');
        if (likeBtn && !likeBtn.dataset.initialized) {
            likeBtn.dataset.initialized = 'true';
        }
        
        const bookmarkBtn = post.querySelector('.bookmark-btn');
        if (bookmarkBtn && !bookmarkBtn.dataset.initialized) {
            bookmarkBtn.dataset.initialized = 'true';
        }
    });

    // 历史时期筛选功能
    const eraElements = document.querySelectorAll('.era');
    eraElements.forEach(era => {
        era.addEventListener('click', function() {
            // 更新活跃状态
            eraElements.forEach(el => el.classList.remove('active'));
            this.classList.add('active');
            
            // 获取选中的历史时期
            const selectedEra = this.textContent.trim();
            
            // 筛选帖子
            const posts = document.querySelectorAll('.post');
            posts.forEach(post => {
                const postEra = post.querySelector('.dynasty').textContent;
                if (selectedEra === '全部' || postEra === selectedEra) {
                    post.style.display = 'block';
                } else {
                    post.style.display = 'none';
                }
            });
        });
    });


    // 默认显示全部帖子
    const defaultEra = document.querySelector('.era[data-default]');
    if (defaultEra) {
        defaultEra.click();
    }
});
