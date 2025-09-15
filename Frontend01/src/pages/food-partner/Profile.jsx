import React from "react";
import { useParams } from "react-router-dom";
import "./Profile.css";

// Dummy store data
const stores = {
  1: {
    name: "Sushi Delight",
    joiningDate: "2023-08-12",
    mealsServed: 120,
    videos: [
      "https://ik.imagekit.io/ulw9pujkz/6a0ecfbe-25c6-4c6f-a918-6f80028321f0_KR39ELtULX",
      "https://ik.imagekit.io/ulw9pujkz/dbda3a0c-bbc1-482a-9392-0494517a772a_IZg1gxpfu",
    ],
  },
  2: {
    name: "HomeTaste Foods",
    joiningDate: "2022-11-05",
    mealsServed: 340,
    videos: [
      "https://ik.imagekit.io/ulw9pujkz/e95b7197-ae14-4544-b8f8-4fe191d8af38_H3fpWluU4",
      "https://ik.imagekit.io/ulw9pujkz/1c31e6c3-8fe6-45d8-abd6-e3931a28bd43_hyINuT7EQ",
    ],
  },
  3: {
    name: "Chefs Corner",
    joiningDate: "2021-06-23",
    mealsServed: 890,
    videos: [
      "https://ik.imagekit.io/ulw9pujkz/6654fb52-867c-484e-a062-9fa80e686bce_D-cctMljks",
    ],
  },
};

const Profile = () => {
  const { id } = useParams();
  const store = stores[id];

  if (!store) {
    return <h2 style={{ textAlign: "center" }}>Store not found</h2>;
  }

  return (
    <div className="profile-container">
      <h1 className="profile-title">{store.name}</h1>
      <p>
        <strong>Joining Date:</strong> {store.joiningDate}
      </p>
      <p>
        <strong>Total Meals Served:</strong> {store.mealsServed}
      </p>

      <h2 className="video-section-title">Food Videos</h2>
      <div className="video-grid">
        {store.videos.map((video, index) => (
          <video
            key={index}
            className="profile-video"
            src={video}
            controls
            muted
          />
        ))}
      </div>
    </div>
  );
};

export default Profile;
