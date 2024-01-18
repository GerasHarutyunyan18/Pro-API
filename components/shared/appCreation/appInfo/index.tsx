"use client";
import { Card } from "antd";
import AppLogoUploader from "../appLogoUploader";
import AppNameForm from "../appNameForm";

export default function AppInfo() {
  return (
    <div>
      <Card
        style={{ display: "flex", justifyContent: "center", width: "100%" }}
        bodyStyle={{ width: "100%" }}
        hoverable
      >
        <div>
          <AppLogoUploader />
          <AppNameForm />
        </div>
      </Card>
    </div>
  );
}
