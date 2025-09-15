import React, { useRef } from "react";
import "./VideoFeed.css"; // Create a separate CSS file

const videos = [
  {
    src: "/videos/video1.mp4",
    description: "Check out our new store products!",
    buttonText: "Visit Store",
    buttonLink: "/store/1",
  },
  {
    src: "/videos/video2.mp4",
    description: "Amazing food recipeas to try at home",
    buttonText: "Visit Store",
    buttonLink: "/store/2",
  },
  // Add more video objects
];

const VideoFeed = () => {
  const containerRef = useRef(null);

  return (
    <div className="video-feed-container" ref={containerRef}>
      {videos.map((video, index) => (
        <div className="video-item" key={index}>
          <video
            className="video-content"
            src={video.src}
            autoPlay
            loop
            muted
            playsInline
          />
          <div className="video-overlay">
            <p className="video-description">{video.description}</p>
            <a href={video.buttonLink} className="video-button">
              {video.buttonText}
            </a>
          </div>
        </div>
      ))}
    </div>
  );
};

export default VideoFeed;
