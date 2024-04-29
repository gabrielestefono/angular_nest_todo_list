import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';
import { AnimationOptions } from 'ngx-lottie';
import player from 'lottie-web';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  public options: AnimationOptions = {
    assetsPath: '/assets/lottie/loading.json',
  };

  constructor() {}

  loading(valor: boolean){
    if(valor){
    const lottieAnimation = document.createElement('div');
    lottieAnimation.id = 'lottieAnimation';
    Swal.fire({
      html: lottieAnimation,
      showConfirmButton: false,
      background: "#1A1A1A",
      willOpen: () => {
        if (this.options.assetsPath) {
          fetch(this.options.assetsPath)
            .then(response => response.json())
            .then(animationData => {
              player.loadAnimation({
                container: lottieAnimation,
                renderer: 'svg',
                loop: true,
                autoplay: true,
                animationData: animationData
              });
            })
            .catch(error => console.error('Error:', error));
        } else {
          console.error('assetsPath is undefined');
        }
      }
    })
    }else{
      Swal.close()
    }
  }
}
