'use strict';
import SockJS from "sockjs-client";

document.addEventListener('DOMContentLoaded', () => {
  var usernamePage = document.querySelector('#username-page');
  var chatPage = document.querySelector('#chat-page');
  var usernameForm = document.querySelector('#usernameForm');
  var messageForm = document.querySelector('#messageForm');
  var messageInput = document.querySelector('#message');
  var messageArea = document.querySelector('#messageArea');
  var connectingElement = document.querySelector('.connecting');

  var username = null;
  var stompClient = null;
  var invalidUser = false;

//import fs from 'fs';
  var colors = [
    '#2196F3', '#32c787', '#00BCD4', '#ff5652',
    '#ffc107', '#ff85af', '#FF9800', '#39bbb0'
  ];

  var counter_connect = 0;

  function connect(event) {
    console.log("INTRU IN CONNECT");

    username = document.querySelector('#name').value.trim();

    counter_connect = counter_connect + 1;
    console.log(counter_connect);

    var socket = new SockJS('/ws');
    stompClient = Stomp.over(socket);

    if (counter_connect > 2) {
      stompClient.disconnect(function () {
        alert("The doctor is busy now! Try again later");
      });
      chatPage.classList.add('hidden');
    } else {
      stompClient.connect({}, onConnected, onError);
      usernamePage.classList.add('hidden');
      chatPage.classList.remove('hidden');
    }

    /*
    if(username) {
        usernamePage.classList.add('hidden');
        chatPage.classList.remove('hidden');
        var socket = new SockJS('/ws');
        stompClient = Stomp.over(socket);
        stompClient.connect({}, onConnected, onError);
    }
     */
    event.preventDefault();
  }


  function onConnected() {
    // Subscribe to the Public Topic
    stompClient.subscribe('/topic/public', onMessageReceived);


    // Tell your username to the server
    stompClient.send("/app/chat.addUser",
      {},
      JSON.stringify({sender: username, type: 'JOIN'})
    )

    connectingElement.classList.add('hidden');
  }


  function onError(error) {
    connectingElement.textContent = 'Could not connect to WebSocket server. Please refresh this page to try again!';
    connectingElement.style.color = 'red';
  }


  function sendMessage(event) {
    var messageContent = messageInput.value.trim();

    if (messageContent && stompClient) {
      var chatMessage = {
        sender: username,
        content: messageInput.value,
        type: 'CHAT'
      };

      stompClient.send("/app/chat.sendMessage", {}, JSON.stringify(chatMessage));
      messageInput.value = '';
    }
    event.preventDefault();
  }


  function onMessageReceived(payload) {
    var message = JSON.parse(payload.body);

    var messageElement = document.createElement('li');

    if (message.type === 'JOIN') {
      messageElement.classList.add('event-message');
      message.content = message.sender + ' joined!';
    } else if (message.type === 'LEAVE') {
      messageElement.classList.add('event-message');
      message.content = message.sender + ' left!';
      // stompClient.send("/app/chat.leftUser",
      //     {},
      //     JSON.stringify({sender: username, type: 'LEAVE'})
      // )
      /*
      let fInput = "left"
      fs.writeFile('tp.txt', fInput, (err) => {
          if (err) throw err;
          else{
              console.log("The file is updated with the given data")
          }
      })
       */


    } else if (message.type === 'INVALID_USER') {
      if (username === message.content) {
        invalidUser = true;
        var str = "";
        str += "<div className=\"alert alert-info\">";
        str += "Invalid username!!!!!!!!!!!";
        str += "<\/div>";
        $(".chat-logs").append(str);
        $("#chat-page").hide();
        $("#username-page").show();
      }
      //usernamePage.classList.remove('hidden');
      //chatPage.classList.add('hidden');
      //window.location.href = "http://localhost:8080/chat?error";

      console.log("INVALIDDDDDDDDDDDD");

    } else if (message.type === 'OCCUPIED') {
      if (username === message.content) {
        var str2 = "";
        str2 += "<div className=\"alert alert-info\">";
        str2 += "The doctor is busy now. Please try again later";
        str2 += "<\/div>";
        $(".chat-logs").append(str2);
        $("#chat-page").hide();
        $("#username-page").show();
      }

    } else {
      if (message.type != 'INVALID_USER' && message.type != 'OCCUPIED') {
        messageElement.classList.add('chat-message');

        var avatarElement = document.createElement('i');
        var avatarText = document.createTextNode(message.sender[0]);
        avatarElement.appendChild(avatarText);
        avatarElement.style['background-color'] = getAvatarColor(message.sender);

        messageElement.appendChild(avatarElement);

        var usernameElement = document.createElement('span');
        var usernameText = document.createTextNode(message.sender);
        usernameElement.appendChild(usernameText);
        messageElement.appendChild(usernameElement);
      }
    }

    if (message.type != 'INVALID_USER' && message.type != 'OCCUPIED') {
      var textElement = document.createElement('p');
      var messageText = document.createTextNode(message.content);
      textElement.appendChild(messageText);

      messageElement.appendChild(textElement);

      messageArea.appendChild(messageElement);
      messageArea.scrollTop = messageArea.scrollHeight;
    }

  }


  function getAvatarColor(messageSender) {
    var hash = 0;
    for (var i = 0; i < messageSender.length; i++) {
      hash = 31 * hash + messageSender.charCodeAt(i);
    }

    var index = Math.abs(hash % colors.length);
    return colors[index];
  }

  var changed = 0;
  window.onbeforeunload = function (e) {
    var e = e || window.event;

    //IE & Firefox
    if (e) {
      if (changed === 0) {
        stompClient.send("/app/chat.leftUser",
          {},
          JSON.stringify({sender: username, type: 'LEAVE'}))
        changed = 1;
        e.returnValue = 'Are you sure?';
      }

    }
  }


  usernameForm.addEventListener('submit', connect, true)
  messageForm.addEventListener('submit', sendMessage, true)
});
