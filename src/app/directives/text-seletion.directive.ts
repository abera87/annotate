import { Directive, ElementRef, EventEmitter, HostListener, Input, NgZone, OnDestroy, OnInit } from '@angular/core';


export interface SelectionRectangle {
  left: number;
  top: number;
  width: number;
  height: number;
}
export interface TextSelectEvent {
  text: string|undefined;
  viewportRectangle: SelectionRectangle | null;
  hostRectangle: SelectionRectangle | null;
  sentId:number;
}
@Directive({
  selector: '[textSelect]',
  outputs: ["textSelectEvent:textSelect"]
})
export class TextSeletionDirective implements OnInit, OnDestroy {
  @Input() sentId!:any;
  public textSelectEvent: EventEmitter<TextSelectEvent>;
  private elementRef: ElementRef;
  private hasSelection: boolean;
  private zone: NgZone;

  constructor(elementRef: ElementRef, zone: NgZone) {
    this.elementRef = elementRef;
    this.zone = zone;
    this.hasSelection = true;
    this.textSelectEvent = new EventEmitter();
  }

  ngOnInit() {
    this.zone.runOutsideAngular(() => {
     this.elementRef.nativeElement.addEventListener("mousedown", this.handleMousedown, false);

      document.addEventListener("selectionchange", this.handleSelectionchange, false);
    });
  }
  ngOnDestroy() {
    this.elementRef.nativeElement.removeEventListener("mousedown", this.handleMousedown, false);
    document.removeEventListener("mouseup", this.handleMouseup, false);
    document.removeEventListener("selectionchange", this.handleSelectionchange, false);
  }

 
  // @HostListener('mouseup') onMouseUp(){
  //   this.processSelection();
  // }

  private handleMousedown = (): void => {
    document.addEventListener("mouseup", this.handleMouseup, false);
  }
  private handleMouseup = (): void => {
    document.removeEventListener("mouseup", this.handleMouseup, false);
    this.processSelection();
  }
  private handleSelectionchange = (): void => {
    if (this.hasSelection) {
      this.processSelection();
    }
  }
  private getRangeContainer(range: Range): Node {
   var container = range.commonAncestorContainer;
    while (container.nodeType !== Node.ELEMENT_NODE) {
      container = container.parentNode;
    }
    return (container);
  }

  private isRangeFullyContained(range: Range): boolean {
    var hostElement = this.elementRef.nativeElement;
    var selectionContainer = range.commonAncestorContainer;
    while (selectionContainer.nodeType !== Node.ELEMENT_NODE) {
      selectionContainer = selectionContainer.parentNode;
    }
    return (hostElement.contains(selectionContainer));
  }
  private processSelection(): void {
    var selection = document.getSelection();
    if (this.hasSelection) {
      this.zone.runGuarded(() => {
        this.hasSelection = false;
        this.textSelectEvent.next({
          text: "",
          viewportRectangle: null,
          hostRectangle: null,
          sentId:this.sentId
        });
      });
    }
    if (!selection?.rangeCount || !selection.toString()) {
      return;
    }
    var range = selection.getRangeAt(0);
    var rangeContainer = this.getRangeContainer(range);

    if (this.elementRef.nativeElement.contains(rangeContainer)) {
      var viewportRectangle = range.getBoundingClientRect();
      var localRectangle = this.viewportToHost(viewportRectangle, rangeContainer);
      this.zone.runGuarded(() => {
        this.hasSelection = true;
        this.textSelectEvent.emit({
          text: selection?.toString(),
          viewportRectangle: {
            left: viewportRectangle.left,
            top: viewportRectangle.top,
            width: viewportRectangle.width,
            height: viewportRectangle.height
          },
          hostRectangle: {
            left: localRectangle.left,
            top: localRectangle.top,
            width: localRectangle.width,
            height: localRectangle.height
          },
          sentId:this.sentId
        });
      });
    }
  }

  private viewportToHost(viewportRectangle: SelectionRectangle, rangeContainer: Node): SelectionRectangle {
    var host = this.elementRef.nativeElement;
    var hostRectangle = host.getBoundingClientRect();
    var localLeft = (viewportRectangle.left - hostRectangle.left);
    var localTop = (viewportRectangle.top - hostRectangle.top)

    var node = rangeContainer;
    do {
      localLeft += (<Element>node).scrollLeft;
      localTop += (<Element>node).scrollTop;
    } while ((node !== host) && (node = node.parentNode));
    return ({ left: localLeft, top: localTop, width: viewportRectangle.width, height: viewportRectangle.height });
  }
}

