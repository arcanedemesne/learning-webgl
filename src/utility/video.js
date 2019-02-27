// will set to true when video can be copied to texture
let copyVideo = false;

const setupVideo = (url) => {
  const video = document.createElement('video');

  let playing = false;
  let timeupdate = false;

  video.autoplay = true;
  video.muted = true;
  video.loop = true;

  // Waiting for these 2 events ensures
  // there is data in the video

  video.addEventListener('playing', function() {
     playing = true;
     checkReady();
  }, true);

  video.addEventListener('timeupdate', function() {
     timeupdate = true;
     checkReady();
  }, true);

  video.src = url;
  video.play();

  const checkReady = () => {
    if (playing && timeupdate) {
      copyVideo = true;
    }
  };

  return video;
};

export { setupVideo, copyVideo };
