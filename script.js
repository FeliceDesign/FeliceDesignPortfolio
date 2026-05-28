const langToggle = document.getElementById("langToggle");
if (langToggle) {
  langToggle.addEventListener("click", () => {
    const isDE = langToggle.textContent === "DE";
    document.querySelectorAll(".aboutme-lang").forEach((el) => {
      el.hidden = el.getAttribute("lang") === (isDE ? "en" : "de");
    });
    langToggle.textContent = isDE ? "EN" : "DE";
  });
}

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
      if (document.body.classList.contains("media-overlay-open")) return;
      e.preventDefault();
      targetY += e.deltaY;
      targetY = Math.max(0, Math.min(targetY, document.body.scrollHeight - window.innerHeight));
    },
    { passive: false },
  );

  function animatePhoto() {
    if (document.body.classList.contains("media-overlay-open")) {
      currentY = window.scrollY;
      targetY = window.scrollY;
    } else {
      currentY += (targetY - currentY) * 0.1;
      window.scrollTo(0, currentY);
    }
    requestAnimationFrame(animatePhoto);
  }

  animatePhoto();

  const overlay = document.createElement("div");
  overlay.className = "media-overlay";
  overlay.innerHTML = `
    <button class="media-overlay-close" aria-label="Close">&times;</button>
    <div class="media-overlay-inner">
      <div class="media-overlay-media"></div>
      <div class="media-overlay-caption">Description placeholder</div>
    </div>
  `;
  document.body.appendChild(overlay);

  const mediaSlot = overlay.querySelector(".media-overlay-media");
  const captionEl = overlay.querySelector(".media-overlay-caption");
  const closeBtn = overlay.querySelector(".media-overlay-close");

  function openOverlay(srcEl) {
    mediaSlot.innerHTML = "";
    let node;
    if (srcEl.tagName === "VIDEO") {
      node = document.createElement("video");
      node.src = srcEl.getAttribute("src");
      node.autoplay = true;
      node.loop = true;
      node.muted = true;
      node.playsInline = true;
      node.controls = true;
    } else {
      node = document.createElement("img");
      node.src = srcEl.getAttribute("src");
      node.alt = srcEl.getAttribute("alt") || "";
    }
    mediaSlot.appendChild(node);
    const desc = srcEl.dataset.description || "";
    captionEl.textContent = desc;
    captionEl.style.display = desc ? "" : "none";
    overlay.classList.add("open");
    document.body.classList.add("media-overlay-open");
  }

  function closeOverlay() {
    overlay.classList.remove("open");
    document.body.classList.remove("media-overlay-open");
    mediaSlot.innerHTML = "";
  }

  document.querySelectorAll(".photo-col img, .photo-col video").forEach((el) => {
    el.style.cursor = "zoom-in";
    el.addEventListener("click", () => openOverlay(el));
  });

  overlay.addEventListener("click", (e) => {
    if (e.target === overlay || e.target.classList.contains("media-overlay-inner")) {
      closeOverlay();
    }
  });
  closeBtn.addEventListener("click", closeOverlay);
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeOverlay();
  });
}
