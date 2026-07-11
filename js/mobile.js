(function(){
  const MOBILE_CLASS = "sta-mobile";
  const LANDSCAPE_CLASS = "sta-landscape";
  const PORTRAIT_CLASS = "sta-portrait";
  const FORCE_QUERY = "mobile";
  let initialized = false;
  let lockAttempted = false;

  function wantsMobile(){
    const params = new URLSearchParams(location.search);
    if(params.get(FORCE_QUERY) === "1") return true;
    if(params.get(FORCE_QUERY) === "0") return false;
    const coarse = window.matchMedia?.("(pointer: coarse)")?.matches;
    const touch = navigator.maxTouchPoints > 0 || "ontouchstart" in window;
    const compact = Math.min(window.innerWidth, window.innerHeight) <= 760 && Math.max(window.innerWidth, window.innerHeight) <= 1200;
    return (coarse || touch) && compact;
  }

  function isLandscape(){
    return window.innerWidth >= window.innerHeight;
  }

  function ensureOrientationGate(){
    if(document.getElementById("mobileOrientationGate")) return;
    const gate = document.createElement("div");
    gate.id = "mobileOrientationGate";
    gate.setAttribute("role", "dialog");
    gate.setAttribute("aria-live", "polite");
    gate.innerHTML = `
      <div class="gate-card">
        <div class="gate-icon">↻</div>
        <div class="gate-title">가로 모드 전용</div>
        <div class="gate-copy">기기를 가로로 돌리면 모바일 경기 화면이 열립니다.</div>
      </div>
    `;
    document.body.appendChild(gate);
  }

  function optimizeImages(){
    document.querySelectorAll("img").forEach(img=>{
      if(!img.hasAttribute("loading")) img.setAttribute("loading", "lazy");
      if(!img.hasAttribute("decoding")) img.setAttribute("decoding", "async");
      img.addEventListener("error", ()=>{
        img.classList.add("image-load-error");
      }, { once:true });
    });
  }

  function setupIntensityControls(){
    for(let i=1;i<=3;i++){
      const select = document.getElementById(`intensity${i}`);
      if(!select || select.dataset.mobileEnhanced === "1") continue;
      const wrap = document.createElement("div");
      wrap.className = "mobile-intensity-toggle";
      wrap.dataset.for = select.id;
      Array.from(select.options).forEach(option=>{
        const button = document.createElement("button");
        button.type = "button";
        button.dataset.value = option.value;
        button.textContent = option.textContent;
        button.addEventListener("click", ()=>{
          select.value = option.value;
          select.dispatchEvent(new Event("change", { bubbles:true }));
          syncIntensityControls();
          requestLandscapeLock();
        });
        wrap.appendChild(button);
      });
      select.insertAdjacentElement("afterend", wrap);
      select.dataset.mobileEnhanced = "1";
    }
    syncIntensityControls();
  }

  function syncIntensityControls(){
    document.querySelectorAll(".mobile-intensity-toggle").forEach(wrap=>{
      const select = document.getElementById(wrap.dataset.for);
      if(!select) return;
      wrap.querySelectorAll("button").forEach(button=>{
        button.classList.toggle("active", button.dataset.value === select.value);
      });
    });
  }

  function setupActivityMenuDismiss(){
    document.addEventListener("click", event=>{
      if(!document.body.classList.contains(MOBILE_CLASS)) return;
      const target = event.target;
      if(target.closest(".activity-picker") || target.closest(".activity-menu")) return;
      document.querySelectorAll(".activity-menu").forEach(menu=>menu.classList.add("hidden"));
      document.querySelectorAll(".cat-btn").forEach(btn=>btn.classList.remove("active"));
    });
  }

  function requestLandscapeLock(){
    if(lockAttempted || !document.body.classList.contains(MOBILE_CLASS)) return;
    lockAttempted = true;
    const lock = screen.orientation && screen.orientation.lock;
    if(typeof lock === "function"){
      screen.orientation.lock("landscape").catch(()=>{});
    }
  }

  function hookGlobalRender(){
    if(window.__staMobileRenderHooked) return;
    const originalRender = window.render;
    if(typeof originalRender !== "function") return;
    window.render = function(){
      const result = originalRender.apply(this, arguments);
      queueMicrotask(()=>enhanceMobileUi());
      return result;
    };
    window.__staMobileRenderHooked = true;
  }

  function enhanceMobileUi(){
    if(!document.body.classList.contains(MOBILE_CLASS)) return;
    if(typeof window.initMobileMainLayout === "function") window.initMobileMainLayout();
    setupIntensityControls();
    syncIntensityControls();
    optimizeImages();
  }

  function applyMode(){
    const mobile = wantsMobile();
    document.body.classList.toggle(MOBILE_CLASS, mobile);
    if(!mobile){
      document.body.classList.remove(LANDSCAPE_CLASS, PORTRAIT_CLASS);
      return;
    }
    ensureOrientationGate();
    const landscape = isLandscape();
    document.body.classList.toggle(LANDSCAPE_CLASS, landscape);
    document.body.classList.toggle(PORTRAIT_CLASS, !landscape);
    enhanceMobileUi();
  }

  function init(){
    if(initialized) return;
    initialized = true;
    setupActivityMenuDismiss();
    hookGlobalRender();
    applyMode();
    window.addEventListener("resize", applyMode, { passive:true });
    window.addEventListener("orientationchange", ()=>setTimeout(applyMode, 120), { passive:true });
    document.addEventListener("visibilitychange", applyMode);
    document.addEventListener("click", requestLandscapeLock, { once:true, passive:true });
    document.addEventListener("touchstart", requestLandscapeLock, { once:true, passive:true });
    setTimeout(enhanceMobileUi, 0);
  }

  if(document.readyState === "loading"){
    document.addEventListener("DOMContentLoaded", init, { once:true });
  }else{
    init();
  }
})();
