
import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { NotificationService } from 'src/app/service/notification.service';

@Component({
  standalone: false,
  selector: 'app-fictivo',
  templateUrl: './fictivo.component.html',
  styleUrls: ['./fictivo.component.scss']
})
export class FictivoComponent implements OnInit {
  selectedLanguage = '';
  gender = '';
  rank = '';
  numberOfNames!: number;
  numberOfElement = '';
  elements = 0;
  resultNames: any[] = [];
  givenNamesSource: any[] = [];
  surnamesSource: any[] = [];
  ranksSource: any[] = [];
  languageCodes: string[] = [
    "american",
    "argentinian",
    "australian",
    "brazilian",
    "british",
    "bulgarian",
    "canadian",
    "chinese",
    "danish",
    "finnish",
    "french",
    "german",
    "hungarian",
    "kazakh",
    "mexican",
    "norwegian",
    "polish",
    "portuguese",
    "russian",
    "spanish",
    "swedish",
    "turkish",
    "ukranian",
  ]

  constructor(private httpClient: HttpClient, public notification: NotificationService) {

  }

  ngOnInit(): void {

  }

  OnChange(string: string) {
    this.elements = Number(string);
  }




  async generateName(language: string, gender: string, rank: string, numberOfNames: number, numberOfnameElement: number) {
    let allGivenNameInThatLanguage: any[] = [];
    let allsurnameInThatLanguage: any[] = [];
    let randomGivenNameElement;
    let randomsurnameElement;
    let allRank: any[] = [];
    let randomRank;

    this.resultNames.length = 0;
    console.log(numberOfnameElement);

    this.httpClient.get(`../../../assets/names/${language}/${gender}.names`, { responseType: 'text' as 'json' }).subscribe(data => {
      const JSONGivennameData = JSON.stringify(data);
      this.givenNamesSource = JSONGivennameData.split('\\n').slice(2);
    })

    this.httpClient.get(`../../../assets/names/ranks.json`).subscribe(data => {
      const JSONrank = (JSON.stringify(data));
      const rankJSON = JSON.parse(JSONrank);
      for (const prop in rankJSON) {
        allRank.push(rankJSON[prop])
      }

      console.log(allRank);


      switch (rank) {
        case 'education':
          this.ranksSource = allRank.filter(item => item.domain === rank).map(item => item.nameFragment);
          break;
        case 'HUN-education':
          this.ranksSource = allRank.filter(item => item.domain === rank).map(item => item.inHungarian);
          break;
        case 'military':
          this.ranksSource = allRank.filter(item => item.domain === rank).map(item => item.nameFragment);
          break;
        case 'military-abb':
          this.ranksSource = allRank.filter(item => item.domain === 'military').map(item => item.shortFormENG);
          break;
        case 'HUN-military':
          this.ranksSource = allRank.filter(item => item.domain === 'military').map(item => item.inHungarian);
          break;
        case 'HUN-military-abb':
          this.ranksSource = allRank.filter(item => item.domain === 'military').map(item => item.shortFormHUN);
          break;
        case 'HUN-police':
          this.ranksSource = allRank.filter(item => item.domain === 'military' && item.inHungarian !== "közkatona" && item.inHungarian !== "őrvezető" && item.inHungarian !== "tizedes" && item.inHungarian !== "szakaszvezető").map(item => 'r. ' + item.inHungarian);
          break;
        case 'HUN-police-abb':
          this.ranksSource = allRank.filter(item => item.domain === 'military' && item.shortFormHUN !== "kk." && item.shortFormHUN !== "őrv." && item.shortFormHUN !== "tiz." && item.shortFormHUN !== "szkv.").map(item => 'r. ' + item.shortFormHUN);
          break;
        case 'HUN-fireman':
          this.ranksSource = allRank.filter(item => item.domain === 'military' && item.inHungarian !== "közkatona" && item.inHungarian !== "őrvezető" && item.inHungarian !== "tizedes" && item.inHungarian !== "szakaszvezető").map(item => 'tű. ' + item.inHungarian);
          break;
        case 'HUN-fireman-abb':
          this.ranksSource = allRank.filter(item => item.domain === 'military' && item.shortFormHUN !== "kk." && item.shortFormHUN !== "őrv." && item.shortFormHUN !== "tiz." && item.shortFormHUN !== "szkv.").map(item => 'tű. ' + item.shortFormHUN);
          break;
        case 'SS-military':
          this.ranksSource = allRank.filter(item => item.domain === rank).map(item => item.nameFragment);
          break;
        case 'civilian':
          this.ranksSource = allRank.filter(item => item.domain === rank).map(item => item.nameFragment);
          break;
        case 'HUN-civilian':
          this.ranksSource = allRank.filter(item => item.domain === 'civilian').map(item => item.inHungarian);
          break;
        case 'artist':
          this.ranksSource = [];
          break;

        default:
          this.ranksSource = [];
          break;
      }

      console.log('rank:', rank, this.ranksSource);
    })



    this.httpClient.get(`../../../assets/names/${language}/sur.names`, { responseType: 'text' as 'json' }).subscribe(data => {
      const JSONSurnameData = JSON.stringify(data);
      this.surnamesSource = JSONSurnameData.split('\\n').slice(2);

      for (let i = 0; i < numberOfNames; i++) {
        if (numberOfnameElement > 1) {
          randomRank = this.ranksSource[Math.floor(Math.random() * this.ranksSource.length)];
          randomGivenNameElement = this.givenNamesSource[Math.floor(Math.random() * this.givenNamesSource.length)];
          randomsurnameElement = this.surnamesSource[Math.floor(Math.random() * this.surnamesSource.length)];
          this.resultNames.push({ rank: randomRank, randomGivenNameElement, randomsurnameElement })
        } else {
          const randomNum = Math.floor((Math.random() * 100) + 1);
          randomRank = this.ranksSource[Math.floor(Math.random() * this.ranksSource.length)];

          if (randomNum % 2 == 0) {
            randomGivenNameElement = this.givenNamesSource[Math.floor(Math.random() * this.givenNamesSource.length)];
            this.resultNames.push({ rank: randomRank, randomGivenNameElement })
          } else {
            randomsurnameElement = this.surnamesSource[Math.floor(Math.random() * this.surnamesSource.length)];
            this.resultNames.push({ rank: randomRank, randomsurnameElement: randomsurnameElement })
          }
        }
        // randomRank = this.ranksSource[Math.floor(Math.random() * this.ranksSource.length)];
        // randomGivenNameElement = this.givenNamesSource[Math.floor(Math.random() * this.givenNamesSource.length)];
        // randomsurnameElement = this.surnamesSource[Math.floor(Math.random() * this.surnamesSource.length)];
      }
      console.log(this.resultNames);
    })
    this.resultNames.length = 0;
  }

}
