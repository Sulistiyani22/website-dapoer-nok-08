import React from "react";
import { Label } from "../ui/label";
import { Switch } from "../ui/switch";

function SwitchField({ label, checked, onChange }) {
  return (
    <div className="flex items-center space-x-2">
      <Switch checked={checked} onCheckedChange={onChange} id="airplane-mode" />
      <Label htmlFor="airplane-mode">{label}</Label>
    </div>
  );
}

export default SwitchField;
