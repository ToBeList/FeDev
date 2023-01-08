import { useState } from "react";
import Checkbox from "./CheckBox";

export const CheckBox = () => {
  const [isChecked, setIsChecked] = useState<boolean>(false);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsChecked(e.target.checked);
  };
  return <Checkbox id="checkbox" checked={isChecked} onChange={onChange} />;
};

export const LabelCheckedBox = () => {
  const [isChecked, setIsChecked] = useState<boolean>(false);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsChecked(e.target.checked);
  };
  return (
    <Checkbox
      id="checkbox_labeled"
      checked={isChecked}
      onChange={onChange}
      label="늘보"
    />
  );
};
