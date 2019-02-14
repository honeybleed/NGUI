import {
  Component, ComponentFactory, ComponentFactoryResolver, ComponentRef, OnDestroy, OnInit, Type, ViewChild,
  ViewContainerRef
} from '@angular/core';
import { PopupLayerService } from './popup-layer.service';

@Component({
  selector: 'app-popup-layer',
  templateUrl: './popup-layer.component.html',
  styleUrls: ['./popup-layer.component.scss']
})
export class PopupLayerComponent implements OnInit, OnDestroy {
  private shown: boolean;
  @ViewChild('container', { read: ViewContainerRef }) container: ViewContainerRef;
  contentComponent: ComponentRef<Type<any>>;
  constructor(private popupLayerService: PopupLayerService,  private resolver: ComponentFactoryResolver) {
    this.popupLayerService.setContentRequested$.subscribe((args: {content: Type<any>, pams: any}) => {
      this.fillContainer(args.content, args.pams);
    });
    this.popupLayerService.showChanged$.subscribe((isShown: boolean) => {
      this.shown = isShown;
    });
  }
  private fillContainer(type: Type<any>, pams: any) {
    if (this.contentComponent) {
      this.contentComponent.destroy();
    }
    this.container.clear();
    const factory: ComponentFactory<Type<any>> = this.resolver.resolveComponentFactory(type);
    this.contentComponent = this.container.createComponent(factory);
    if (pams) {
      for (const pamName of Object.getOwnPropertyNames(pams)) {
        this.contentComponent.instance[pamName] = pams[pamName];
      }
    }
    this.popupLayerService.contentChanged(this.contentComponent);
  }
  ngOnInit() {
  }
  ngOnDestroy(): void {
    this.contentComponent.destroy();
  }
  isShow() {
    return this.shown ? 'show' : '';
  }
}
