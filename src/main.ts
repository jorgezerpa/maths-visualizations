import './style.css'
import { Canvas } from './components/canvas/Canvas'
import { CanvasCoordinates } from './components/canvas/CanvasCoordinates'
import { CanvasFunctionDrawer } from './components/canvas/CanvasFunctionDrawer'



  // const sketch = new Canvas({containerElementSelector:".svg_container"})
  // const sketch = new CanvasCoordinates({containerElementSelector:".svg_container"})
  const sketch = new CanvasFunctionDrawer({containerElementSelector:".svg_container"})