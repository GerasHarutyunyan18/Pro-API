import { Select } from "antd";
import Input from "@/components/primitives/input";
import TextArea from "antd/es/input/TextArea";
import { AppIndustries, AppTypesOptions } from "@/constants/options";

import styles from "./appNameForm.module.scss";

export default function AppNameForm() {
  return (
    <div className={styles.container}>
      <Input placeholder="App name" />
      <Select
        placeholder="Select APP type"
        optionFilterProp="children"
        options={AppTypesOptions}
      />
      <Select
        placeholder="Select Industry"
        optionFilterProp="children"
        options={AppIndustries}
      />
      <Input placeholder="Domain" />
      <TextArea placeholder="Description"></TextArea>
    </div>
  );
}
