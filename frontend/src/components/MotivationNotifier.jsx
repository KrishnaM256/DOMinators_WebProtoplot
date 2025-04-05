import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const messages = [
  "Hey warrior 💪, 10 minutes of stretching can change your mood!",
  "Your body loves hydration — grab a glass of water! 💧",
  "Breathe in… Breathe out. Take a mindful break 🌿",
  "Small steps lead to big changes! Keep going 🏃‍♂️",
  "Good posture = good vibes 😎 Sit up straight!"
];

function MotivationNotifier() {
  const [notificationSupported, setNotificationSupported] = useState(true);

  useEffect(() => {
    // Don't run on server-side
    if (typeof window === "undefined") return;

    const showNotification = (message) => {
      console.log("Attempting to show notification:", message);
      
      // Try browser notifications first if supported and permitted
      if ("Notification" in window) {
        if (Notification.permission === "granted") {
          try {
            const notification = new Notification("✨ Health Tip", {
              body: message,
              icon: "/icon.png",
              requireInteraction: false
            });
            
            // Add click handler
            notification.onclick = () => {
              window.focus();
              notification.close();
            };
            
            return;
          } catch (error) {
            console.error("Browser notification failed:", error);
          }
        }
      }
      
      // Fallback to toast notifications
      console.log("Falling back to toast notification");
      setNotificationSupported(false);
      toast(message, {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    };

    const notifyUser = () => {
      const randomMessage = messages[Math.floor(Math.random() * messages.length)];
      console.log("🔔 Sending notification:", randomMessage);
      showNotification(randomMessage);
    };

    // Check notification support and permissions
    const setupNotifications = () => {
      if (!("Notification" in window)) {
        console.log("Browser notifications not supported");
        setNotificationSupported(false);
        return;
      }

      if (Notification.permission === "granted") {
        console.log("Notifications already granted");
        // Initial notification after 3 seconds
        const initialTimeout = setTimeout(notifyUser, 3000);
        // Then every 5 minutes (300000ms)
        const interval = setInterval(notifyUser, 300000);
        
        return () => {
          clearTimeout(initialTimeout);
          clearInterval(interval);
        };
      } 
      else if (Notification.permission !== "denied") {
        console.log("Requesting notification permission");
        Notification.requestPermission().then(permission => {
          if (permission === "granted") {
            console.log("Notification permission granted");
            notifyUser();
            const interval = setInterval(notifyUser, 300000);
            return () => clearInterval(interval);
          } else {
            console.log("Notification permission denied");
            setNotificationSupported(false);
          }
        });
      } else {
        console.log("Notifications previously denied");
        setNotificationSupported(false);
      }
    };

    const cleanup = setupNotifications();

    return cleanup;
  }, []);

  return null;
}

export default MotivationNotifier;