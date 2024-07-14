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
} from "../components/dialog";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "../components/hover-card";



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
  const [dialogOpen, setDialogOpen] = useState(false);

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
            <Tooltip key={1}>
              <TooltipTrigger onClick={() => setDialogOpen(true)}>
                <Info />
              </TooltipTrigger>
              <TooltipContent 
                className="border-[1px] z-50 rounded-[4px] border-white dark:border-white dark:bg-dark-background" 
                sideOffset={10}
              >
                Click for more info
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="border-2 border-dark-yellow dark:border-dark-yellow z-50 rounded-[4px] text-dark-white dark:text-dark-white dark:bg-dark-background">
          <DialogHeader>
            <DialogTitle>
              <div>
                Site Information
              </div>
              <div className="text-xs pt-1 text-dark-yellow tracking-wide">
                Release 1.1
              </div>
            </DialogTitle>
            <DialogDescription className="flex flex-col gap-1">
              <div className="pt-2"></div>
              <div className="text-sm dark:text-dark-green">General</div>
              <div className="text-[16px]">
                <span className="glowing">rodrodrod.xyz</span> is a portfolio website made by myself, <a className="underline" href='https://linkedin.com/in/rodrigo-delaguila'>Rodrigo Del Aguila</a>.
              </div>
              <div className="text-[16px] pt-2">
                It is designed as a{' '}
                <HoverCard key={2}>
                  <HoverCardTrigger>
                    <span className="underline cursor-pointer">shell interface</span>
                  </HoverCardTrigger>
                  <HoverCardContent 
                    className="border-[1px] text-xs z-50 rounded-[4px] border-white dark:border-white dark:bg-dark-background" sideOffset={6}>
                    A <span className="text-dark-green">shell interface</span> is a command-line interface used to interact with the operating system or application through text commands.
                  </HoverCardContent>
                </HoverCard>
                {`, similar to bash - with a few common commands such as 'whoami', 'sudo', and 'ls'.`} 
              </div>
              <div className="text-[16px] pt-2">
                There are also custom commands, some with{' '} 
                <HoverCard key={2}>
                  <HoverCardTrigger>
                    <span className="underline cursor-pointer">API calls</span>
                  </HoverCardTrigger>
                  <HoverCardContent 
                    className="border-[1px] text-xs z-50 rounded-[4px] border-white dark:border-white dark:bg-dark-background" 
                    sideOffset={6}
                  >
                    An <span className="text-dark-green">API (Application Programming Interface) call</span> is a request made to an API endpoint to retrieve or send data between applications.
                  </HoverCardContent>
                </HoverCard>
                {`, such as 'projects', 'weather', and 'resume'.`} 
              </div>
              <div className="pt-2"></div>
              <div className="text-sm dark:text-dark-green">Usage</div>
              <div className="text-[16px] pt-2">
              </div>
              <div className="pt-2"></div>
              <div className="text-sm dark:text-dark-green">Tech stack</div>
              <div className="text-[16px] pt-2">
              </div>
              <div className="pt-2"></div>
              <div className="text-sm dark:text-dark-green">Releases</div>
              <div className="text-[16px] pt-2">
              </div>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Input;
