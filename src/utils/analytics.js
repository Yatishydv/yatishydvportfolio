export const trackEvent = async (eventType, eventData = null) => {
  try {
    await fetch("/api/analytics", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        eventType,
        eventData,
        path: window.location.pathname
      })
    });
  } catch (error) {
    console.error("Failed to track event", error);
  }
};
