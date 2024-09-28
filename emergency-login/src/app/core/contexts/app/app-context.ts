import { Dispatch, SetStateAction, createContext, useState } from 'react';
import { ToolTipsMessageProps } from '../../../atoms/alerts/tooltipsMessage';

interface AppContextProps {
  messages: ToolTipsMessageProps[];
  setMessages: Dispatch<SetStateAction<ToolTipsMessageProps[]>>;
  showError: (msg: string) => void;
  showInfo: (msg: string) => void;
}

export const AppContext = createContext<AppContextProps>({
  messages: [],
  setMessages: (msg) => {
    console.log(msg);
  },
  showError: (msg) => {
    console.log(msg);
  },
  showInfo: (msg) => {
    console.log(msg);
  },
});
