import Post from "@/components/shared/post";

import styles from "./community.module.scss";
import NewPost from "@/components/shared/newPost";

export default function Community() {
  const posts = [
    {
      id: 1,
      text: "Hello everyone!",
      owner: {
        nickname: "John",
        avatar: "https://bit.ly/ryan-florence",
      },
    },
    {
      id: 2,
      text: "Hello John!",
      owner: {
        nickname: "Anna",
        avatar: "https://avatars.githubusercontent.com/u/10286961?s=40&v=4",
      },
    },
  ];
  return (
    <div className={styles.bigContainer}>
      <div className={styles.container}>
        <NewPost />
        {posts.map((el) => {
          return <Post post={el} />;
        })}
      </div>
    </div>
  );
}
