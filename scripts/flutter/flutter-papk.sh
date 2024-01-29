#!/bin/sh

# 颜色
red='\e[91m'
green='\e[92m'
yellow='\e[93m'
magenta='\e[95m'
cyan='\e[96m'
none='\e[0m' # 无颜色

#---------------------请修改渠道数组----------------#
channels=(YYB HUAWEI MI OPPO VIVO)

#当前工程绝对路径
project_path=$(pwd)

#安卓包product文件夹路径
prod_path=${project_path}/prod/apk/
#Flutter打包生成的最初地址
release_path=${project_path}/build/app/outputs/apk/release/



env_tip="执行flutter 环境(默认:dev) [ dev/prod ]"
echo $env_tip

# -t 5 等待5秒 read 获取命令行输入, -n 字符串大于0为true
read -t 5 is_env
if [ ! -n "${is_env}" ];then
 is_env='dev'
fi

while([[ $is_env != "dev" ]] && [[ $is_env != "prod" ]])
do
  echo "错误!只能输入[ dev/prod ] ！！！"
  echo $env_tip
  read is_env
done



clean_tips="执行flutter clean(默认:n) [ y/n ]"
echo $clean_tips

read  -t 5 is_clean
if [  ! -n "${is_clean}" ];then
	is_clean="n"
fi

while([[ $is_clean != "y" ]] && [[ $is_clean != "n" ]])
do
  echo "错误!只能输入[ y/n ] ！！！"
  echo $clean_tips
  read is_clean
done



tips="请输入选择渠道(默认：0) [ ALL: 0 "
# ${#数组[@]} 显示数组参数长度,没有# 显示数组参数
c_length=${#channels[@]};

for(( i=0; i<$c_length; i++)) do
  if (($i < $c_length-1 )); then
    tips="${tips}${channels[i]}: $((i+1)) "
  else
    tips="${tips}${channels[i]}: $((i+1)) ]"
  fi
done;



echo $tips
read  -t 5 number

if [  ! -n "${number}" ];then
	number=0
fi
while(( $number < "0" || $number > $c_length ))
do
  echo "错误!只能输入0到${c_length} ！！！"
  echo $tips
  read number
done



#如果有product/apk文件夹则删除，然后再创建一个空文件夹
if [ -d ${prod_path} ]; then
  rm -rf ${prod_path}
  rm -rf ${release_path}
fi

#创建目录
mkdir -p ${prod_path}

if [ ${is_clean} = "y" ];then
  echo "=============== 开始清理 ==============="
	flutter clean
fi



if (($number == 0 )); then
  echo "=============== 开始构建：全部渠道包 ==============="
  for(( i=0;i<${c_length};i++)) do
    echo "正在构建：${channels[$i]} 渠道包"
    flutter build apk --obfuscate --split-debug-info=debug_info --no-shrink --dart-define ENV=${is_env} --dart-define CHANNEL=${channels[$i]}
    cp -R ${release_path}*.apk ${prod_path}
  done;
else
  echo "=============== 正在构建：${channels[$((number-1))]} 渠道包 ==============="
  flutter build apk --obfuscate --split-debug-info=debug_info --no-shrink --dart-define ENV=${is_env} --dart-define CHANNEL=${channels[$((number-1))]}
  cp -R ${release_path}*.apk ${prod_path}
fi



#判断apk目录下是否有文件
if [ "$(ls -A $prod_path)" ]; then
  echo "=============== APK包已导出: $prod_path ==============="
  open $prod_path
else
  echo '=============== APK包导出失败 ==============='
  exit 1
fi

exit 0
