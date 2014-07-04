package com.psp.util;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.OutputStream;

import org.apache.commons.net.ftp.FTPClient;
import org.apache.commons.net.ftp.FTPFile;
import org.apache.commons.net.ftp.FTPReply;
import org.junit.Test;

public class FtpUpload {
    private String url;
    private int port;
    private String username;
    private String password;

    public FtpUpload() {
        this.url = FinalUtil.FTP_URL;
        this.port = FinalUtil.FTP_PORT;
        this.username = FinalUtil.FTP_USERNAME;
        this.password = FinalUtil.FTP_PASSWORD;
    }

    /**
     * Description: 向FTP服务器上传文件
     * 
     * @param path
     *            FTP服务器保存目录
     * @param filename
     *            上传到FTP服务器上的文件名
     * @param input
     *            输入流
     * @return 成功返回true，否则返回false
     */
    public boolean uploadFile(String path, String filename, File file,
            int fileType) {
        boolean success = false;
        FTPClient ftp = new FTPClient();
        try {
            FileInputStream input = new FileInputStream(file);
            int reply;
            ftp.connect(url, port);// 连接FTP服务器
            // 如果采用默认端口，可以使用ftp.connect(url)的方式直接连接FTP服务器
            ftp.login(username, password);// 登录
            ftp.setFileType(fileType);
            ftp.setBufferSize(102400);// 设置缓存，可以提高传输速度
            reply = ftp.getReplyCode();
            if (!FTPReply.isPositiveCompletion(reply)) {
                ftp.disconnect();
                return success;
            }
            ftp.changeWorkingDirectory(path);
            ftp.storeFile(new String(filename.getBytes("GBK"), "iso-8859-1"),
                    input);

            input.close();
            ftp.logout();
            success = true;
        } catch (IOException e) {
            e.printStackTrace();
        } finally {
            if (ftp.isConnected()) {
                try {
                    ftp.disconnect();
                } catch (IOException ioe) {
                }
            }
        }
        return success;
    }

    /**
     * Description: 从FTP服务器下载文件
     * 
     * @param remotePath
     *            FTP服务器上的相对路径
     * @param fileName
     *            要下载的文件名
     * @param localPath
     *            下载后保存到本地的路径
     * @return
     */
    public boolean downFile(String remotePath, String fileName, String localPath) {
        boolean success = false;
        FTPClient ftp = new FTPClient();
        try {
            int reply;
            ftp.connect(url, port);
            // 如果采用默认端口，可以使用ftp.connect(url)的方式直接连接FTP服务器
            ftp.login(username, password);// 登录
            ftp.setBufferSize(102400);
            reply = ftp.getReplyCode();
            if (!FTPReply.isPositiveCompletion(reply)) {
                ftp.disconnect();
                return success;
            }
            ftp.changeWorkingDirectory(remotePath);// 转移到FTP服务器目录
            FTPFile[] fs = ftp.listFiles();
            for (FTPFile ff : fs) {
                if (ff.getName().equals(fileName)) {
                    File localFile = new File(localPath + "/" + ff.getName());

                    OutputStream is = new FileOutputStream(localFile);
                    ftp.retrieveFile(ff.getName(), is);
                    is.close();
                }
            }

            ftp.logout();
            success = true;
        } catch (IOException e) {
            e.printStackTrace();
        } finally {
            if (ftp.isConnected()) {
                try {
                    ftp.disconnect();
                } catch (IOException ioe) {
                }
            }
        }
        return success;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public int getPort() {
        return port;
    }

    public void setPort(int port) {
        this.port = port;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

}
