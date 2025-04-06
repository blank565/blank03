    // 初始化粒子效果
document.addEventListener('DOMContentLoaded', function() {
    // 确保标题立即显示
    document.querySelector('.title-container').style.opacity = '1';
    
    // 导航栏鼠标移动显示/隐藏逻辑
    const nav = document.querySelector('.nav-artifacts');
    let mouseMoveTimer;
    
    document.addEventListener('mousemove', () => {
        nav.style.opacity = '1';
        clearTimeout(mouseMoveTimer);
        mouseMoveTimer = setTimeout(() => {
            nav.style.opacity = '0';
        }, 1000); // 1秒无移动后隐藏
    });
        
        // 粒子配置 - 发光效果
        particlesJS('particles-js', {
        "particles": {
            "number": {
                "value": 50,
                "density": {
                    "enable": true,
                    "value_area": 800
                }
            },
            "color": {
                "value": "#E5C687"
            },
            "shape": {
                "type": "circle",
                "stroke": {
                    "width": 0,
                    "color": "#000000"
                }
            },
            "opacity": {
                "value": 0.5,
                "random": true,
                "anim": {
                    "enable": true,
                    "speed": 1,
                    "opacity_min": 0.1,
                    "sync": false
                }
            },
            "size": {
                "value": 4,
                "random": true,
                "anim": {
                    "enable": true,
                    "speed": 2,
                    "size_min": 0.5
                }
            },
            "line_linked": {
                "enable": true,
                "distance": 150,
                "color": "#E5C687",
                "opacity": 0.3,
                "width": 1,
                "shadow": {
                    "enable": false
                }
            },
            "move": {
                "enable": true,
                "speed": 3,
                "direction": "none",
                "random": true,
                "straight": false,
                "out_mode": "out",
                "bounce": false,
                "attract": {
                    "enable": true,
                    "rotateX": 600,
                    "rotateY": 1200
                }
            }
        },
        "interactivity": {
            "detect_on": "canvas",
            "events": {
                "onhover": {
                    "enable": true,
                    "mode": "repulse"
                },
                "onclick": {
                    "enable": true,
                    "mode": "push"
                },
                "resize": true
            },
            "modes": {
                "repulse": {
                    "distance": 150,
                    "duration": 0.4
                },
                "push": {
                    "particles_nb": 6
                },
                "bubble": {
                    "distance": 200,
                    "size": 6,
                    "duration": 2,
                    "opacity": 0.8
                }
            }
        },
        "retina_detect": true
    });

    // 文物容器悬停效果
    const artifacts = document.querySelectorAll('.artifact');
    artifacts.forEach(artifact => {
        artifact.addEventListener('mouseenter', function() {
            const type = this.dataset.type;
            let color;
            switch(type) {
                case 'bronze':
                    color = '#537A5A';
                    break;
                case 'porcelain':
                    color = '#2E5266';
                    break;
                case 'scroll':
                    color = '#BF7E45';
                    break;
            }
            
            // 更新粒子颜色
            pJS.particles.color.value = color;
            pJS.fn.particlesRefresh();
        });

        artifact.addEventListener('mouseleave', function() {
            // 恢复默认粒子颜色
            pJS.particles.color.value = '#C5A467';
            pJS.fn.particlesRefresh();
        });
    });

    // 双击背景彩蛋特效
    const heroSection = document.querySelector('.hero-section');
    heroSection.addEventListener('dblclick', function() {
        // 创建全屏青铜器铭文闪现效果
        const inscription = document.createElement('div');
        inscription.className = 'inscription-effect';
        inscription.innerHTML = '&#x4E2D;&#x534E;&#x6587;&#x7269;'; // 中文"中华文物"
        document.body.appendChild(inscription);
        
        setTimeout(() => {
            inscription.style.animation = 'flashIn 0.3s ease-out reverse';
            setTimeout(() => {
                inscription.remove();
            }, 300);
        }, 1000);
    });

    // 粒子运动模式自动切换
    let particleModes = ['bubble', 'repulse', 'grab'];
    let currentMode = 0;
    
    setInterval(() => {
        currentMode = (currentMode + 1) % particleModes.length;
        pJS.interactivity.events.onhover.mode = particleModes[currentMode];
        pJS.fn.particlesRefresh();
    }, 20000);
});
