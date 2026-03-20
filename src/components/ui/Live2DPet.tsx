"use client";

import { useEffect } from "react";

export function Live2DPet() {

  useEffect(() => {
    // Only show on desktop (width >= 768)
    if (window.innerWidth < 768) return;

    const live2dPath =
      "https://fastly.jsdelivr.net/gh/stevenjoezhang/live2d-widget@latest/";

    function loadResource(url: string, type: "css" | "js") {
      return new Promise<void>((resolve, reject) => {
        if (type === "css") {
          const link = document.createElement("link");
          link.rel = "stylesheet";
          link.href = url;
          link.onload = () => resolve();
          link.onerror = () => reject();
          document.head.appendChild(link);
        } else {
          const script = document.createElement("script");
          script.src = url;
          script.onload = () => resolve();
          script.onerror = () => reject();
          document.head.appendChild(script);
        }
      });
    }

    // Inject custom CSS to move pet to the right side
    const style = document.createElement("style");
    style.textContent = `
      #waifu {
        left: auto !important;
        right: 0 !important;
        bottom: -1000px;
        position: fixed;
        z-index: 998;
        transform: translateY(3px);
        transition: transform .3s ease-in-out, bottom 3s ease-in-out;
        line-height: 0;
        margin-bottom: -10px;
      }
      #waifu:hover {
        transform: translateY(0);
      }
      #waifu-tips {
        background-color: rgba(255, 240, 248, 0.85) !important;
        border: 1px solid rgba(244, 114, 182, 0.3) !important;
        border-radius: 16px !important;
        box-shadow: 0 4px 20px rgba(244, 114, 182, 0.12) !important;
        font-size: 13px !important;
        color: #2D1B33 !important;
        right: 20px !important;
        left: auto !important;
        margin: -30px 20px !important;
      }
      .dark #waifu-tips {
        background-color: rgba(20, 15, 30, 0.9) !important;
        border-color: rgba(244, 114, 182, 0.2) !important;
        color: #F5EEF8 !important;
      }
      #waifu-tips span {
        color: #F472B6 !important;
      }
      #waifu-tool {
        right: auto !important;
        left: -10px !important;
      }
      #waifu-tool svg {
        fill: #F472B6 !important;
      }
      #waifu-toggle {
        left: auto !important;
        right: 0 !important;
        margin-left: 0 !important;
        margin-right: -100px !important;
        background-color: #F472B6 !important;
        border-radius: 5px 0 0 5px !important;
        z-index: 998;
      }
      #waifu-toggle.waifu-toggle-active {
        margin-right: -50px !important;
        margin-left: 0 !important;
      }
      #waifu-toggle.waifu-toggle-active:hover {
        margin-right: -30px !important;
        margin-left: 0 !important;
      }
    `;
    document.head.appendChild(style);

    Promise.all([
      loadResource(live2dPath + "waifu.css", "css"),
      loadResource(live2dPath + "live2d.min.js", "js"),
      loadResource(live2dPath + "waifu-tips.js", "js"),
    ])
      .then(() => {
        // @ts-expect-error initWidget is loaded from external script
        if (typeof initWidget === "function") {
          // @ts-expect-error initWidget is loaded from external script
          initWidget({
            waifuPath: live2dPath + "waifu-tips.json",
            cdnPath:
              "https://fastly.jsdelivr.net/gh/fghrsh/live2d_api/",
            tools: [
              "hitokoto",
              "asteroids",
              "switch-model",
              "switch-texture",
              "photo",
              "info",
              "quit",
            ],
          });
        }
      })
      .catch(() => {
        // Silently fail if resources can't be loaded
      });

    return () => {
      style.remove();
    };
  }, []);

  return null; // The widget injects itself into the DOM
}
