import { useState, useEffect } from "react";
import { ref, onValue, set } from "firebase/database";
import { db } from "../lib/firebase/firebase";
import like from "../assets/like.svg";

export default function ReactionButton() {
  const [likes, setLikes] = useState(0);
  const [hasLiked, setHasLiked] = useState(false);

  // Get or create deviceId
  const deviceId = (() => {
    let id = localStorage.getItem("deviceId");

    if (!id) {
      // Try randomUUID if available
      if (window.crypto && typeof window.crypto.randomUUID === "function") {
        id = crypto.randomUUID();
      }

      // Final fallback: timestamp + random
      else {
        id =
          "device-" +
          Date.now().toString(36) +
          "-" +
          Math.random().toString(36).substring(2, 10);
      }

      localStorage.setItem("deviceId", id);
    }

    return id;
  })();

  useEffect(() => {
    const likesRef = ref(db, "reactions/likes");

    // Listen for likes in realtime
    onValue(likesRef, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        setLikes(Object.keys(data).length);
        setHasLiked(!!data[deviceId]);
      } else {
        setLikes(0);
        setHasLiked(false);
      }
    });
  }, [deviceId]);

  const handleLike = () => {
    if (hasLiked) {
      return;
    }
    const userLikeRef = ref(db, `reactions/likes/${deviceId}`);
    set(userLikeRef, true);
  };

  return (
    <div className="like flex items-center mt-3 gap-1">
      <img
        src={like}
        alt="like"
        className={`mr-2 cursor-pointer ${hasLiked ? "opacity-50" : ""}`}
        onClick={handleLike}
      />
      <p className="underline">{likes}</p>
    </div>
  );
}
