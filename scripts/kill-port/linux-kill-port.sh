#!/bin/sh

# 颜色
red='\033[91m'
green='\033[92m'
yellow='\033[93m'
magenta='\033[95m'
cyan='\033[96m'
none='\033[0m' #无颜色

# -t 5 等待5秒 read 获取命令行输入, -n 字符串大于0为true
echo "${green} 请输入端口:${none}"
read -t 5 port
if [ ! -n "${port}" ];then
 port=0
fi

while([[ $port == 0 ]])
do
  echo "${red}错误! 需要输入端口${none}"
  read port
done

# -P：禁用端口和用户名的解析。
# -t：仅显示进程 ID（PID），而不显示其他信息。
# -sTCP:LISTEN：仅显示 TCP 协议下处于监听状态的连接。
pid=$(lsof -i:"${port}" -P -t -sTCP:LISTEN)
echo "${green}端口: ${port} 对应的 pid 为 ${pid}${none}"

kill -9 "$pid"
echo "${green}已杀死端口 ${port} 进程${none}"
