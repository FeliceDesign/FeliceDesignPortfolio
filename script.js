const list = document.querySelector(".scrollableList");

if (list) {
  let targetScroll = 0;

  window.addEventListener(
    "wheel",
    (e) => {
      e.preventDefault();
      targetScroll += e.deltaY;
      targetScroll = Math.max(
        0,
        Math.min(targetScroll, list.scrollWidth - list.clientWidth),
      );
    },
    { passive: false },
  );

  function animate() {
    list.scrollLeft += (targetScroll - list.scrollLeft) * 0.1;
    requestAnimationFrame(animate);
  }

  animate();
}

if (document.querySelector(".photography-all, .threed-all")) {
  let targetY = 0;
  let currentY = 0;

  window.addEventListener(
    "wheel",
    (e) => {
      e.preventDefault();
      targetY += e.deltaY;
      targetY = Math.max(0, Math.min(targetY, document.body.scrollHeight - window.innerHeight));
    },
    { passive: false },
  );

  function animatePhoto() {
    currentY += (targetY - currentY) * 0.1;
    window.scrollTo(0, currentY);
    requestAnimationFrame(animatePhoto);
  }

  animatePhoto();
}
