@echo off
setlocal enabledelayedexpansion

:: 颜色
set "red=\033[91m"
set "green=\033[92m"
set "yellow=\033[93m"
set "magenta=\033[95m"
set "cyan=\033[96m"
set "none=\033[0m"  REM 无颜色

:: 等待5秒 read 获取命令行输入, -n 字符串大于0为true
set /p port=请输入端口:
if "%port%"=="" set "port=0"

:loop
if "%port%"=="0" (
  echo %red%错误! 需要输入端口%none%
  set /p port=请输入端口:
  goto :loop
)

:: 获取进程信息
FOR /F "tokens=2" %%i IN ('netstat -aon ^| findstr /R /C:"LISTENING" /C:"%port%"') DO (
  set "pid=%%i"
)

:: 杀死进程
taskkill /F /PID %pid%
echo %green%已杀死端口 %port% 进程%none%
