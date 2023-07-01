type CanvasConstructorParams = {
    containerElementSelector:string
  }
  
  
  class Canvas {
      containerElement:HTMLDivElement
      containerDimentions:DOMRect
      canvas:SVGElement
  
      startDragCoords:{x:number|null, y:number|null} = {x:null, y:null}
      startDragScroll:{x:number|null, y:number|null} = { x:null, y:null }
      width=10000;
      height=10000;
      background = "#000000";
      prevPanDirectionX=0
      prevPanDirectionY=0
      scaleFactor = 1
      prevMouseX = 0
      prevMouseY = 0
      isDragging = false
  
      constructor({containerElementSelector}:CanvasConstructorParams){
        this.containerElement = document.querySelector(containerElementSelector) as HTMLDivElement
        this.containerDimentions = this.containerElement.getBoundingClientRect()
        this.canvas = document.createElementNS("http://www.w3.org/2000/svg", "svg") as SVGElement;
        this.initialize()
        // this.drawTest()
      }
      
      initialize(){
        if(!this.containerElement){
          console.log("not valid container")
          return
        }
  
        const centerX = this.width / 2;
        const centerY = this.height / 2;
        this.canvas.setAttribute('viewBox', `${-centerX} ${-centerY} ${this.width} ${this.height}`);
        // this.canvas.setAttribute('viewBox', `0 0 ${this.width} ${this.height}`);
        
        this.containerElement.appendChild(this.canvas)
        this.canvas.setAttribute('width', this.width.toString())
        this.canvas.setAttribute('height', this.height.toString())
        this.handleMouseDown()
        this.handleMouseUp()
        this.handleMouseWheel()
  
        this.containerElement.scrollTo(centerX-this.containerDimentions.width/2, centerY-this.containerDimentions.height/2);
        this.startDragScroll = { x:this.containerElement.scrollLeft,  y:this.containerElement.scrollTop }
      }
    
      drawTest() {
        const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        circle.setAttribute('cx', '0');
        circle.setAttribute('cy', '0');
        circle.setAttribute('r', '100');
        circle.setAttribute('fill', 'blue');
        this.canvas.appendChild(circle);
      } 
    
      handleMouseDown(){
        this.containerElement.addEventListener('mousedown',(e)=>{
          this.startDragCoords = {x:e.clientX, y:e.clientY}
          this.startDragScroll = { x:this.containerElement.scrollLeft,  y:this.containerElement.scrollTop }
          this.isDragging = true
          this.containerElement.addEventListener("mousemove", this.handlePan.bind(this))
        })
      }
      
      handleMouseUp(){
        this.containerElement.addEventListener('mouseup',()=>{
          this.startDragCoords = {x:null, y:null}
          this.isDragging = false
          this.containerElement.removeEventListener("mousemove", this.handlePan.bind(this))
        })
      }
    
      handlePan(e:MouseEvent){
          if(this.isDragging && this.startDragCoords.x && this.startDragCoords.y){
            let mouseDirecction = this.getMouseDirection(e)
            
            const deltaMouse = { x: Math.abs(this.startDragCoords.x-e.clientX), y:Math.abs(this.startDragCoords.y - e.clientY) }
            // if change direction reset startDragCoords
            if(this.prevPanDirectionX!==mouseDirecction.x ) {
              this.startDragCoords.x = e.clientX
              this.startDragScroll.x = this.containerElement.scrollLeft
            }
            if(this.prevPanDirectionY!==mouseDirecction.y ) {
              this.startDragCoords.y = e.clientY
              this.startDragScroll.y = this.containerElement.scrollTop
            }
            // update mouse direction each time
            this.prevPanDirectionX = mouseDirecction.x
            this.prevPanDirectionY = mouseDirecction.y
    
            // evaluate === null. because if its value is 0, it will be true-> beacause 0 is considerated like false--> JAVACRIPT MAGIC :V 
            if(this.startDragScroll.x===null) return 
            if(this.startDragScroll.y===null) return 
    
            if(mouseDirecction.x===-1) {
              this.containerElement.scrollTo(this.startDragScroll.x + deltaMouse.x, this.containerElement.scrollTop);
            }
            if(mouseDirecction.x===1) {
              this.containerElement.scrollTo(this.startDragScroll.x - deltaMouse.x, this.containerElement.scrollTop);
            }
            if(mouseDirecction.y===-1) {
              this.containerElement.scrollTo(this.containerElement.scrollLeft, this.startDragScroll.y - deltaMouse.y);
            }
            if(mouseDirecction.y===1) {
              this.containerElement.scrollTo(this.containerElement.scrollLeft, this.startDragScroll.y + deltaMouse.y);
            }
          }
      }
 

      handleMouseWheel(){
        this.canvas.addEventListener('wheel', (e: WheelEvent) => {
          e.preventDefault();
          const wheelDirection = e.deltaY > 0 ? 1 : -1;
      
          // Calculate the new scale factor
          const scaleFactorIncrement = 0.1;
          if (wheelDirection < 0) {
            // Zoom in
            this.scaleFactor += scaleFactorIncrement;
          } else {
            // Zoom out
            this.scaleFactor -= scaleFactorIncrement;
            if (this.scaleFactor < 0.1) {
              this.scaleFactor = 0.1;
            }
          }
      
          // Apply the new scale factor
          this.canvas.style.transform = `scale(${this.scaleFactor})`;
        });
      }
    
      //utils
      getMouseDirection(e: MouseEvent):{x:number, y:number}{
        let currentMouseX = e.clientX
        let currentMouseY = e.clientY
        let xDirection = 0
        let yDirection = 0
        if(currentMouseX>this.prevMouseX) {
          xDirection = 1
        } 
        if(currentMouseX<this.prevMouseX) {
          xDirection = -1
        } 
        if(currentMouseY>this.prevMouseY) {
          yDirection = -1
        } 
        if(currentMouseY<this.prevMouseY) {
          yDirection = 1
        } 
        this.prevMouseX = currentMouseX
        this.prevMouseY = currentMouseY
        return {x:xDirection, y:yDirection}
      }
    }
 
    
    export { Canvas }

