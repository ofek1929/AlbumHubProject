import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'AlbumHub';

  isDisabled: boolean = true;

  public Open() {
    let hamburger = <HTMLImageElement>document.getElementById('hamburger');
    let Ha = document.getElementById('Ha');
    let Hb = document.getElementById('Hb');
    let Hc = document.getElementById('Hc');
    let Hd = document.getElementById('Hd');
    let He = document.getElementById('He');
    if (Ha.style.visibility === 'hidden') {
      hamburger.src = '/assets/images/menuX.png';
      Ha.style.visibility = 'visible'; Ha.style.height = '20px';
      Hb.style.visibility = 'visible'; Hb.style.height = '20px';
      Hc.style.visibility = 'visible'; Hc.style.height = '20px';
      Hd.style.visibility = 'visible'; Hd.style.height = '20px';
      He.style.visibility = 'visible'; He.style.height = '20px';
    }
    else {
      hamburger.src = '/assets/images/menu.png';
      Ha.style.visibility = 'hidden'; Ha.style.height = '0px';
      Hb.style.visibility = 'hidden'; Hb.style.height = '0px';
      Hc.style.visibility = 'hidden'; Hc.style.height = '0px';
      Hd.style.visibility = 'hidden'; Hd.style.height = '0px';
      He.style.visibility = 'hidden'; He.style.height = '0px';
    }
  }
  public OpenUser() {
    let user = <HTMLImageElement>document.getElementById('user');
    let Ua = document.getElementById('Ua');
    let Ub = document.getElementById('Ub');
    let Uc = document.getElementById('Uc');
    let Ud = document.getElementById('Ud');
    let Ue = document.getElementById('Ue');

    if (Ua.style.visibility === 'hidden') {
      user.src = '/assets/images/menuX.png';;
      Ua.style.visibility = 'visible'; Ua.style.height = '20px';
      Ub.style.visibility = 'visible'; Ub.style.height = '20px';
      Uc.style.visibility = 'visible'; Uc.style.height = '20px';
      Ud.style.visibility = 'visible'; Ud.style.height = '20px';
      Ue.style.visibility = 'visible'; Ue.style.height = '20px';
    }
    else {
      user.src = '/assets/images/user.png';
      Ua.style.visibility = 'hidden'; Ua.style.height = '0px';
      Ub.style.visibility = 'hidden'; Ub.style.height = '0px';
      Uc.style.visibility = 'hidden'; Uc.style.height = '0px';
      Ud.style.visibility = 'hidden'; Ud.style.height = '0px';
      Ue.style.visibility = 'hidden'; Ue.style.height = '0px';
    }
  }

  public switchPage(x) {
    const image = document.getElementById('image');
    const upload =  document.getElementById('upload');
    if(x == 'image') {
      upload.style.display = 'none';
      image.style.display = 'inline';
    }
    else if(x == 'upload'){
      image.style.display = 'none';
      upload.style.display = 'inline';
    }
  }
}
