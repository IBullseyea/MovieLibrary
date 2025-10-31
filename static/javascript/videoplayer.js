// Video Player JavaScript - Auto initialize when page loads
let video;
let isPlaying = false;
let currentSpeed = 1;
let speedOptions = [0.5, 0.75, 1, 1.25, 1.5, 2];
let currentSpeedIndex = 2;
let isDragging = false;

// Auto-initialize when page loads
document.addEventListener('DOMContentLoaded', function() {
    initializeVideoPlayer();
});

function initializeVideoPlayer() {
    video = document.getElementById('mainVideo');
    if (!video) return;
    
    // Disable default controls completely
    video.controls = false;
    video.setAttribute('controls', false);
    video.removeAttribute('controls');
    
    // Disable context menu on video
    video.addEventListener('contextmenu', function(e) {
        e.preventDefault();
        return false;
    });
    
    // Disable double-click to fullscreen
    video.addEventListener('dblclick', function(e) {
        e.preventDefault();
        return false;
    });
    
    // Disable click to play/pause
    video.addEventListener('click', function(e) {
        e.preventDefault();
        return false;
    });
    
    // Video event listeners
    video.addEventListener('loadedmetadata', updateDuration);
    video.addEventListener('timeupdate', updateProgress);
    video.addEventListener('play', onVideoPlay);
    video.addEventListener('pause', onVideoPause);
    video.addEventListener('ended', onVideoEnded);
    
    // Progress bar event listeners
    const progressBar = document.getElementById('progressBar');
    const progressHandle = document.getElementById('progressHandle');
    
    progressBar.addEventListener('click', seekVideo);
    progressHandle.addEventListener('mousedown', startDragging);
    document.addEventListener('mousemove', dragProgress);
    document.addEventListener('mouseup', stopDragging);
    
    // Volume control
    const volumeSlider = document.getElementById('volumeSlider');
    volumeSlider.addEventListener('input', changeVolume);
    
    // Keyboard shortcuts
    document.addEventListener('keydown', handleKeyPress);
    
    // Auto-hide controls
    let controlsTimeout;
    const videoWrapper = document.querySelector('.video-wrapper');
    const videoControls = document.getElementById('videoControls');
    
    videoWrapper.addEventListener('mousemove', () => {
        videoControls.style.opacity = '1';
        videoControls.style.pointerEvents = 'all';
        clearTimeout(controlsTimeout);
        controlsTimeout = setTimeout(() => {
            if (isPlaying && !document.fullscreenElement) {
                videoControls.style.opacity = '0';
                videoControls.style.pointerEvents = 'none';
            }
        }, 3000);
    });
    
    videoWrapper.addEventListener('mouseleave', () => {
        if (isPlaying && !document.fullscreenElement) {
            videoControls.style.opacity = '0';
            videoControls.style.pointerEvents = 'none';
        }
    });
    
    // Fullscreen change event
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    document.addEventListener('webkitfullscreenchange', handleFullscreenChange);
    document.addEventListener('mozfullscreenchange', handleFullscreenChange);
    document.addEventListener('msfullscreenchange', handleFullscreenChange);
}

function handleFullscreenChange() {
    const videoControls = document.getElementById('videoControls');
    if (document.fullscreenElement || document.webkitFullscreenElement || 
        document.mozFullScreenElement || document.msFullscreenElement) {
        // Fullscreen mode
        videoControls.style.opacity = '1';
        videoControls.style.pointerEvents = 'all';
    } else {
        // Exit fullscreen
        videoControls.style.opacity = '1';
        videoControls.style.pointerEvents = 'all';
    }
}

function togglePlayPause() {
    if (!video) return;
    
    if (video.paused) {
        video.play();
    } else {
        video.pause();
    }
}

function onVideoPlay() {
    isPlaying = true;
    document.getElementById('playIcon').textContent = '⏸';
    document.getElementById('playIcon2').textContent = '⏸';
}

function onVideoPause() {
    isPlaying = false;
    document.getElementById('playIcon').textContent = '▶';
    document.getElementById('playIcon2').textContent = '▶';
}

function onVideoEnded() {
    isPlaying = false;
    document.getElementById('playIcon').textContent = '▶';
    document.getElementById('playIcon2').textContent = '▶';
}

function skipForward() {
    if (!video) return;
    video.currentTime += 10;
}

function skipBackward() {
    if (!video) return;
    video.currentTime -= 10;
}

function updateDuration() {
    const totalTime = document.getElementById('totalTime');
    totalTime.textContent = formatTime(video.duration);
}

function updateProgress() {
    if (isDragging) return;
    
    const currentTime = document.getElementById('currentTime');
    const progressFill = document.getElementById('progressFill');
    const progressHandle = document.getElementById('progressHandle');
    
    const percent = (video.currentTime / video.duration) * 100;
    
    currentTime.textContent = formatTime(video.currentTime);
    progressFill.style.width = percent + '%';
    progressHandle.style.left = percent + '%';
}

function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

function seekVideo(e) {
    if (!video) return;
    
    const progressBar = e.currentTarget;
    const rect = progressBar.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const percent = clickX / rect.width;
    
    video.currentTime = percent * video.duration;
}

function startDragging(e) {
    isDragging = true;
    e.preventDefault();
}

function dragProgress(e) {
    if (!isDragging || !video) return;
    
    const progressBar = document.getElementById('progressBar');
    const rect = progressBar.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const percent = Math.max(0, Math.min(1, clickX / rect.width));
    
    video.currentTime = percent * video.duration;
    
    const progressFill = document.getElementById('progressFill');
    const progressHandle = document.getElementById('progressHandle');
    
    progressFill.style.width = (percent * 100) + '%';
    progressHandle.style.left = (percent * 100) + '%';
}

function stopDragging() {
    isDragging = false;
}

function toggleMute() {
    if (!video) return;
    
    const muteIcon = document.getElementById('muteIcon');
    const volumeSlider = document.getElementById('volumeSlider');
    
    if (video.muted) {
        video.muted = false;
        muteIcon.textContent = '🔊';
        volumeSlider.value = video.volume * 100;
    } else {
        video.muted = true;
        muteIcon.textContent = '🔇';
        volumeSlider.value = 0;
    }
}

function changeVolume(e) {
    if (!video) return;
    
    const volume = e.target.value / 100;
    video.volume = volume;
    video.muted = volume === 0;
    
    const muteIcon = document.getElementById('muteIcon');
    muteIcon.textContent = volume === 0 ? '🔇' : '🔊';
}

function changePlaybackSpeed() {
    if (!video) return;
    
    currentSpeedIndex = (currentSpeedIndex + 1) % speedOptions.length;
    currentSpeed = speedOptions[currentSpeedIndex];
    video.playbackRate = currentSpeed;
    
    document.getElementById('speedText').textContent = currentSpeed + 'x';
}

function toggleFullscreen() {
    const videoWrapper = document.querySelector('.video-wrapper');
    
    if (!document.fullscreenElement) {
        if (videoWrapper.requestFullscreen) {
            videoWrapper.requestFullscreen();
        } else if (videoWrapper.webkitRequestFullscreen) {
            videoWrapper.webkitRequestFullscreen();
        } else if (videoWrapper.msRequestFullscreen) {
            videoWrapper.msRequestFullscreen();
        }
    } else {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
        } else if (document.msExitFullscreen) {
            document.msExitFullscreen();
        }
    }
}

function handleKeyPress(e) {
    if (!video || document.getElementById('videoPlayerSection').style.display === 'none') return;
    
    switch(e.code) {
        case 'Space':
            e.preventDefault();
            togglePlayPause();
            break;
        case 'ArrowLeft':
            e.preventDefault();
            skipBackward();
            break;
        case 'ArrowRight':
            e.preventDefault();
            skipForward();
            break;
        case 'KeyM':
            e.preventDefault();
            toggleMute();
            break;
        case 'KeyF':
            e.preventDefault();
            toggleFullscreen();
            break;
        case 'Escape':
            if (document.fullscreenElement) {
                document.exitFullscreen();
            } else {
                hideVideoPlayer();
            }
            break;
    }
}

// Close video player when clicking outside
document.addEventListener('click', function(e) {
    const videoSection = document.getElementById('videoPlayerSection');
    const videoContainer = document.querySelector('.video-container');
    
    if (videoSection && videoSection.style.display !== 'none') {
        if (!videoContainer.contains(e.target) && e.target === videoSection) {
            hideVideoPlayer();
        }
    }
});