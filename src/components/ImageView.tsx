import { useEffect, useRef, useState } from 'react';
import ToolBar from './ToolBar';

const ImageView = ({ image }: { image: File }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [ctx, setCtx] = useState<CanvasRenderingContext2D | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      const context = canvas.getContext('2d');
      setCtx(context);
    }
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;

    if (!image || !ctx || !canvas) {
      return;
    }

    const img = new Image();
    img.src = URL.createObjectURL(image);

    img.onload = () => {
      const imageWidth = img.naturalWidth;
      const imageHeight = img.naturalHeight;

      canvas.width = imageWidth;
      canvas.height = imageHeight;

      ctx.clearRect(0, 0, imageWidth, imageHeight);
      ctx.drawImage(img, 0, 0, imageWidth, imageHeight);

      URL.revokeObjectURL(img.src);
    };

    return () => {
      URL.revokeObjectURL(img.src);
    };
  }, [image, ctx]);

  return (
    <>
      <div className="flex items-center justify-center">
        <canvas
          id="imageCanvas"
          style={{ maxWidth: '70vw', maxHeight: '80vh' }}
          ref={canvasRef}
        ></canvas>
      </div>
      <div>
        <ToolBar ctx={ctx} />
      </div>
    </>
  );
};

export default ImageView;
