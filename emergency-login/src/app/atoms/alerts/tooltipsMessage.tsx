import { XMarkIcon } from '@heroicons/react/24/solid';
import { useEffect, useState } from 'react';

export const enum ENUM_TOOLTIPS_TYPES {
  error = 'error',
  info = 'info',
  success = 'success',
  warn = 'warn',
  stale = 'stale',
}

export interface ToolTipsMessageProps {
  msg: string;
  type?: ENUM_TOOLTIPS_TYPES;
  duration?: number;
  closable?: boolean;
}

const TYPE_CLASS: { [key in ENUM_TOOLTIPS_TYPES]: string } = {
  error: 'bg-red-600 border-red-700',
  info: 'bg-teal-500 border-teal-700',
  success: 'bg-slate-300',
  warn: 'bg-slate-300',
  stale: 'bg-slate-300',
};

const baseClass =
  'rounded-md border-2 p-3 m-3 transition-opacity ease-in opacity-90 hover:opacity-100 text-white';
export const ToolTipsMessage = ({
  type = ENUM_TOOLTIPS_TYPES.stale,
  msg,
  duration,
  closable = false,
}: ToolTipsMessageProps) => {
  const [visible, setVisible] = useState(true);
  const [opacity, setOpacity] = useState(0);
  const finalClass = baseClass + ' ' + TYPE_CLASS[type];
  useEffect(() => {
    const timeToHide = duration
      ? duration
      : duration === undefined && !closable
      ? 15
      : 300;
    setTimeout(() => setVisible(false), timeToHide * 1000);
  }, []);

  useEffect(() => {
    setTimeout(() => setOpacity(100), 500);
  }, []);

  if (!visible) return <></>;
  return (
    <div className={finalClass + ` opacity-${opacity}`}>
      {msg}
      {closable && (
        <XMarkIcon
          className="w-5 text-stale-500 float-right cursor-pointer hover:text-red-500"
          onClick={() => setVisible(false)}
        />
      )}
    </div>
  );
};
