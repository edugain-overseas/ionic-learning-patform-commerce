import { RefresherCustomEvent } from "@ionic/react";

export const onRefreshPromise = (e: RefresherCustomEvent) => {
  setTimeout(() => {
    e.detail.complete();
  }, 1000);
};
