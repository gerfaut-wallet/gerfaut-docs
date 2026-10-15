/* Gerfaut documentation: a bar under every clip, with a pause button and
   a progress track that shows where the loop is and moves through it.
   Mintlify runs this file once per visit, so an observer picks up the
   clips that render later (another tab, another page). Styles live in
   style.css, section "Clip bar". */

(() => {
  const SVG = 'viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"';
  const PAUSE_ICON = `<svg ${SVG}><rect x="14" y="3" width="5" height="18" rx="1"/><rect x="5" y="3" width="5" height="18" rx="1"/></svg>`;
  const PLAY_ICON = `<svg ${SVG}><path d="M5 5a2 2 0 0 1 3.008-1.728l11.997 6.998a2 2 0 0 1 .003 3.458l-12 7A2 2 0 0 1 5 19z"/></svg>`;

  const clock = (seconds) => {
    const s = Math.max(0, Math.round(seconds || 0));
    return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;
  };

  const element = (tag, className) => {
    const node = document.createElement(tag);
    node.className = className;
    return node;
  };

  function attach(video) {
    video.dataset.gfClipBar = "";

    const bar = element("div", "gf-clip-bar");
    const toggle = element("button", "gf-clip-bar__toggle");
    toggle.type = "button";
    const track = element("div", "gf-clip-bar__track");
    track.tabIndex = 0;
    track.setAttribute("role", "slider");
    track.setAttribute("aria-label", "Clip position");
    track.setAttribute("aria-valuemin", "0");
    track.append(element("div", "gf-clip-bar__fill"), element("div", "gf-clip-bar__thumb"));
    bar.append(toggle, track);
    video.insertAdjacentElement("afterend", bar);

    let frame = 0;
    let resumeAfterDrag = false;

    const paint = () => {
      const duration = video.duration;
      const progress = duration > 0 ? video.currentTime / duration : 0;
      bar.style.setProperty("--gf-progress", String(Math.min(1, progress)));
    };

    const describe = () => {
      const duration = video.duration > 0 ? video.duration : 0;
      track.setAttribute("aria-valuemax", String(Math.round(duration)));
      track.setAttribute("aria-valuenow", String(Math.round(video.currentTime)));
      track.setAttribute("aria-valuetext", `${clock(video.currentTime)} of ${clock(duration)}`);
    };

    const showState = () => {
      const paused = video.paused;
      bar.classList.toggle("is-paused", paused);
      toggle.innerHTML = paused ? PLAY_ICON : PAUSE_ICON;
      toggle.setAttribute("aria-label", paused ? "Play the clip" : "Pause the clip");
    };

    const loop = () => {
      paint();
      frame = requestAnimationFrame(loop);
    };

    const play = () => video.play().catch(() => {});

    const seekTo = (clientX) => {
      const rect = track.getBoundingClientRect();
      const ratio = Math.min(1, Math.max(0, (clientX - rect.left) / rect.width));
      if (video.duration > 0) video.currentTime = ratio * video.duration;
      bar.style.setProperty("--gf-progress", String(ratio));
    };

    video.addEventListener("play", () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(loop);
      showState();
    });
    video.addEventListener("pause", () => {
      cancelAnimationFrame(frame);
      paint();
      showState();
    });
    video.addEventListener("loadedmetadata", () => {
      paint();
      describe();
    });
    video.addEventListener("seeked", paint);
    video.addEventListener("timeupdate", describe);

    toggle.addEventListener("click", () => (video.paused ? play() : video.pause()));

    track.addEventListener("pointerdown", (event) => {
      if (event.button !== 0) return;
      event.preventDefault();
      track.setPointerCapture(event.pointerId);
      track.focus({ preventScroll: true });
      resumeAfterDrag = !video.paused;
      video.pause();
      bar.classList.add("is-dragging");
      seekTo(event.clientX);
    });
    track.addEventListener("pointermove", (event) => {
      if (track.hasPointerCapture(event.pointerId)) seekTo(event.clientX);
    });
    const release = (event) => {
      if (!track.hasPointerCapture(event.pointerId)) return;
      track.releasePointerCapture(event.pointerId);
      bar.classList.remove("is-dragging");
      if (resumeAfterDrag) play();
    };
    track.addEventListener("pointerup", release);
    track.addEventListener("pointercancel", release);

    track.addEventListener("keydown", (event) => {
      const duration = video.duration;
      if (!(duration > 0)) return;
      const step = Math.max(1, duration / 20);
      const targets = {
        ArrowRight: video.currentTime + step,
        ArrowUp: video.currentTime + step,
        ArrowLeft: video.currentTime - step,
        ArrowDown: video.currentTime - step,
        Home: 0,
        End: duration - 0.1,
      };
      if (event.key in targets) {
        video.currentTime = Math.min(duration, Math.max(0, targets[event.key]));
        paint();
        describe();
      } else if (event.key === " " || event.key === "Enter") {
        if (video.paused) play();
        else video.pause();
      } else {
        return;
      }
      event.preventDefault();
    });

    showState();
    paint();
    describe();
    if (!video.paused) frame = requestAnimationFrame(loop);
  }

  const scan = () => {
    document.querySelectorAll(".mdx-content video:not([data-gf-clip-bar])").forEach(attach);
  };

  let pending = false;
  new MutationObserver(() => {
    if (pending) return;
    pending = true;
    requestAnimationFrame(() => {
      pending = false;
      scan();
    });
  }).observe(document.body, { childList: true, subtree: true });

  window.addEventListener("mintlify:navigate", scan);
  scan();
})();
