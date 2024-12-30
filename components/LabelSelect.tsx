import { ChangeEventHandler, RefObject } from 'react';

type TSelectOption = {
  text: string;
  value: string;
};

export default function LabelSelect({
  data: list,
  disabled,
  onChange,
  ref,
  title,
  value,
}: {
  data: TSelectOption[];
  disabled?: boolean;
  onChange?: ChangeEventHandler<HTMLSelectElement>;
  ref?: RefObject<HTMLSelectElement | null>;
  title: string;
  value?: string;
}) {
  return (
    <label className="form-control w-full max-w-xs">
      <div className="label">
        <span className="label-text">{title}</span>
      </div>
      <select
        className="select select-bordered w-full max-w-xs"
        disabled={disabled}
        onChange={onChange}
        ref={ref}
        value={value}
      >
        <option disabled value="">
          -
        </option>
        {list.map(({ text, value }) => (
          <option key={value} value={value}>
            {text}
          </option>
        ))}
      </select>
    </label>
  );
}
