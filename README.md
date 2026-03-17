# Frimi01-Projects

This repository tracks some of my personal projects, tools, and experiments. 
Most projects focus on practical utilities, automation, and lightweight tools.

[Consider buying me coffe!](https://ko-fi.com/frimi01)

[Or support me on Patreon!](https://patreon.com/Frimi01?utm_medium=unknown&utm_source=join_link&utm_campaign=creatorshare_creator&utm_content=copyLink)

## SawkobanPlayer.ahk
[For more info on 100% COMPLETING SAWKOBAN with the Sawkoban Player](https://ko-fi.com/post/HOW-TO-BEAT-SAWKOBAN-100-B0B119AUZ0?justpublished=true&alias=HOW-TO-BEAT-SAWKOBAN-100-B0B119AUZ0#shareNewPostModal)

The file and code can be seen and downloaded from the repository. 


| Controls:            | Result         |
| -------------------- | -------------- |
| Control + Up arrow   | Next Track     |
| Control + Down arrow | Previous Track |
| Control + Space      | Show Track     |
| Control + Enter      | Play           |
| Control + Q          | Exit           |

The tracks are simply the level you want to play. You can easily see which one you have selected by the small square beside your cursor when changing tracks, or by tapping Control + Space to open a popup.

You can change the ms delay between keypresses on line 186, SetKeyDelay(300, 20) if necessary. 300 being the interval between presses and 20 being the hold duration (the values I set should already be near optimal). Please leave a comment on GitHub if anything is wrong.

I found all the level inputs from [here](https://steamcommunity.com/sharedfiles/filedetails/?id=1468880175) , except 118, which I made myself.

https://github.com/Frimi01/Frimi01-Projects/blob/main/Sawkoban%20Player.ahk

## FriBrowse: Minimalistic searching and bookmark solution!
With no ads or distractions, you can have this as your home page, easily search the web, and store your bookmarks in folders.

The vertical and nested bookmarks allow you to see more and longer names/URLs without compromise. This makes it easier to view larger amounts of bookmarks and organize your favorite websites, research materials, and notes. This allows for much more customizability than most bookmark integrations. The appearance is minimalistic and has customizability options!

<img width="1077" height="696" alt="443042141-31aa2bea-8c97-4561-9842-0d4f2c06ea74" src="https://github.com/user-attachments/assets/1536acad-0872-4156-8db1-048c19ee5b6f" />

https://github.com/Frimi01/Fribrowse

## Homelab (Frimi01.com)
I run a personal homelab built around a NAS server with 12TB of storage (planned upgrade to 64GB RAM) which I use for experimenting with self-hosting, deployment, and infrastructure. 

It also handles my website which includes subdomains reserved for applications written for some of my clients. (The high volume and simple design on the gametracker subdomain was requested)

The homelab acts as both a development environment and a platform for hosting my own tools and services. It allows me to test ideas, deploy projects, and learn how real systems behave outside of local development.

Current uses:
1. Hosting personal projects and web services
2. Testing deployments and server configurations
3. File storage, database and backup management (Drive and Obsidian sync support)
4. Running automation tools and experiments
5. Development sandbox for new utilities

Skills explored:
1. Self-hosting and service deployment
2. Linux server management
3. Networking and remote access configuration
4. Storage management and backups
5. Debugging production environments

The homelab is where many of my projects are tested and deployed before being shared publicly.
(More documentation and setup details will be added as the system evolves.)

## frim-convert
A lightweight program for converting and modifying files. Currently, it supports trimming videos using FFmpeg and converting file types (that ffmpeg can change), with plans to add more features like metadata display and additional file operations.

<img width="397" height="304" alt="bilde" src="https://github.com/user-attachments/assets/5146051f-dd19-430d-8cd5-910b38e8cc11" />

https://github.com/Frimi01/frim-convert

## Friword-finder
A CLI tool for finding words through any given dictionaries. It uses fast algorithms to quickly and efficiently return data from a list of words. Serves well as a tool for games (similar to this) https://wordfinder.yourdictionary.com/

It is still in development.

## Wallpaper Engine:

### 1.  Improved clock logic with easily modifiable time zones and optional am/pm text.
This should really be the default by the editor!

Add a default clock from the engine and tap on the glowing blue gear icon besides the text field. Tap edit script, and copy and paste my code in replacing the default one, and click OK. All interactions with the script are in the default UI!

https://github.com/Frimi01/Frimi01-Projects/blob/main/WallpaperEngine/Improved%20Digital%20Clock%20Logic.js 

### 2.  Analogue clock logic with working time zone adjustment!
I added the simple timezone logic and ui to make easy clocks without needing to code. Inspired by [this guy](https://steamcommunity.com/sharedfiles/filedetails/?id=2107481179)

You can easily go there and add his clock to just import these scripts and get everything out of the box. Otherwise, you can attach them to anything and have it rotate at the correct rates.

(Copy-pasting the rotation logic, you can easily rotate clocks made by other people for nice aesthetics, though that requires a slight bit of manual work)

The opacity script can be used on anything, so don’t be afraid to be creative and toggle larger changes of sprites and textures in your envirment based on the time! (might add even more flexibility in the future)

https://github.com/Frimi01/Frimi01-Projects/tree/main/WallpaperEngine/Analogue%20Clock%20Logic

## Div_config
1. Wezterm
2. Alacritty (my windows version)
3. Powershell

I recommend linking PowerShell to C:\Program Files\PowerShell\7\Microsoft.PowerShell_profile.ps1 rather than $HOME\Documents\PowerShell so that the profile loads regardless of user and - depending on how your host is configured - when running as administrator.

https://github.com/Frimi01/Frimi01-Projects/tree/main/Div_config

## Hobby Focused Projects
Less useful projects that I want to share because they’re cool.

**1. Simulated Calculator**
Made a calculator by drawing threads and using minimalish logic gates in Virtual Circuit Board.

https://github.com/Frimi01/Frimi01-Projects/tree/main/hobbyProjects/Calculator
