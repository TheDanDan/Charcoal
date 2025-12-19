import { useState } from 'react';
import { convertToGrayscale, convertToRandomizedGrayscale } from '../utils/convert';
import { Button, Stack } from '@chakra-ui/react';

const ToolBar = ({ ctx }: { ctx: CanvasRenderingContext2D | null }) => {
  const [grayLoading, setGrayLoading] = useState(false);
  const [randomLoading, setRandomLoading] = useState(false);

  const handleGrayscale = () => {
    if (!ctx) return;
    const canvas = ctx.canvas;

    setGrayLoading(true);
    setTimeout(() => {
      try {
        convertToGrayscale(ctx, canvas.width, canvas.height);
      } finally {
        setGrayLoading(false);
      }
    }, 0);
  };

  const handleColorRandomGrayscale = () => {
    if (!ctx) return;
    const canvas = ctx.canvas;

    setRandomLoading(true);
    setTimeout(() => {
      try {
        convertToRandomizedGrayscale(ctx, canvas.width, canvas.height);
      } finally {
        setRandomLoading(false);
      }
    }, 0);
  }

  return (
    <>
      <Stack direction="row" gap="4" align="center">
        <Button onClick={handleGrayscale} loading={grayLoading}>
          Grayscale
        </Button>
        <Button onClick={handleColorRandomGrayscale} loading={randomLoading}>
          Randomized Grayscale
        </Button>
      </Stack>
    </>
  );
};

export default ToolBar;
