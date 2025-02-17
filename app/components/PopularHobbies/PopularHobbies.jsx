import React from "react";
import HobbyTag from "../HobbyTag";
import styles from "./style.module.scss";
import HobbyBubble from "../HobbyBubble";
import { connectToDB } from "@/server/connect";
import { getPopularHobbies } from "@/server/service/fallen.service";

export default async function PopularHobbies({ containerType = "tag" }) {
  await connectToDB();

  const hobbies = await getPopularHobbies();

  if (containerType === "bubble") {
    return (
      <div className={styles.hobbyBubblesContainer}>
        {hobbies.map((hobby, index) => (
          <HobbyBubble key={index} plusMode={false} className={styles.bubble}>
            {hobby._id}
          </HobbyBubble>
        ))}
      </div>
    );
  } else {
    return (
      <div className={styles.hobbyTagsContainer}>
        {hobbies.map((hobby, index) => (
          <HobbyTag hobby={hobby._id} key={index} />
        ))}
      </div>
    );
  }
}
