type TextConfiguration = {
  text: string;
  color: string;
  fontSize: number;
  position: { x: number; y: number };
};

export class UIManager {
  constructor(private ctx: CanvasRenderingContext2D) {}

  drawText({ text, color, fontSize, position }: TextConfiguration): void {
    this.ctx.fillStyle = color;
    this.ctx.font = `${fontSize}px sans-serif`;
    this.ctx.fillText(text, position.x, position.y);
  }

  clear(): void {
    this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
  }
}
