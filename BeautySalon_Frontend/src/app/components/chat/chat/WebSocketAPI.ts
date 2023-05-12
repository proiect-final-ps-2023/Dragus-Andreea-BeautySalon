import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';
import {ChatComponent} from "./chat.component";
import {HttpHeaders} from "@angular/common/http";
import jwt_decode from "jwt-decode";
import {DataSharingService} from "../../../services/dataSharing/data-sharing.service";

export class WebSocketAPI {
  webSocketEndPoint: string = 'http://localhost:8080/ws';
  topic: string = "/topic/greetings";
  stompClient: any;
  appComponent: ChatComponent;

  name: string ="";
  userType: string = "";

  init_webSocket_connection_msg: string ="";

  announcements: string[] = [];
  cnt: number = 0;

  constructor(appComponent: ChatComponent, private dataSharingService: DataSharingService){
    this.appComponent = appComponent;
  }

  _connect() {
    console.log("Initialize WebSocket Connection");
    var savedToken: any;
    savedToken = localStorage.getItem('tokenLogin')
    var tokenPayload: any;
    tokenPayload = jwt_decode(savedToken);
    this.name = tokenPayload.name;
    this.userType = tokenPayload.userType;

    this. init_webSocket_connection_msg = "Initialize announcement forum connection for" + this.name;


    let ws = new SockJS(this.webSocketEndPoint);
    this.stompClient = Stomp.over(ws);
    const _this = this;
    _this.stompClient.connect({}, function () {
      _this.stompClient.subscribe(_this.topic, function (sdkEvent: any) {
        _this.onMessageReceived(sdkEvent);
      });
      //_this.stompClient.reconnect_delay = 2000;
    }, this.errorCallBack);
  };

  _disconnect() {
    if (this.stompClient !== null) {
      this.stompClient.disconnect();
    }
    console.log("Disconnected");
  }

  // on error, schedule a reconnection attempt
  errorCallBack(error: string) {
    console.log("errorCallBack -> " + error)
    setTimeout(() => {
      this._connect();
    }, 5000);
  }

  _send(message: any) {
    let auth_token = localStorage.getItem("tokenLogin")
    let header = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${auth_token}`)

    this.stompClient.send("/app/hello", {headers:header}, JSON.stringify(message));

  }

  onMessageReceived(message: any) {
    console.log("Message Recieved from Server :: " + message);
    this.appComponent.handleMessage(message.body);


    this.announcements[this.cnt++] = message.body;
    this.dataSharingService.updateAnnouncements(this.announcements)


  }
}
