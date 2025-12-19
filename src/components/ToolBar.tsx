import { useState } from 'react';
import { convertToGrayscale } from '../utils/convert';
import { Button, Stack } from '@chakra-ui/react';

const ToolBar = ({ ctx }: { ctx: CanvasRenderingContext2D | null }) => {
  const [loading, setLoading] = useState(false);

  const handleGrayscale = () => {
    if (!ctx) return;
    const canvas = ctx.canvas;

    setLoading(true);
    setTimeout(() => {
      try {
        convertToGrayscale(ctx, canvas.width, canvas.height);
      } finally {
        setLoading(false);
      }
    }, 0);
  };

  return (
    <>
      <Stack direction="row" gap="4" align="center">
        <Button onClick={handleGrayscale} loading={loading}>
          Grayscale
        </Button>
      </Stack>
    </>
  );
};

export default ToolBar;
