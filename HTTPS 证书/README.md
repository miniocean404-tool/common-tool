文章：https://blog.dteam.top/posts/2019-04/%E6%9C%AC%E5%9C%B0https%E5%BF%AB%E9%80%9F%E8%A7%A3%E5%86%B3%E6%96%B9%E6%A1%88mkcert.html
GitHub 地址：https://github.com/FiloSottile/mkcert/releases/latest

1. 生成 pem、p12 文件
   mkcert -cert-file mkcert.pem, -key-file mkcert-key.pem, localhost 127.0.0.1 ::1 192.168.31.219
   mkcert -pkcs12 -p12-file mkcert.p12 localhost 127.0.0.1 ::1 192.168.31.219
2. 将 CA 证书加入本地可信 CA
   mkcert --install
