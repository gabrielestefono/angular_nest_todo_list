import Swal from 'sweetalert2';
import { AnimationOptions } from 'ngx-lottie';
import player from 'lottie-web';
import { Renderer2, RendererFactory2, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  public options: AnimationOptions = {
    assetsPath: '/assets/lottie/loading.json',
  };

  private renderer: Renderer2;

  constructor(
    private rendererFactory: RendererFactory2
  ) {
    this.renderer = rendererFactory.createRenderer(null, null);
  }

  isAnimationLoaded = false;

  loading(valor: boolean){
    if(valor){
      const lottieAnimation = this.renderer.createElement('div');
      this.renderer.setProperty(lottieAnimation, 'id', 'lottieAnimation');
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
                this.isAnimationLoaded = true;
              })
              .catch(error => {
                console.error('Error:', error);
                this.loading(false);
              });
          } else {
            console.error('assetsPath is undefined');
          }
        }
      })
    }else{
      if(player && this.isAnimationLoaded) {
        player.stop();
        this.isAnimationLoaded = false;
      }
      Swal.close();
    }
  }
}
