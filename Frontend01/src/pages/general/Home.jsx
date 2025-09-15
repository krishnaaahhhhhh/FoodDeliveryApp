import React, { useRef, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./VideoFeed.css";

const videos = [
  {
    src: "https://ik.imagekit.io/ulw9pujkz/6a0ecfbe-25c6-4c6f-a918-6f80028321f0_KR39ELtULX",
    description: "Check out our new store products!",
    buttonText: "Visit Store",
    storeId: "1",
    likes: 0,
    saves: 0,
    comments: 0,
  },
  {
    src: "https://ik.imagekit.io/ulw9pujkz/dbda3a0c-bbc1-482a-9392-0494517a772a_IZg1gxpfu",
    description: "Amazing food recipes to try at home",
    buttonText: "Visit Store",
    storeId: "2",
    likes: 0,
    saves: 0,
    comments: 0,
  },
  {
    src: "https://ik.imagekit.io/ulw9pujkz/e95b7197-ae14-4544-b8f8-4fe191d8af38_H3fpWluU4",
    description: "Explore our latest cooking videos",
    buttonText: "Visit Store",
    storeId: "3",
    likes: 0,
    saves: 0,
    comments: 0,
  },
  {
    src: "https://ik.imagekit.io/ulw9pujkz/1c31e6c3-8fe6-45d8-abd6-e3931a28bd43_hyINuT7EQ",
    description: "Amazing food recipes to try at home",
    buttonText: "Visit Store",
    storeId: "2",
    likes: 0,
    saves: 0,
    comments: 0,
  },
  {
    src: "https://ik.imagekit.io/ulw9pujkz/6654fb52-867c-484e-a062-9fa80e686bce_D-cctMljks",
    description: "Explore our latest cooking videos",
    buttonText: "Visit Store",
    storeId: "3",
    likes: 0,
    saves: 0,
    comments: 0,
  },
];

const Home = ({ savedVideos, setSavedVideos }) => {
  const containerRef = useRef(null);
  const navigate = useNavigate();

  // Auto-play/pause videos
  useEffect(() => {
    const container = containerRef.current;
    const videosInDOM = container.querySelectorAll("video");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.play();
          else entry.target.pause();
        });
      },
      { threshold: 0.8 }
    );

    videosInDOM.forEach((vid) => observer.observe(vid));
    return () => observer.disconnect();
  }, []);
  const handleVisitStore = (storeId) => {
    navigate(`/profile/${storeId}`);
  };

  const handleSaveVideo = (video) => {
    if (!savedVideos.find((v) => v.src === video.src)) {
      setSavedVideos([...savedVideos, video]);
    }
  };

  return (
    <div className="video-feed-container" ref={containerRef}>
      {videos.map((video, index) => (
        <VideoCard
          key={index}
          video={video}
          onVisitStore={handleVisitStore}
          onSave={handleSaveVideo}
        />
      ))}

      {/* 🔥 Bottom navigation with 4 buttons */}
      <div className="bottom-nav">
        <button className="nav-btn" onClick={() => navigate("/user/register")}>
          User Register
        </button>
        <button className="nav-btn" onClick={() => navigate("/user/login")}>
          User Login
        </button>
        <button
          className="nav-btn"
          onClick={() => navigate("/food-partner/register")}
        >
          Partner Register
        </button>
        <button
          className="nav-btn"
          onClick={() => navigate("/food-partner/login")}
        >
          Partner Login
        </button>
      </div>
    </div>
  );
};

const VideoCard = ({ video, onVisitStore, onSave }) => {
  const [likes, setLikes] = useState(video.likes);
  const [saves, setSaves] = useState(video.saves);

  const handleSave = () => {
    setSaves(saves + 1);
    onSave(video);
  };

  return (
    <div className="video-item">
      <video className="video-content" src={video.src} muted playsInline loop />

      <div className="video-overlay">
        <p className="video-description">{video.description}</p>
        <button
          className="video-button"
          onClick={() => onVisitStore(video.storeId)}
        >
          {video.buttonText}
        </button>
      </div>
    </div>
  );
};

export default Home;
