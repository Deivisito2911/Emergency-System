import { useEffect, useState } from 'react';
import { ToolTipsMessage, ToolTipsMessageProps } from './tooltipsMessage';
export const ToolTipsMessageContainer = ({
  messages = [],
}: {
  messages?: ToolTipsMessageProps[];
}) => {
  return (
    <div className="absolute  max-h-32 sm:max-h-80 top-7 right-7 sm:w-1/3 flex flex-col overflow-hidden">
      {messages.map((msg, index) => (
        <ToolTipsMessage {...msg} key={`index-${index}`} />
      ))}
    </div>
  );
};
