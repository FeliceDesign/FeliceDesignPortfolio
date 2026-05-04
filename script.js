const list = document.querySelector(".scrollableList");
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
