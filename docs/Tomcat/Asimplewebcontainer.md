

# 一个简单的 WEB 容器

容器本身是基于 HTTP 协议完成与客户端的通信。

而要建立 HTTP 链接就需要客户端使用 Socket 套接字。如果是服务端则是使用 ServerSocket

### socket

```java
public Socket (java.lang.String host, int port)
```

![img](https://s2.loli.net/2023/12/06/18bhT4wZGEtDVWA.png)

### ServerSocket

`ServerSocket` 和 `Socket` 不同，服务器套接字的角色是等待来自客户端的连接请求。**一旦服务器套接字获得一个连接请求，它创建一个 Socket 实例来与客户端进行通信**。

要创建一个服务器套接字，你需要使用 ServerSocket 类提供的四个构造方法中的一个。你 需要指定 IP 地址和服务器套接字将要进行监听的端口号。通常，IP 地址将会是 127.0.0.1，也 就是说，服务器套接字将会监听本地机器。服务器套接字正在监听的 IP 地址被称为是绑定地址。 服务器套接字的另一个重要的属性是 backlog，这是服务器套接字开始拒绝传入的请求之前，传 入的连接请求的最大队列长度

```java
public ServerSocket(int port, int backLog, InetAddress bindingAddress);
```

一个简单的 demo，通过 socket获取对应的静态文件

```java
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.net.InetAddress;
import java.net.ServerSocket;
import java.net.Socket;

public class HttpServer {

    public static Boolean isRunning = true;


    public void start(){
        ServerSocket serverSocket = null;
        try {
            serverSocket = new ServerSocket(8080, 1, InetAddress.getByName("127.0.0.1"));
        } catch (IOException e) {
            e.printStackTrace();
        }
        
        while(isRunning){
            Socket socket = null;
            InputStream inputStream = null;
            OutputStream outputStream = null;
            try {
                socket = serverSocket.accept();
                inputStream = socket.getInputStream();
                outputStream = socket.getOutputStream();

                Request request = new Request(inputStream);
                request.parse();

                Response response = new Response(request, outputStream);
                response.sendStaticResourceResponse();
                response.sendStaticResourceResponse();

                System.out.println(request.getUri());
//                socket.close();

            } catch (IOException e) {
                e.printStackTrace();

            }
        }
    }

    public static void main(String[] args) {
        HttpServer httpServer = new HttpServer();
        httpServer.start();
    }

}
```

```java
import java.io.IOException;
import java.io.InputStream;

public class Request {

    private InputStream inputStream;
    private String uri;

    public Request(InputStream inputStream) {
        this.inputStream = inputStream;
    }

    public void parse(){

        StringBuffer request = new StringBuffer(2048);
        int i;
        byte[] bytes = new byte[2048];
        try {
            i = inputStream.read(bytes);
            request.append(new String(bytes,0 ,i));
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
        System.out.println(request.toString());

        uri = ParseUri(request.toString());

    }

    private String ParseUri(String request) {
        int index1, index2;
        index1 = request.indexOf(" ");
        if(index1 != -1){
            index2 = request.indexOf(" ", index1 + 1);
            if (index2 > index1) {
                return request.substring(index1 + 1, index2);
            }
        }
        return null;
    }

    public String getUri() {
        return uri;
    }
}
```

​		request 这个类需要注意socket 读取的时候， 

```java

i = inputStream.read(bytes);
        request.append(new String(bytes,0 ,i));
```

​		这里不能用 while ，用 while 会导致 read 阻塞。

```java
import java.io.*;
import java.net.URL;
import java.util.Objects;

public class Response {

    Request request;

    public void setOutputStream(OutputStream outputStream) {
        this.outputStream = outputStream;
    }

    private OutputStream outputStream;

    public Response( Request request, OutputStream outputStream) {
        this.request = request;
        this.outputStream = outputStream;
    }

    public void sendStaticResourceResponse() {

        byte[] bytes = new byte[1024];
        FileInputStream fileInputStream = null;
        try {
            String uri = System.getProperty("user.dir") + File.separator + "webroot" + File.separator + request.getUri();
            File file = new File(uri);
            if(file.exists()){
                if(file.isFile()){
                    outputStream.write("HTTP/1.1 200 OK\r\n".getBytes());
                    outputStream.write(("Content-Type: " + "text/html" + "\r\n").getBytes());
                    outputStream.write(("Content-Length: " + file.length() + "\r\n").getBytes());
                    outputStream.write("\r\n".getBytes());
                    fileInputStream = new FileInputStream(file);
                    int length = fileInputStream.read(bytes);
                    while (length!= -1){
                        outputStream.write(bytes, 0, length);
                        length = fileInputStream.read(bytes);
                    }
                }
            }
            else {
                 String errorMessage = "HTTP/1.1 404 File Not Found\r\n" +
                        "Content-Type: text/html\r\n" +
                        "Content-Length: 23\r\n" +
                        "\r\n" +
                        "<h1>File Not Found</h1>";
                outputStream.write(errorMessage.getBytes());
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
        finally {
            if(fileInputStream!= null){
                try {
                    fileInputStream.close();
                } catch (IOException e) {
                    throw new RuntimeException(e);
                }
            }
        }
    }

}
```

如果要增加处理类，可以通过反射等方式获取对应的 service 执行。

