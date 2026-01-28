export const useLessonTabbarLayout = () => {
  const tabbar = document.querySelector("ion-tab-bar");

  const hideTabbar = () => {
    if (tabbar) {
      document.documentElement.style.setProperty(
        "--tabbar-offset",
        "var(--ion-safe-area-bottom)"
      );
      tabbar.classList.add("hidden");
    }
  };

  const showTabbar = () => {
    if (tabbar) {
      document.documentElement.style.removeProperty("--tabbar-offset");
      tabbar.classList.remove("hidden");
    }
  };

  return [showTabbar, hideTabbar];
};
