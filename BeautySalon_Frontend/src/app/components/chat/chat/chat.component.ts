import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {webSocket} from "rxjs/webSocket";
import {WebSocketAPI} from "./WebSocketAPI";
import jwt_decode from "jwt-decode";
import {DataSharingService} from "../../../services/dataSharing/data-sharing.service";
import {BehaviorSubject} from "rxjs";
import {ChatService} from "../../../services/chat/chat.service";

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit{
  title = 'angular8-springboot-websocket';

  webSocketAPI: WebSocketAPI | any;
  greeting: string =""
  name: string= "";
  userType: string = "";

  announcements: string[] = [];
  announcementsNew: string[] = [];

  private announcements2 = new BehaviorSubject<string[]>([])
  announcements$ = this.announcements2.asObservable();

  new: boolean = false;
  constructor(private dataSharingService: DataSharingService, private cd: ChangeDetectorRef, private chatService: ChatService) {
  }

  ngOnInit() {
    var savedToken: any;
    savedToken = localStorage.getItem('tokenLogin')
    var tokenPayload: any;
    tokenPayload = jwt_decode(savedToken);
    this.userType = tokenPayload.userType;

    this.webSocketAPI = new WebSocketAPI(new ChatComponent(this.dataSharingService, this.cd, this.chatService), this.dataSharingService);

  }

  connect(){
    this.webSocketAPI._connect();
  }

  disconnect(){
    this.webSocketAPI._disconnect();
  }

  sendMessage(){
    this.webSocketAPI._send(this.name);
  }

  handleMessage(message: any){
    this.announcements = [ message, ...this.announcements];
    this.cd.markForCheck()

  }

  showAnnouncements() {
    this.chatService.getAnnouncements().subscribe((res:any) => {
      this.announcementsNew = [...res]
    })

  }

  ngOnChanges(changes: SimpleChanges): void {
  }


}
