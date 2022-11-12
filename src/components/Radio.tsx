import { ChangeEvent } from "react";

type RadioProps = {
  label: string;
  groupName?: string;
  id: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => unknown;
};

export const Radio = ({ label, groupName, id, onChange }: RadioProps) => {
  return (
    <div>
      <input type="radio" id={id} name={groupName} onChange={onChange} />
      <label htmlFor={id}>{label}</label>
    </div>
  );
};
