import { ChangeEvent, ChangeEventHandler, RefObject } from 'react';

type TProps = {
  onChange: ChangeEventHandler<HTMLInputElement>;
  ref?: RefObject<HTMLInputElement | null>;
  title: string;
  type?: string;
  value: string;
};

export default function Input({
  onChange,
  ref,
  title,
  type = 'text',
  value,
}: TProps) {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    onChange?.(event);
  };

  return (
    <label className="form-control w-full max-w-xs">
      <div className="label">
        <span className="label-text">{title}</span>
      </div>
      <input
        className="input input-bordered w-full max-w-xs"
        ref={ref}
        onChange={handleChange}
        type={type}
        value={value}
      />
    </label>
  );
}
