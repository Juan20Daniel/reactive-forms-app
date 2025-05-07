import { Component } from '@angular/core';
import reactiveRoutes from '../../../reactive/reactive.routes';
import { RouterLink, RouterLinkActive } from '@angular/router';

interface MenuItem {
  title:string;
  route:string;
}

const routesItems = reactiveRoutes[0].children??[];

@Component({
  selector: 'app-side-menu',
  imports: [ RouterLink, RouterLinkActive ],
  templateUrl: './side-menu.component.html',
  styleUrl: './side-menu.component.css'
})
export class SideMenuComponent {
  reactiveMenu:MenuItem[] = routesItems.map(item => ({
    route: `${'reactive/'+item.path}`,
    title: `${item.title}`
  })).filter(route => route.route !== 'reactive/**')

  authMenu:MenuItem[] = [{
    title:'Registro',
    route:'./auth'
  }]

  countryMenu:MenuItem[] = [{
    title:'Países',
    route:'./country'
  }]
}
