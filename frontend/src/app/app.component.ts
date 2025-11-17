import { Component, AfterViewInit} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: false,
})
export class AppComponent implements AfterViewInit{

  // Inert attribute to hidden pages for accessibility
  ngAfterViewInit() {
    const observer = new MutationObserver(() => {
      
      // Remove Inert from visible pages and add to hidden ones
      document.querySelectorAll('.ion-page').forEach(page => {
        if (page.classList.contains('ion-page-hidden')) {
          page.setAttribute('inert', '');
        } else {
          page.removeAttribute('inert'); 
        }
      });
    observer.observe(document.body, { attributes: true, subtree: true });
    });
  }
  constructor() {}
}
