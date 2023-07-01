import { CanvasCoordinates } from "./CanvasCoordinates";

type CanvasConstructorParams = {
  containerElementSelector:string
}

interface GridOptions {
  width?: number;
  height?: number;
  step?: number;
  color?: string;
}


class CanvasFunctionDrawer extends CanvasCoordinates {
  constructor({containerElementSelector}:CanvasConstructorParams){
    super({containerElementSelector:containerElementSelector})
    this.drawExpression((number)=>1 * number + 0);
    this.drawExpression((number)=>Math.sin(number)*100, { steps:100 });
    this.drawExpression((number)=>Math.cos(number)*100, { steps:100 });
    this.drawExpression((number)=>number**2);
  }


  drawExpression(expressionFn: (x: number) => number, config: { range?: [number, number], steps?: number, color?: string } = {}) {
    const { range = [-1000, 1000], steps = 1, color = "black" } = config;
    const [start, end] = range;
    const points = [];

    for (let x = start; x <= end; x += steps) {
      try {
        const y = expressionFn(x);
        if (Number.isFinite(y)) {
          points.push({ x, y });
        }
      } catch (error) {
        console.error(`Error evaluating expression with x = ${x}: ${error}`);
      }
    }

    const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path.setAttribute("fill", "none");
    path.setAttribute("stroke", color);
    path.setAttribute("stroke-width", "1");
    path.setAttribute("d", `M${points.map(({ x, y }) => `${x},${-y}`).join(" L")}`);

    this.canvas.appendChild(path);
  }



}

export { CanvasFunctionDrawer }
