import React, { useState } from 'react';
import { commandExists } from '../utils/commandExists';
import { shell } from '../utils/shell';
import { handleTabCompletion } from '../utils/tabCompletion';
import { Ps1 } from './Ps1';
import { Info } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '../components/tooltip';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../components/dialog";


export const Input = ({
  inputRef,
  containerRef,
  command,
  history,
  lastCommandIndex,
  setCommand,
  setHistory,
  setLastCommandIndex,
  clearHistory,
}) => {
  const [open, setOpen] = useState(false);

  const onSubmit = async (event: React.KeyboardEvent<HTMLInputElement>) => {
    const commands: [string] = history
      .map(({ command }) => command)
      .filter((command: string) => command);

    if (event.key === 'c' && event.ctrlKey) {
      event.preventDefault();
      setCommand('');
      setHistory('');
      setLastCommandIndex(0);
    }

    if (event.key === 'l' && event.ctrlKey) {
      event.preventDefault();
      clearHistory();
    }

    if (event.key === 'Tab') {
      event.preventDefault();
      handleTabCompletion(command, setCommand);
    }

    if (event.key === 'Enter' || event.code === '13') {
      event.preventDefault();
      setLastCommandIndex(0);
      await shell(command, setHistory, clearHistory, setCommand);
      containerRef.current.scrollTo(0, containerRef.current.scrollHeight);
    }

    if (event.key === 'ArrowUp') {
      event.preventDefault();
      if (!commands.length) {
        return;
      }
      const index: number = lastCommandIndex + 1;
      if (index <= commands.length) {
        setLastCommandIndex(index);
        setCommand(commands[commands.length - index]);
      }
    }

    if (event.key === 'ArrowDown') {
      event.preventDefault();
      if (!commands.length) {
        return;
      }
      const index: number = lastCommandIndex - 1;
      if (index > 0) {
        setLastCommandIndex(index);
        setCommand(commands[commands.length - index]);
      } else {
        setLastCommandIndex(0);
        setCommand('');
      }
    }
  };

  const onChange = ({
    target: { value },
  }: React.ChangeEvent<HTMLInputElement>) => {
    setCommand(value);
  };

  return (
    <div className="flex flex-row space-x-2 border-[1px] rounded border:white dark:border-white p-1 mr-2">
      <div className="flex w-full justify-between items-center">
        <div className="flex flex-row space-x-2 w-full pr-2">
          <label htmlFor="prompt" className="flex-shrink">
            <Ps1 />
          </label>

          <input
            ref={inputRef}
            id="prompt"
            type="text"
            className={`bg-light-background dark:bg-dark-background focus:outline-none flex-grow ${
              commandExists(command) || command === ''
                ? 'text-dark-green'
                : 'text-dark-red'
            }`}
            value={command}
            onChange={onChange}
            autoFocus
            onKeyDown={onSubmit}
            autoComplete="off"
            spellCheck="false"
            placeholder={`type command here ('about', 'projects', 'sudo', etc)`}
          />
        </div>
        <div className="flex items-center">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger onClick={() => setOpen(true)}>
                <Info />
              </TooltipTrigger>
              <TooltipContent 
                className="border-[1px] z-50 rounded-[4px] border-white dark:border-white mr-[60px]" 
                sideOffset={10}
              >
                Click for more info
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="border-[1px] border-dark-white dark:border-dark-white z-50 rounded-[4px] text-dark-white dark:text-dark-white dark:bg-dark-background">
          <DialogHeader>
            <DialogTitle>Welcome to my site!</DialogTitle>
            <DialogDescription>
              TEST
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Input;
