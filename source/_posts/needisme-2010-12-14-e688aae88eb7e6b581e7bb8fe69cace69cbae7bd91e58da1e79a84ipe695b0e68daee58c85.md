---
title: "截获流经本机网卡的IP数据包"
date: 2010-12-14 11:21:00
categories: NeedIsMe
tags: ["Network Security", "网络安全"]
---

<p>从事网络安全的技术人员和相当一部分准黑客（指那些使用现成的黑客软件进行攻击而不是根据需要去自己编写代码的人）都一定不会对网络嗅探器（sniffer）感到陌生，网络嗅探器无论是在网络安全还是在黑客攻击方面均扮演了很重要的角色。通过使用网络嗅探器可以把网卡设置于混杂模式，并可实现对网络上传输的数据包的捕获与分析。此分析结果可供网络安全分析之用，但如为黑客所利用也可以为其发动进一步的攻击提供有价值的信息。可见，嗅探器实际是一把双刃剑。 虽然网络嗅探器技术被黑客利用后会对网络安全构成一定的威胁，但嗅探器本身的危害并不是很大，主要是用来为其他黑客软件提供网络情报，真正的攻击主要是由其他黑软来完成的。而在网络安全方面，网络嗅探手段可以有效地探测在网络上传输的数据包信息，通过对这些信息的分析利用是有助于网络安全维护的。权衡利弊，有必要对网络嗅探器的实现原理进行介绍。<br />嗅探器设计原理</p>
<p>嗅探器作为一种网络通讯程序，也是通过对网卡的编程来实现网络通讯的，对网卡的编程也是使用通常的套接字（socket）方式来进行。但是，通常的套接字程序只能响应与自己硬件地址相匹配的或是以广播形式发出的数据帧，对于其他形式的数据帧比如已到达网络接口但却不是发给此地址的数据帧，网络接口在验证投递地址并非自身地址之后把不引起响应，也就是说应用程序无法收取到达的数据包。而网络嗅探器的目的恰恰在于从网卡接收所有经过它的数据包，这些数据包即可以是发给它的也可以是发往别处的。显然，要达到此目的就不能再让网卡按通常的正常模式工作，而必须把其设置为混杂模式。</p>
<p>具体到编程实现上，这种对网卡混杂模式的设置是通过原始套接字（raw socket）来实现的，这也有别于通常经常使用的数据流套接字和数据报套接字。在创建了原始套接字后，需要通过setsockopt()函数来设置IP头操作选项，然后再通过bind()函数把原始套接字绑定到本地网卡。为了让原始套接字能接受所有的数据，还需要通过ioctlsocket()来进行设置，而且还可以指定是否亲自处理IP头。至此，实际就可以开始对网络数据包进行嗅探了，对数据包的获取仍象流式套接字或数据报套接字那样通过recv()函数来完成。但是与其他两种套接字不同的是，原始套接字此时捕获到的数据包并不仅仅是单纯的数据信息，而是包含有 IP头、 TCP头等信息头的最原始的数据信息，这些信息保留了它在网络传输时的原貌。通过对这些在低层传输的原始信息的分析可以得到有关网络的一些信息。由于这些数据经过了网络层和传输层的打包，因此需要根据其附加的帧头对数据包进行分析。下面先给出结构.数据包的总体结构：</p>
<p>数据包</p>
<p>IP头 TCP头（或其他信息头） 数据 </p>
<p>数据在从应用层到达传输层时，把添加TCP数据段头，或是UDP数据段头。其中UDP数据段头比较简单，由一个8字节的头和数据部分组成，具体格式如下：</p>
<p>16位 16位</p>
<p>源端口 目的端口</p>
<p>UDP长度 UDP校验和 </p>
<p>而TCP数据头则比较复杂，以20个固定字节开始，在固定头后面还可以有一些长度不固定的可选项，下面给出TCP数据段头的格式组成：</p>
<p>16位 16位</p>
<p>源端口 目的端口</p>
<p>顺序号</p>
<p>确认号</p>
<p>TCP头长 （保留）7位 URG ACK PSH RST SYN FIN 窗口大小</p>
<p>校验和 紧急指针</p>
<p>可选项（0或更多的32位字）</p>
<p>数据（可选项） </p>
<p>对于此TCP数据段头的分析在编程实现中可通过数据结构_TCP来定义：</p>
<p>typedef struct _TCP{ WORD SrcPort; // 源端口</p>
<p>WORD DstPort; // 目的端口</p>
<p>DWORD SeqNum; // 顺序号</p>
<p>DWORD AckNum; // 确认号</p>
<p>BYTE DataOff; // TCP头长</p>
<p>BYTE Flags; // 标志（URG、ACK等）</p>
<p>WORD Window; // 窗口大小</p>
<p>WORD Chksum; // 校验和</p>
<p>WORD UrgPtr; // 紧急指针</p>
<p>} TCP;</p>
<p>typedef TCP *LPTCP;</p>
<p>typedef TCP UNALIGNED * ULPTCP; </p>
<p>在网络层，还要给TCP数据包添加一个IP数据段头以组成IP数据报。IP数据头以大端点机次序传送，从左到右，版本字段的高位字节先传输（SPARC是大端点机；Pentium是小端点机）。如果是小端点机，就要在发送和接收时先行转换然后才能进行传输。IP数据段头格式如下：</p>
<p>16位 16位</p>
<p>版本 IHL 服务类型 总长</p>
<p>标识 标志 分段偏移</p>
<p>生命期 协议 头校验和</p>
<p>源地址</p>
<p>目的地址</p>
<p>选项（0或更多） </p>
<p>同样，在实际编程中也需要通过一个数据结构来表示此IP数据段头，下面给出此数据结构的定义：</p>
<p>typedef struct _IP{</p>
<p>union{ BYTE Version; // 版本</p>
<p>BYTE HdrLen; // IHL</p>
<p>};</p>
<p>BYTE ServiceType; // 服务类型</p>
<p>WORD TotalLen; // 总长</p>
<p>WORD ID; // 标识</p>
<p>union{ WORD Flags; // 标志</p>
<p>WORD FragOff; // 分段偏移</p>
<p>};</p>
<p>BYTE TimeToLive; // 生命期</p>
<p>BYTE Protocol; // 协议</p>
<p>WORD HdrChksum; // 头校验和</p>
<p>DWORD SrcAddr; // 源地址</p>
<p>DWORD DstAddr; // 目的地址</p>
<p>BYTE Options; // 选项</p>
<p>} IP;</p>
<p>typedef IP * LPIP;</p>
<p>typedef IP UNALIGNED * ULPIP;</p>
<p>在明确了以上几个数据段头的组成结构后，就可以对捕获到的数据包进行分析了。</p>
<p>嗅探器的具体实现</p>
<p>根据前面的设计思路，不难写出网络嗅探器的实现代码，下面就给出一个简单的示例，该示例可以捕获到所有经过本地网卡的数据包，并可从中分析出协议、IP源地址、IP目标地址、TCP源端口号、TCP目标端口号以及数据包长度等信息。由于前面已经把程序的设计流程讲述的比较清楚了，因此这里就不在赘述了，下面就结合注释对程序的具体是实现进行讲解，同时为程序流程的清晰起见，去掉了错误检查等保护性代码。主要代码实现清单为：</p>
<p>// 检查 Winsock 版本号，WSAData为WSADATA结构对象</p>
<p>WSAStartup(MAKEWORD(2, 2), &amp;WSAData);</p>
<p>// 创建原始套接字</p>
<p>sock = socket(AF_INET, SOCK_RAW, IPPROTO_RAW));</p>
<p>// 设置IP头操作选项，其中flag 设置为ture，亲自对IP头进行处理</p>
<p>setsockopt(sock, IPPROTO_IP, IP_HDRINCL, (char*)&amp;flag, sizeof(flag));</p>
<p>// 获取本机名</p>
<p>gethostname((char*)LocalName, sizeof(LocalName)-1);</p>
<p>// 获取本地 IP 地址</p>
<p>pHost = gethostbyname((char*)LocalName));</p>
<p>// 填充SOCKADDR_IN结构</p>
<p>addr_in.sin_addr = *(in_addr *)pHost->h_addr_list[0]; //IP</p>
<p>addr_in.sin_family = AF_INET;</p>
<p>addr_in.sin_port = htons(57274);</p>
<p>// 把原始套接字sock 绑定到本地网卡地址上</p>
<p>bind(sock, (PSOCKADDR)&amp;addr_in, sizeof(addr_in));</p>
<p>// dwValue为输入输出参数，为1时执行，0时取消</p>
<p>DWORD dwValue = 1;</p>
<p>// 设置 SOCK_RAW 为SIO_RCVALL，以</p>

---

[📚 返回目录](/needisme-mu-lu/)
