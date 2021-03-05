(window.webpackJsonp=window.webpackJsonp||[]).push([[19],{184:function(e,s,n){"use strict";n.r(s);var a=n(0),t=Object(a.a)({},(function(){var e=this.$createElement;this._self._c;return this._m(0)}),[function(){var e=this,s=e.$createElement,n=e._self._c||s;return n("div",{staticClass:"content"},[n("h1",{attrs:{id:"安装-jenkins"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#安装-jenkins"}},[e._v("#")]),e._v(" 安装 Jenkins")]),e._v(" "),n("p",[e._v("Jenkins 是一个基于 Java 语言开发的 CI 持续构建工具，主要用于持续、自动的构建/测试软件项目。\n它可以执行你预先设定好的设置和脚本，也可以和 Git 工具做集成，实现自动触发和定时触发器构建。")]),e._v(" "),n("h2",{attrs:{id:"安装-docker"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#安装-docker"}},[e._v("#")]),e._v(" 安装 Docker")]),e._v(" "),n("p",[e._v("在这里，我们使用 Docker 安装 Jenkins 服务，在安装前，需要先安装 Docker 环境 :\n此处为语雀文档，点击链接查看：https://www.yuque.com/janlay/tmq7vg/cg16wh")]),e._v(" "),n("h2",{attrs:{id:"安装防火墙"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#安装防火墙"}},[e._v("#")]),e._v(" 安装防火墙")]),e._v(" "),n("div",{staticClass:"language-sh line-numbers-mode"},[n("pre",{pre:!0,attrs:{class:"language-text"}},[n("code",[e._v('yum install firewalld systemd -y\nservice firewalld start\nfirewall-cmd --permanent --add-service=http\nfirewall-cmd --permanent --add-rich-rule="rule family="ipv4" source address="172.16.0.0/16" accept"\nsystemctl reload firewalld\n')])]),e._v(" "),n("div",{staticClass:"line-numbers-wrapper"},[n("span",{staticClass:"line-number"},[e._v("1")]),n("br"),n("span",{staticClass:"line-number"},[e._v("2")]),n("br"),n("span",{staticClass:"line-number"},[e._v("3")]),n("br"),n("span",{staticClass:"line-number"},[e._v("4")]),n("br"),n("span",{staticClass:"line-number"},[e._v("5")]),n("br")])]),n("p",[e._v("pemmanent: 表示永久生效，若不加 --permanent 系统下次启动后就会失效。")]),e._v(" "),n("p",[e._v("systemctl：https://www.cnblogs.com/zwcry/p/9602756.html")]),e._v(" "),n("p",[e._v("firewall-cmd：https://blog.csdn.net/s_p_j/article/details/80979450")]),e._v(" "),n("p",[e._v("add-rich-rule：添加一条放行规则。作用是允许 docker 容器之间可以走宿主机互相访问。")]),e._v(" "),n("p",[e._v("其中，172.16.0.0 是网段，/16 代表匹配所有网段内的 IP：https://blog.csdn.net/aerchi/article/details/39396423?utm_medium=distribute.pc_relevant.none-task-blog-BlogCommendFromMachineLearnPai2-1.nonecase&depth_1-utm_source=distribute.pc_relevant.none-task-blog-BlogCommendFromMachineLearnPai2-1.nonecase")]),e._v(" "),n("h2",{attrs:{id:"_1-使用-dockerfile-构建-jenkins-镜像"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#_1-使用-dockerfile-构建-jenkins-镜像"}},[e._v("#")]),e._v(" 1. 使用 DockerFile 构建 Jenkins 镜像")]),e._v(" "),n("p",[e._v("我们都知道，每个 Docker 容器，都是一个独立的，与外界隔离的操作系统环境。在使用 Jenkins 服务进行构建时，用户写的 Shell 脚本，也只会在容器内执行。\n但我们问题来了，我们想让容器部署的 Jenkins 可以构建 Docker 镜像，只有 2 种办法：")]),e._v(" "),n("ul",[n("li",[n("ol",[n("li",[e._v("加一台 Jenkins master 节点，构建机内安装 Docker 环境。这样我们就可以执行远程构建。")])])]),e._v(" "),n("li",[n("ol",{attrs:{start:"2"}},[n("li",[e._v("宿主机的 Docker 环境，移花接木到容器内部，在容器内部执行 Docker 命令构建镜像。\n这就是我们要讲的重磅知识点：Docker in Docker")])])])]),e._v(" "),n("h3",{attrs:{id:"docker-in-docker"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#docker-in-docker"}},[e._v("#")]),e._v(" Docker in Docker")]),e._v(" "),n("h4",{attrs:{id:"原理"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#原理"}},[e._v("#")]),e._v(" 原理")]),e._v(" "),n("p",[e._v("那什么是 Docker in Docker 呢？\nDocker 采用的是 C/S（即 Client/Server）架构。我们在执行 docker xxx 等命令时，其实是使用 Client 在和 docker engine 在进行通信。\n我们在安装 Docker CE 时，会生成一个 systemd service 服务。这个服务启动时，就是 Docker Engine 服务。默认情况下，Docker 守护进程会生成一个 socket（/var/run/docker.sock）文件来进行本地进程通信，因此只能在本地使用 docker 客户端或者使用 Docker API 进行操作。\n*.sock 文件：sock 文件是 UNIX 域套接字，它可以通过文件系统（而非网络地址）进行寻址和访问。\n因此，只要把宿主机的 Docker 套接字通过 Docker 数据卷挂载到容器内部，就能实现在容器内使用 Docker 命令（如下图）。")]),e._v(" "),n("h4",{attrs:{id:"使用"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#使用"}},[e._v("#")]),e._v(" 使用")]),e._v(" "),n("p",[e._v("下方的命令，就是 Docker in Docker 的使用。")]),e._v(" "),n("div",{staticClass:"language-sh line-numbers-mode"},[n("pre",{pre:!0,attrs:{class:"language-text"}},[n("code",[e._v("docker run ... -v /var/run/docker.sock:/var/run/docker.sock\n")])]),e._v(" "),n("div",{staticClass:"line-numbers-wrapper"},[n("span",{staticClass:"line-number"},[e._v("1")]),n("br")])]),n("p",[e._v("所以，我们要实现在 Jenkins 内部访问宿主机 docker，要写一个 DockerFile 进行二次镜像构建。\n此 DockerFile 的作用，就是为了安装容器使用宿主机 Docker 缺少的依赖。这里我们在容器内安装 libltdl7 。\n如果不写 DockerFile 进行构建也可以，亲测直接挂 Docker 套接字进容器后会有依赖缺失问题，，，，这个方法只针对 Jenkins 镜像")]),e._v(" "),n("div",{staticClass:"language-sh line-numbers-mode"},[n("pre",{pre:!0,attrs:{class:"language-text"}},[n("code",[e._v("vi Dockerfile\n")])]),e._v(" "),n("div",{staticClass:"line-numbers-wrapper"},[n("span",{staticClass:"line-number"},[e._v("1")]),n("br")])]),n("div",{staticClass:"language-sh line-numbers-mode"},[n("pre",{pre:!0,attrs:{class:"language-text"}},[n("code",[e._v('FROM jenkins/jenkins\nUSER root\n# 清除了基础镜像设置的源，切换成阿里云源\nRUN echo \'\' > /etc/apt/sources.list.d/jessie-backports.list \\\n  && echo "deb http://mirrors.aliyun.com/debian jessie main contrib non-free" > /etc/apt/sources.list \\\n  && echo "deb http://mirrors.aliyun.com/debian jessie-updates main contrib non-free" >> /etc/apt/sources.list \\\n  && echo "deb http://mirrors.aliyun.com/debian-security jessie/updates main contrib non-free" >> /etc/apt/sources.list\n# 更新源并安装缺少的包\nRUN apt-get update && apt-get install -y libltdl7\nARG dockerGid=999\nRUN echo "docker:x:${dockerGid}:jenkins" >> /etc/group\n')])]),e._v(" "),n("div",{staticClass:"line-numbers-wrapper"},[n("span",{staticClass:"line-number"},[e._v("1")]),n("br"),n("span",{staticClass:"line-number"},[e._v("2")]),n("br"),n("span",{staticClass:"line-number"},[e._v("3")]),n("br"),n("span",{staticClass:"line-number"},[e._v("4")]),n("br"),n("span",{staticClass:"line-number"},[e._v("5")]),n("br"),n("span",{staticClass:"line-number"},[e._v("6")]),n("br"),n("span",{staticClass:"line-number"},[e._v("7")]),n("br"),n("span",{staticClass:"line-number"},[e._v("8")]),n("br"),n("span",{staticClass:"line-number"},[e._v("9")]),n("br"),n("span",{staticClass:"line-number"},[e._v("10")]),n("br"),n("span",{staticClass:"line-number"},[e._v("11")]),n("br")])]),n("h2",{attrs:{id:"_2-构建-jenkins-镜像"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#_2-构建-jenkins-镜像"}},[e._v("#")]),e._v(" 2. 构建 Jenkins 镜像")]),e._v(" "),n("p",[e._v("这样的话，我们就不能直接使用官方的 Jenkins 镜像进行构建，需要用 DockerFile 先构建一份自己的 Jenkins 镜像。使用 docker build 命令构建镜像")]),e._v(" "),n("div",{staticClass:"language-sh line-numbers-mode"},[n("pre",{pre:!0,attrs:{class:"language-text"}},[n("code",[e._v("docker build -t local/jenkins .\n")])]),e._v(" "),n("div",{staticClass:"line-numbers-wrapper"},[n("span",{staticClass:"line-number"},[e._v("1")]),n("br")])]),n("p",[e._v("-t：镜像的名字及 tag，通常 name:tag 或者 name 格式；可以在一次构建中为一个镜像设置多个 tag\n如果提示 Successfully tagged local/jenkins:latest 则构建成功")]),e._v(" "),n("h2",{attrs:{id:"_3-启动镜像"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#_3-启动镜像"}},[e._v("#")]),e._v(" 3. 启动镜像")]),e._v(" "),n("p",[e._v("我们将 Jenkins 用户目录外挂到宿主机内，先新建一个 /home/jenkins 目录，并设置权限：")]),e._v(" "),n("div",{staticClass:"language-sh line-numbers-mode"},[n("pre",{pre:!0,attrs:{class:"language-text"}},[n("code",[e._v("mkdir /home/jenkins\nchown -R 1000 /home/jenkins/\n")])]),e._v(" "),n("div",{staticClass:"line-numbers-wrapper"},[n("span",{staticClass:"line-number"},[e._v("1")]),n("br"),n("span",{staticClass:"line-number"},[e._v("2")]),n("br")])]),n("p",[e._v("接下来我们用镜像创建容器并启动：")]),e._v(" "),n("div",{staticClass:"language-sh line-numbers-mode"},[n("pre",{pre:!0,attrs:{class:"language-text"}},[n("code",[e._v("docker run -itd --name jenkins -p 8080:8080 -p 50000:50000 \\\n-v /var/run/docker.sock:/var/run/docker.sock \\\n-v /usr/bin/docker:/usr/bin/docker \\\n-v /home/jenkins:/var/jenkins_home \\\n--restart always \\\n--user root local/jenkins\n")])]),e._v(" "),n("div",{staticClass:"line-numbers-wrapper"},[n("span",{staticClass:"line-number"},[e._v("1")]),n("br"),n("span",{staticClass:"line-number"},[e._v("2")]),n("br"),n("span",{staticClass:"line-number"},[e._v("3")]),n("br"),n("span",{staticClass:"line-number"},[e._v("4")]),n("br"),n("span",{staticClass:"line-number"},[e._v("5")]),n("br"),n("span",{staticClass:"line-number"},[e._v("6")]),n("br")])]),n("p",[e._v("-itd: 由 -i -t -d 命令组合而成\n-i: 开启容器内的交互模式，允许用户可以进入容器进行输入交互\n-t: 分配一个虚拟终端\n-d: 允许容器以后台运行（不加的话只能前台运行，退出终端容器就停止了）\n--name: 容器名称\n-p: 将容器内的端口映射到宿主机的端口。格式为：宿主机端口:容器端口\n-v: 将宿主机内的文件挂载到容器目录下。格式为：宿主机目录:容器目录\n--user: 指定用户启动\n--restart: 当 Docker 重启时，容器自动启动，否则就需要使用 docker restart 手动启动\n启动后，会返回一串 ID 值，这就是 容器 ID 值。\n执行 docker ps 命令，查看 Jenkins 容器是否在列表内。如果在列表内，说明启动成功\n提示：如果执行 docker ps 后容器没有在列表内，多半是启动失败。可以加-a 参数查看所有已经生成的容器的运行状态。\n如果想进一步查看原因，可以使用 docker logs -f <容器 ID> 查看容器内日志输出。")]),e._v(" "),n("h2",{attrs:{id:"_4-启动-jenkins"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#_4-启动-jenkins"}},[e._v("#")]),e._v(" 4. 启动 Jenkins")]),e._v(" "),n("p",[e._v("首先我们在防火墙添加 8080 和 50000 端口的放行，并重载防火墙")]),e._v(" "),n("div",{staticClass:"language-sh line-numbers-mode"},[n("pre",{pre:!0,attrs:{class:"language-text"}},[n("code",[e._v("firewall-cmd --zone=public --add-port=8080/tcp --permanent\nfirewall-cmd --zone=public --add-port=50000/tcp --permanent\nsystemctl reload firewalld\n")])]),e._v(" "),n("div",{staticClass:"line-numbers-wrapper"},[n("span",{staticClass:"line-number"},[e._v("1")]),n("br"),n("span",{staticClass:"line-number"},[e._v("2")]),n("br"),n("span",{staticClass:"line-number"},[e._v("3")]),n("br")])]),n("p",[e._v("容器启动后，访问 宿主机 IP:8080 。如果看到以下界面，代表正在启动。\nJenkins 第一次的启动时间一般比较长（视机器性能而看）")]),e._v(" "),n("h2",{attrs:{id:"_5-初始化-jenkins-配置"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#_5-初始化-jenkins-配置"}},[e._v("#")]),e._v(" 5. 初始化 Jenkins 配置")]),e._v(" "),n("h3",{attrs:{id:"解锁-jenkins"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#解锁-jenkins"}},[e._v("#")]),e._v(" 解锁 Jenkins")]),e._v(" "),n("p",[e._v("Jenkins 启动完成后，会跳转至这个界面解锁 Jenkins。\nJenkins 启动后，会生成一个 初始密码 ，该密码在 Jenkins 容器内存放，可以进入容器后查看密码内容。")]),e._v(" "),n("div",{staticClass:"language-sh line-numbers-mode"},[n("pre",{pre:!0,attrs:{class:"language-text"}},[n("code",[e._v("docker exec -it jenkins /bin/bash\ncat /var/jenkins_home/secrets/initialAdminPassword\nexit;\n")])]),e._v(" "),n("div",{staticClass:"line-numbers-wrapper"},[n("span",{staticClass:"line-number"},[e._v("1")]),n("br"),n("span",{staticClass:"line-number"},[e._v("2")]),n("br"),n("span",{staticClass:"line-number"},[e._v("3")]),n("br")])]),n("p",[e._v("docker exec: 进入一个已启动的容器内，执行命令\ncat：查看文件内容。如果逐步查看可以用 more 命令\n-it: -i -t 的组合\n-i: 即使没有附加也保持 STDIN 打开\n-t: 分配一个伪终端\n输入配置文件中的密码，解锁 Jenkins")]),e._v(" "),n("h3",{attrs:{id:"下载插件"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#下载插件"}},[e._v("#")]),e._v(" 下载插件")]),e._v(" "),n("p",[e._v("解锁后，来到了插件下载页面。先进入容器配置一下清华大学的 Jenkins 插件源后，再安装插件。所以先不要点。\n进入容器，查找 default.json 文件，把镜像源替换进去，替换后退出容器终端")]),e._v(" "),n("div",{staticClass:"language-sh line-numbers-mode"},[n("pre",{pre:!0,attrs:{class:"language-text"}},[n("code",[e._v("docker exec -it jenkins /bin/bash\nfind / -name 'default.json'\nsed -i 's/http:\\/\\/updates.jenkins-ci.org\\/download/https:\\/\\/mirrors.tuna.tsinghua.edu.cn\\/jenkins/g' /var/jenkins_home/updates/default.json && sed -i 's/http:\\/\\/www.google.com/https:\\/\\/www.baidu.com/g' /var/jenkins_home/updates/default.json\nexit;\n")])]),e._v(" "),n("div",{staticClass:"line-numbers-wrapper"},[n("span",{staticClass:"line-number"},[e._v("1")]),n("br"),n("span",{staticClass:"line-number"},[e._v("2")]),n("br"),n("span",{staticClass:"line-number"},[e._v("3")]),n("br"),n("span",{staticClass:"line-number"},[e._v("4")]),n("br")])]),n("p",[e._v("然后重启容器，重新访问界面，解锁后安装推荐插件")]),e._v(" "),n("div",{staticClass:"language-sh line-numbers-mode"},[n("pre",{pre:!0,attrs:{class:"language-text"}},[n("code",[e._v("docker restart jenkins\n")])]),e._v(" "),n("div",{staticClass:"line-numbers-wrapper"},[n("span",{staticClass:"line-number"},[e._v("1")]),n("br")])]),n("h2",{attrs:{id:"_6-完成安装"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#_6-完成安装"}},[e._v("#")]),e._v(" 6. 完成安装")]),e._v(" "),n("p",[e._v("接下来一路按照提示配置，直到看到以下界面代表安装成功：")]),e._v(" "),n("h2",{attrs:{id:"_7-测试安装"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#_7-测试安装"}},[e._v("#")]),e._v(" 7. 测试安装")]),e._v(" "),n("p",[e._v("我们点击 Jenkins 首页 -> 左侧导航 -> 新建任务 -> 构建一个自由风格的软件项目\n找到 构建 一项，选择 “增加构建步骤”，选择 执行 Shell ，输入以下命令：\n此命令是去拉取一个 nodejs 稳定版镜像")]),e._v(" "),n("div",{staticClass:"language-sh line-numbers-mode"},[n("pre",{pre:!0,attrs:{class:"language-text"}},[n("code",[e._v("docker -v\ndocker pull node:latest\n")])]),e._v(" "),n("div",{staticClass:"line-numbers-wrapper"},[n("span",{staticClass:"line-number"},[e._v("1")]),n("br"),n("span",{staticClass:"line-number"},[e._v("2")]),n("br")])]),n("p",[e._v("保存后，我们点击左侧菜单的 “立即构建”，Jenkins 就会开始构建。选择左侧历史记录第一项（最新的一项），点击控制台输出，查看构建日志。\nJenkins 构建任务为蓝色灯，代表构建成功。红色灯代表构建失败")])])}],!1,null,null,null);s.default=t.exports}}]);