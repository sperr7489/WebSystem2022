import { useState } from "react";
import "../css/checkBox.css";
export default function CheckBox(props) {
  const [checked, setChecked] = useState(true);
  const { publish, togglePublish } = props;

  const handleChange = () => {
    setChecked((prev) => !prev);

    togglePublish({ checked: !checked, publish });
  };
  return (
    <div id="checkBox">
      <label htmlFor="publish"></label>
      <input
        id="publish"
        type="checkbox"
        checked={checked}
        onChange={handleChange}
      />
      {publish}
    </div>
  );
}
