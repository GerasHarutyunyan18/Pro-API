import React from "react";
import { Card } from "antd";
import { useAuthContext } from "@/contexts/auth";

const { Meta } = Card;

export default function UserCard() {
  const { currentUser } = useAuthContext();
  return (
    <Card
      style={{ width: 300 }}
      cover={
        <img
          alt="example"
          src="https://xsgames.co/randomusers/avatar.php?g=pixel"
        />
      }
    >
      <Meta
        title={`${currentUser?.name} ${currentUser?.surname}`}
        description={
          <>
            <b>@{currentUser?.nickname}</b>
          </>
        }
      />
    </Card>
  );
}
