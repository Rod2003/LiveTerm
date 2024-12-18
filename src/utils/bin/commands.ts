// List of commands that do not require API calls

import * as bin from './index';
import config from '../../../config.json';

// Help
export const help = async (args: string[]): Promise<string> => {
  const commands = Object.keys(bin).sort().join(', ');
  var c = '';
  for (let i = 1; i <= Object.keys(bin).sort().length; i++) {
    c += Object.keys(bin).sort()[i - 1] + '\n';
  }
  return `Welcome! Here are all the available commands:
\n${c}\n
[tab]: trigger completion.
[ctrl+l]/clear: clear terminal.\n
Type 'sumfetch' to display summary.
`;
};

// About
export const about = async (args: string[]): Promise<string> => {
  return `Hi, I'm ${config.name}.
I have a passion for building software products with visible impact. 
Welcome to my website!

More about me:
'sumfetch' - short summary.
'resume' - my latest resume.
'linkedin - my LinkedIn profile.`;
};

// Resume
export const resume = async (args: string[]): Promise<string> => {
  window.open(`${config.resume_url}`);
  return 'Opening resume...';
};

// Donate
export const donate = async (args: string[]): Promise<string> => {
  return `thank you for your interest. 
here is the way you can support my work:
- <u><a class="text-light-blue dark:text-dark-blue underline" href="${config.donate_url}" target="_blank">buymeacoffee</a></u>
`;
};

// Contact
export const email = async (args: string[]): Promise<string> => {
  window.open(`mailto:${config.email}`);
  return `Opening mailto:${config.email}...`;
};

export const github = async (args: string[]): Promise<string> => {
  window.open(`https://github.com/${config.social.github}/`);

  return 'Opening github...';
};

// LinkedIn
export const linkedin = async (args: string[]): Promise<string> => {
  window.open(`https://www.linkedin.com/in/${config.social.linkedin}/`);

  return 'Opening linkedin...';
};

// Search
export const google = async (args: string[]): Promise<string> => {
  window.open(`https://google.com/search?q=${args.join(' ')}`);
  return `Searching google for ${args.join(' ')}...`;
};

export const reddit = async (args: string[]): Promise<string> => {
  window.open(`https://www.reddit.com/search/?q=${args.join(' ')}`);
  return `Searching reddit for ${args.join(' ')}...`;
};

// Typical linux commands
export const echo = async (args: string[]): Promise<string> => {
  return args.join(' ');
};

export const whoami = async (args: string[]): Promise<string> => {
  return `${config.ps1_username}`;
};

export const ls = async (args: string[]): Promise<string> => {
  console.log('here: ', args);
  if (args[0] === '-a') {
    return `a 
bunch
of 
fake
directories
.you
.know
.your
.shell
.commands!`;
  } else {
    return `a
bunch
of
fake
directories`;
  }
};

export const cd = async (args: string[]): Promise<string> => {
  return `unfortunately, i cannot afford more directories.
if you want to help, you can type 'donate'.`;
};

export const date = async (args: string[]): Promise<string> => {
  return new Date().toString();
};

export const vi = async (args: string[]): Promise<string> => {
  return `woah, you still use 'vi'? just try 'vim'.`;
};

export const vim = async (args: string[]): Promise<string> => {
  return `'vim' is so outdated. how about 'nvim'?`;
};

export const nvim = async (args: string[]): Promise<string> => {
  return `'nvim'? too fancy. why not 'emacs'?`;
};

export const emacs = async (args?: string[]): Promise<string> => {
  return `you know what? just use vscode.`;
};

export const sudo = async (args?: string[]): Promise<string> => {
  window.open('https://www.youtube.com/watch?v=dQw4w9WgXcQ', '_blank'); // ...I'm sorry
  return `Permission denied: with little power comes... no responsibility? `;
};

// Banner
export const banner = (args?: string[]): string => {
  return `
██████╗  ██████╗ ██████╗ ██████╗ ██╗ ██████╗  ██████╗                    
██╔══██╗██╔═══██╗██╔══██╗██╔══██╗██║██╔════╝ ██╔═══██╗                   
██████╔╝██║   ██║██║  ██║██████╔╝██║██║  ███╗██║   ██║                   
██╔══██╗██║   ██║██║  ██║██╔══██╗██║██║   ██║██║   ██║                   
██║  ██║╚██████╔╝██████╔╝██║  ██║██║╚██████╔╝╚██████╔╝                   
╚═╝  ╚═╝ ╚═════╝ ╚═════╝ ╚═╝  ╚═╝╚═╝ ╚═════╝  ╚═════╝                    
                                                                         
██████╗ ███████╗██╗          █████╗  ██████╗ ██╗   ██╗██╗██╗      █████╗ 
██╔══██╗██╔════╝██║         ██╔══██╗██╔════╝ ██║   ██║██║██║     ██╔══██╗
██║  ██║█████╗  ██║         ███████║██║  ███╗██║   ██║██║██║     ███████║
██║  ██║██╔══╝  ██║         ██╔══██║██║   ██║██║   ██║██║██║     ██╔══██║
██████╔╝███████╗███████╗    ██║  ██║╚██████╔╝╚██████╔╝██║███████╗██║  ██║
╚═════╝ ╚══════╝╚══════╝    ╚═╝  ╚═╝ ╚═════╝  ╚═════╝ ╚═╝╚══════╝╚═╝  ╚═╝
                                                                         
                                                                                                         
Type 'help' to see the list of available commands.
Type 'sumfetch' to display summary.
`;
};
