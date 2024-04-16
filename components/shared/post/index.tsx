import Button from "@/components/primitives/button";
import { ButtonTypes } from "@/constants/enums";

import styles from "./post.module.scss";
import { Carousel } from "antd";

interface PostProps {
  post: any;
}

export default function Post({ post }: PostProps) {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.ownerSection}>
          <img src={post.owner.avatar} />
          <span>{post.owner.nickname}</span>
        </div>
        <div>
          <Button type={ButtonTypes.INFO}>Follow</Button>
        </div>
      </div>
      <div className={styles.content}>
        <p>{post.text}</p>
        <Carousel>
          <img
            width="100%"
            src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
          />
          <img
            width="100%"
            src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
          />
        </Carousel>
      </div>
    </div>
  );
}
