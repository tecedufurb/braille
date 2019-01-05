import { Component, ViewChild } from '@angular/core';
import { Events, MenuController, Nav, Platform } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Storage } from '@ionic/storage';
//import { TabsPage } from '../pages/tabs-page/tabs-page';
import { TutorialPage } from '../pages/tutorial/tutorial';
import { ConferenceData } from '../providers/conference-data';
import { UserData } from '../providers/user-data';
import { SinaisBraillePage } from '../pages/sinais-braille/sinais-braille';
import { PrincipalPage } from '../pages/Principal/Principal';
import { ConsultaBraillePage } from '../pages/consulta-braille/consulta-braille';
import { PraticaBraillePage } from '../pages/pratica-braille/pratica-braille';
import { MaquinaBraillePage } from '../pages/maquina-braille/maquina-braille';
import { Utils } from '../pages/utilBraille/utilBraille';
import { InformacoesPage } from '../pages/informacoes/informacoes';
//import { LoginPage } from '../pages/login/login';

export interface PageInterface {
  title: string;
  name: string;
  component: any;
  icon: string;
}

@Component({
  templateUrl: 'app.template.html'
})
export class ConferenceApp {
  // the root nav is a child of the root app component
  // @ViewChild(Nav) gets a reference to the app's root nav
  @ViewChild(Nav) nav: Nav;
  // List of pages that can be navigated to from the left menu
  // the left menu only works after login
  // the login page disables the left menu

  PaginasMenu: PageInterface[] = [
    { title: 'Sinais', name: 'TabsPage', component: SinaisBraillePage, icon: 'ios-book' },
    { title: 'Consulta', name: 'TabsPage', component: ConsultaBraillePage, icon: 'search' },
    { title: 'Prática', name: 'TabsPage', component: PraticaBraillePage, icon: 'hand' },
    { title: 'Máquina braille', name: 'TabsPage', component: MaquinaBraillePage, icon: 'create' },
    // { title: 'Sobre', name: 'TabsPage', component: TabsPage, tabComponent: TabsPage, index: 1, icon: 'information-circle' },

    // { title: 'Sair', name: 'Login', component: LoginPage, logsOut: true, icon: 'log-in' },
  ];
  rootPage: any;
  Util: Utils;
  constructor(
    public events: Events,
    public userData: UserData,
    public menu: MenuController,
    public platform: Platform,
    public confData: ConferenceData,
    public storage: Storage,
    public splashScreen: SplashScreen
  ) {

    // Check if the user has already seen the tutorial
    this.storage.get('hasSeenTutorial')
      .then((hasSeenTutorial) => {
        if (hasSeenTutorial) {
          //Retirado login
          /*this.storage.get('hasLoggedIn').then((hasLoggedIn) => {
            if (hasLoggedIn) {
              this.rootPage = TabsPage;
            } else {
              this.rootPage = LoginPage;
            }
          });*/
          this.rootPage = PrincipalPage;
        } else {
          this.rootPage = TutorialPage;
        }
        this.platformReady()
      });

    // load the conference data
    confData.load();

    // decide which menu items should be hidden by current login status stored in local storage
    this.userData.hasLoggedIn().then((hasLoggedIn) => {
      this.enableMenu(hasLoggedIn === true);
    });
    this.enableMenu(true);

    this.listenToLoginEvents();
  }

  openPage(page: PageInterface) {
    //let params = {};
    this.nav.popToRoot();
    this.nav.push(page.component);

    // the nav component was found using @ViewChild(Nav)
    // setRoot on the nav to remove previous pages and only have this page
    // we wouldn't want the back button to show in this scenario
    /* if (page.index) {
       params = { tabIndex: page.index };
     } */

    // If we are already on tabs just change the selected tab
    // don't setRoot again, this maintains the history stack of the
    // tabs even if changing them from the menu

    /* if (this.nav.getActiveChildNavs().length && page.index != undefined) {
       this.nav.getActiveChildNavs()[0].select(page.index);
     } else {
       // Set the root of the nav with params if it's a tab index
       this.nav.setRoot(page.name, params).catch((err: any) => {
         console.log(`Didn't set nav root: ${err}`);
       });
     }*/

    /* if (page.logsOut === true) {
       // Give the menu time to close before changing to logged out
       this.userData.logout();
     }*/
  }

  paginaInicial() {
    this.nav.setRoot(PrincipalPage);
  }

  openTutorial() {
    this.nav.setRoot(TutorialPage);
  }

  listenToLoginEvents() {
    this.events.subscribe('user:login', () => {
      this.enableMenu(true);
    });

    this.events.subscribe('user:signup', () => {
      this.enableMenu(true);
    });

    this.events.subscribe('user:logout', () => {
      this.enableMenu(false);
    });
  }

  enableMenu(loggedIn: boolean) {
    loggedIn;
    //Menu lateral 
    //this.menu.enable(loggedIn, 'loggedInMenu');
    //this.menu.enable(!loggedIn, 'loggedOutMenu');
  }

  Informacoes() {
    this.nav.push(InformacoesPage);
  }

  platformReady() {
    // Call any initial plugins when ready
    this.platform.ready().then(() => {
      this.splashScreen.hide();
    });
  }

  isActive(page: PageInterface) {
    let childNav = this.nav.getActiveChildNavs()[0];

    // Tabs are a special case because they have their own navigation
    if (childNav) {
      if (childNav.getSelected() && childNav.getSelected().root === page.component) {
        return 'primary';
      }
      return;
    }

    if (this.nav.getActive() && this.nav.getActive().name === page.name) {
      return 'primary';
    }
    return;
  }
}
