// js/mediaCtrl.js - 音视频播放控制脚本
document.addEventListener('DOMContentLoaded', function() {
  // 获取视频元素和进度条元素
  const video = document.getElementById('scenicVideo');
  const progressSlider = document.getElementById('progress');

  // 全局播放函数（供HTML调用）
  window.playVideo = function() {
    // 播放视频
    video.play().catch(err => {
      alert('视频播放失败：' + err.message);
    });
    // 实时更新进度条（每500ms更新一次）
    setInterval(() => {
      if (video.duration) { // 避免视频未加载时出现NaN报错
        progressSlider.value = (video.currentTime / video.duration) * 100;
      }
    }, 500);
  };

  // 全局暂停函数
  window.pauseVideo = function() {
    video.pause();
  };

  // 全局音量控制函数
  window.setVolume = function(val) {
    video.volume = parseFloat(val);
  };

  // 全局进度控制函数
  window.setProgress = function(val) {
    if (video.duration) {
      video.currentTime = (parseFloat(val) / 100) * video.duration;
    }
  };

  // 全局快进/快退函数
  window.skip = function(seconds) {
    video.currentTime += seconds;
    // 边界值控制，避免进度超出范围
    video.currentTime = Math.max(0, Math.min(video.currentTime, video.duration));
  };
});