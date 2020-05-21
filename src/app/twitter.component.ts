import {Component, OnInit} from '@angular/core';
import {AngularFireDatabase} from '@angular/fire/database';


@Component({
  selector: 'app-twitter',
  templateUrl: './twitter.component.html',
  styleUrls: ['./twitter.component.css']
})
export class TwitterComponent implements OnInit {
  private basePath = '/users';
  users: any[];
  selectedUser: any;

  constructor(private db: AngularFireDatabase) {}

  ngOnInit(): void {
    this.db.list(this.basePath).valueChanges().subscribe( users => {
      this.users = users;
    });
  }

  onChangeUser(user: any) {
    console.log(`changed user to ${user}`);
  }

  getUserDetails(selectedUserName: any) {
    if (selectedUserName) {
      for (const user of this.users) {
        if (user.name === selectedUserName) {
          return JSON.stringify(user);
        }
      }
    }
    return null;
  }

  getUserTweets(selectedUserName: any) {
    const text = 'text';
    const tweets: string[] = [];
    if (selectedUserName) {
      for (const user of this.users) {
        if (user.name === selectedUserName) {
          for (const tweet in user.tweets) {
            if (user.tweets.hasOwnProperty(tweet)) {
              tweets.push(user.tweets[tweet][text]);
            }
          }
          return tweets;
        }
      }
    }
    return null;
  }
}
