import { useCallback } from "react";

type TrackingPayload = Record<string, string | number | boolean | null | undefined>;

type TrackEventArgs = {
  event: string;
  payload?: TrackingPayload;
};

type WindowWithDataLayer = Window & {
  dataLayer?: Array<Record<string, unknown>>;
};

export const useEventTracking = () => {
  return useCallback(({ event, payload = {} }: TrackEventArgs) => {
    const trackingEvent = {
      event,
      ...payload,
      timestamp: new Date().toISOString(),
    };

    const globalWindow = window as WindowWithDataLayer;

    if (Array.isArray(globalWindow.dataLayer)) {
      globalWindow.dataLayer.push(trackingEvent);
      return;
    }

    console.info("[tracking]", trackingEvent);
  }, []);
};
