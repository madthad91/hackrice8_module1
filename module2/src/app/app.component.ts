import { Component, OnInit } from '@angular/core';
declare var firebase;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app works!';
  fb;
  ngOnInit() {
    // Initialize Firebase
    var config = {
      apiKey: "AIzaSyAx6-Uf6XelwwNdQ8uHxq8xunBB9QuEKDc",
      authDomain: "hackricechatter.firebaseapp.com",
      databaseURL: "https://hackricechatter.firebaseio.com",
      projectId: "hackricechatter",
      storageBucket: "hackricechatter.appspot.com",
      messagingSenderId: "678522738824"
    };
    this.fb = firebase.initializeApp(config);
    this.fb = this.fb.database();

    this.refreshAllVotes();

    (document
      .querySelectorAll('button') as any)
      .forEach((val, idx) => {
        val.onclick = (e) => {
          
          // Get the current vote of the vote option pressed
          this.getCurrentVote(e.target.id)
            .then((snapshot) => {
              // Increment the current vote by one
              let currentVoteValue = snapshot.val();
              currentVoteValue++;
              // Push the new vote
              this.pushNewVote(e.target.id, currentVoteValue)
                .then(() => this.refreshAllVotes());

            });
        }
      })
  }
  refreshAllVotes() {
    // Get Db ref
    this.fb
      // Get entire Db contents
      .ref()
      .once('value')
      .then((snapshot) => {

        let entireDbAsJson = snapshot.val();
        Object.keys(entireDbAsJson)
          .forEach(val => {
            let btn = document.querySelector(`#votecount_${val}`)
            btn.innerHTML = entireDbAsJson[val];
          })

        return null;
      });
  }

  getCurrentVote(voteOptionName) {
    // Get Db ref
    return this.fb
      // Get entire Db contents
      .ref(voteOptionName)
      .once('value');
  }

  pushNewVote(voteOptionName, currentVoteValue) {
    return this.fb
      // Get entire Db contents
      .ref(voteOptionName)
      .set(currentVoteValue);
  }

}