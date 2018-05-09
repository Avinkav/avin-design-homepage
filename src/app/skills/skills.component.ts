import {
  Component,
  OnInit
} from '@angular/core';

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.css']
})
export class SkillsComponent implements OnInit {

  languages = [{
    tag: 'C#',
    level: '99%'
  },
  {
    tag: 'Typescript',
    level: '70%'
  },
  {
    tag: 'Javascript',
    level: '80%'
  },

  {
    tag: 'HTML5',
    level: '95%'
  },
  {
    tag: 'CSS3',
    level: '90%'
  },
  {
    tag: 'F#',
    level: '30%'
  },
 ];

 clouds = [{
  tag: 'Amazon Web Services',
  level: '54%'
},
{
  tag: 'Ubnutu Server 16.04',
  level: '81%'
},
{
  tag: 'Google Cloud Platform',
  level: '42%'
},
{
  tag: 'Docker',
  level: '28%'
},
];

frameworks = [{
  tag: '.NET 4.6  .NET Core 2',
  level: '90%'
},
{
  tag: 'Angular 6',
  level: '93%'
},
{
  tag: 'Xamarin.Android',
  level: '90%'
},
{
  tag: 'ASP.NET',
  level: '86%'
},
];

patterns = [
  {
    tag: 'MVVM',
    level: '99%'
  },
{
  tag: 'Dependency Injection',
  level: '80%'
},
{
  tag: 'Inversion of Control',
  level: '72%'
},
{
  tag: 'Material Design',
  level: '83%'
},
];

  constructor() {}

  ngOnInit() {}

}
