import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { from, map, Observable, of, share } from 'rxjs';
export class Person {
  name!: string;
}
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  constructor(private http: HttpClient) {}
  ngOnInit() {
    //---------------------------------------------Parent ----------------------
    const person: Person = {
      name: 'david',
    };

    //---------------------------------------------Chapter One ----------------------
    const personobs: Observable<Person> = of(person);

    personobs.subscribe((data) => {
      console.log(
        '---------------------------------------------Chapter One ----------------------',
        data
      );
    });

    //---------------------------------------------Chapter Two (converting a string to observable) ----------------------

    const twopersonobs: Observable<string> = of('selvasekar');
    twopersonobs.subscribe((data) => {
      console.log(
        '---------------------------------------------Chapter Two (converting a string to observable) ----------------------',
        data
      );
    });

    //---------------------------------------------Chapter Three (promise to observable) ----------------------

    const personPromise: Promise<Person> = Promise.resolve(person);

    const persObs = from(personPromise);
    persObs.subscribe((data) => {
      console.log(
        '---------------------------------------------Chapter Three (promise to observable) ---------------------- person promise',
        data
      );
    });
    //---------------------------------------------Chapter  (Map to Tap Operator) ----------------------

    const source = of('david');

    source
      .pipe(
        map((data) => {
          return data.toUpperCase();
        })
      )
      .subscribe((data) => {
        console.log(
          '---------------------------------------------Chapter  (Map to Tap Operator) ----------------------',
          data
        );
      });

    //---------------------------------------------Subscribe ----------------------
    const request = this.getPosts();
    // this.setLoadingSpinner(request);
    request.subscribe((data) => {
      console.log('------------------data for posts', data);
    });
  }

  getPosts() {
    return this.http
      .get('https://jsonplaceholder.typicode.com/posts')
      .pipe(share());
  }

}
