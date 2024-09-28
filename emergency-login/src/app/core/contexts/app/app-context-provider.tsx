import {
  ENUM_TOOLTIPS_TYPES,
  ToolTipsMessageProps,
} from '../../../atoms/alerts/tooltipsMessage';
import { useState } from 'react';
import { AppContext } from './app-context';
import { ToolTipsMessageContainer } from '../../../atoms/alerts/containerTooltipsMessages';

export const AppContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [messages, setMessages] = useState<ToolTipsMessageProps[]>([]);

  const showError = (msg: string) => {
    setMessages([
      ...messages,
      {
        msg,
        type: ENUM_TOOLTIPS_TYPES.error,
        closable: true,
        duration: 10,
      },
    ]);
  };

  const showInfo = (msg: string) => {
    setMessages([
      ...messages,
      {
        msg,
        type: ENUM_TOOLTIPS_TYPES.info,
        closable: true,
        duration: 10,
      },
    ]);
  };

  const InitialState = { messages, setMessages, showError, showInfo };
  return (
    <>
      <ToolTipsMessageContainer messages={messages} />
      <AppContext.Provider value={InitialState}>{children}</AppContext.Provider>
    </>
  );
};
