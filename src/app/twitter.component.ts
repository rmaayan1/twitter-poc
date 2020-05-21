import {Component, OnDestroy, OnInit} from '@angular/core';
import {AngularFireDatabase} from '@angular/fire/database';
import {Subscription} from 'rxjs';


@Component({
  selector: 'app-twitter',
  templateUrl: './twitter.component.html',
  styleUrls: ['./twitter.component.css']
})
export class TwitterComponent implements OnInit, OnDestroy {
  private basePath = '/users';
  users: any[];
  selectedUser: any;
  private usersSubscription: Subscription;
  constructor(private db: AngularFireDatabase) {}

  ngOnInit(): void {
   this.usersSubscription = this.db.list(this.basePath).valueChanges().subscribe(users => {
      this.users = users;
    });
  }

  ngOnDestroy(): void {
    this.usersSubscription.unsubscribe();
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
