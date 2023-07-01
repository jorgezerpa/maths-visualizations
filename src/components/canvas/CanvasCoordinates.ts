import { Canvas } from "./Canvas";

type CanvasConstructorParams = {
  containerElementSelector:string
}

interface GridOptions {
  width?: number;
  height?: number;
  step?: number;
  color?: string;
}


class CanvasCoordinates extends Canvas {
  constructor({containerElementSelector}:CanvasConstructorParams){
    super({containerElementSelector:containerElementSelector})
    this.drawGrid()
    this.drawAxis()
  }

  drawAxis() {
    const centerX = this.width / 2;
    const centerY = this.height / 2;
  
    // Dibuja el eje X
    const lineX = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    lineX.setAttribute('x1', `${-centerX}`);
    lineX.setAttribute('y1', '0');
    lineX.setAttribute('x2', `${centerX}`);
    lineX.setAttribute('y2', '0');
    lineX.setAttribute('stroke', 'red');
    this.canvas.appendChild(lineX);
    
    // Dibuja el eje Y
    const lineY = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    lineY.setAttribute('x1', '0');
    lineY.setAttribute('y1', `${-centerY}`);
    lineY.setAttribute('x2', '0');
    lineY.setAttribute('y2', `${centerY}`);
    lineY.setAttribute('stroke', 'blue');
    this.canvas.appendChild(lineY);
  }
  

  public drawGrid(options: GridOptions = {}): void {
    const defaultOptions: GridOptions = {
      width: 500,
      height: 500,
      step: 500/50,
      color: '#aaa',
    };
    let { width, height, step, color } = { ...defaultOptions, ...options };
    if(!width || !height || !step || !color) return 

    const centerX = width / 2;
    const centerY = height / 2;

    // Dibuja las líneas verticales
    for (let x = -centerX; x <= centerX; x += step) {
      const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
      line.setAttribute('x1', `${x}`);
      line.setAttribute('y1', `${-centerY}`);
      line.setAttribute('x2', `${x}`);
      line.setAttribute('y2', `${centerY}`);
      line.setAttribute('stroke', color);
      this.canvas.appendChild(line);
    }

    // Dibuja las líneas horizontales
    for (let y = -centerY; y <= centerY; y += step) {
      const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
      line.setAttribute('x1', `${-centerX}`);
      line.setAttribute('y1', `${y}`);
      line.setAttribute('x2', `${centerX}`);
      line.setAttribute('y2', `${y}`);
      line.setAttribute('stroke', color);
      this.canvas.appendChild(line);
    }
  }




}

export { CanvasCoordinates }
