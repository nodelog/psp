package com.psp.util.jms;

import java.util.*;
import javax.naming.*;
import javax.jms.*;
import javax.jms.Queue;
public class MessageReciever
    implements MessageListener {
  public void onMessage(Message message) {
    if (message instanceof TextMessage) {
      TextMessage textMessage = (TextMessage) message;
      try {
        System.out.println("Message content is:" + textMessage.getText());
      }
      catch (JMSException e) {
        e.printStackTrace();
      }
    }
  }
  public static void main(String[] args) {
   
    MessageReciever msgRcvr=new MessageReciever();
    String queueConnectionFactoryName = "myjmsconnectionfactory";
    String queueName = "myjmsqueue";
    boolean transacted = false;
    int acknowledgementMode = Session.AUTO_ACKNOWLEDGE;
    Properties properties = new Properties();
    properties.put(Context.INITIAL_CONTEXT_FACTORY,
                   "weblogic.jndi.WLInitialContextFactory");
    properties.put(Context.PROVIDER_URL, "t3://localhost:7001");
    try {
      Context context = new InitialContext(properties);
      Object obj = context.lookup(queueConnectionFactoryName);
      QueueConnectionFactory queueConnectionFactory = (QueueConnectionFactory)
          obj;
      obj = context.lookup(queueName);
      Queue queue = (Queue) obj;
      QueueConnection queueConnection = queueConnectionFactory.
          createQueueConnection();
      queueConnection.start();
      QueueSession queueSession = queueConnection.createQueueSession(transacted,
          acknowledgementMode);
      QueueReceiver queueReceiver = queueSession.createReceiver(queue);
      queueReceiver.setMessageListener(msgRcvr);
      synchronized(msgRcvr){
        msgRcvr.wait(100000);
      }
      if (queueReceiver != null) {
        queueReceiver.close();
      }
      if (queueSession != null) {
        queueSession.close();
      }
      if (queueConnection != null) {
        queueConnection.close();
      }
    }
    catch (Exception ex) {
      ex.printStackTrace();
    }
  }
}