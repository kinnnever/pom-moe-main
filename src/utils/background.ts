// src/utils/background.ts
import { writable } from "svelte/store";
import { browser } from "$app/environment";

// Store global
export const backgroundUrl = writable(""); // rỗng ban đầu

if (browser) {
  // Nếu có localStorage (từ thao tác trước), load vào store
  const storedBg = localStorage.getItem("customBackground");
  if (storedBg) {
    backgroundUrl.set(storedBg);
  }

  // Lắng nghe thay đổi từ tab khác
  window.addEventListener("storage", (e) => {
    if (e.key === "customBackground") {
      backgroundUrl.set(e.newValue || "");
    }
  });
}

// Hàm cập nhật store + localStorage
export function setBackground(url: string) {
  if (!browser) return;
  backgroundUrl.set(url);
  localStorage.setItem("customBackground", url);
}

// Reset
export function resetBackground() {
  if (!browser) return;
  backgroundUrl.set("");
  localStorage.removeItem("customBackground");
}
