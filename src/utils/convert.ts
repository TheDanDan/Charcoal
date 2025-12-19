const BATCH_SIZE = 100;

export function convertToGrayscale(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number
): void {
  const imageData = ctx.getImageData(0, 0, width, height);
  const data = imageData.data;

  function processBatch(yIndex: number = 0): void {
    const endIndex = Math.min(yIndex + BATCH_SIZE, height);

    for (let y = yIndex; y < endIndex; y++) {
      for (let x = 0; x < width; x++) {
        const i = (y * width + x) * 4;
        const r = data[i] / 255;
        const g = data[i + 1] / 255;
        const b = data[i + 2] / 255;
        const luminance = srgbToLuminanceGrayscale(r, g, b);
        const gray = Math.round(luminance * 255);
        data[i] = gray;
        data[i + 1] = gray;
        data[i + 2] = gray;
      }
    }

    yIndex += BATCH_SIZE;
    ctx.putImageData(imageData, 0, 0);
    if (yIndex < height) {
      setTimeout(() => processBatch(yIndex), 0);
    }
  }
  processBatch(0);
}

function getLinearToRandomSRGB(): number[][][] {
  const SRGBValues: number[][][] = Array.from({ length: 256 }, () => []);

  for (let R_srgb = 0; R_srgb <= 255; R_srgb++) {
    for (let G_srgb = 0; G_srgb <= 255; G_srgb++) {
      for (let B_srgb = 0; B_srgb <= 255; B_srgb++) {
        const r = R_srgb / 255;
        const g = G_srgb / 255;
        const b = B_srgb / 255;

        const luminance = srgbToLuminanceGrayscale(r, g, b);
        const index = Math.round(luminance * 255);

        SRGBValues[index].push([R_srgb, G_srgb, B_srgb]);
      }
    }
  }

  return SRGBValues;
}

export function convertToRandomizedGrayscale(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number
): void {
  const imageData = ctx.getImageData(0, 0, width, height);
  const data = imageData.data;

  const SRGBValues = getLinearToRandomSRGB();

  function processBatch(yIndex: number = 0): void {
    const endIndex = Math.min(yIndex + BATCH_SIZE, height);

    for (let y = yIndex; y < endIndex; y++) {
      for (let x = 0; x < width; x++) {
        const i = (y * width + x) * 4;
        const index = data[i];

        const candidates = SRGBValues[index];
        if (candidates.length > 0) {
          const randomIdx = getRandomValue(0, candidates.length - 1);
          const [R_srgb, G_srgb, B_srgb] = candidates[randomIdx];
          data[i] = R_srgb;
          data[i + 1] = G_srgb;
          data[i + 2] = B_srgb;
        }
      }
    }

    yIndex += BATCH_SIZE;
    ctx.putImageData(imageData, 0, 0);
    if (yIndex < height) {
      setTimeout(() => processBatch(yIndex), 0);
    }
  }
  processBatch(0);
}

const getRandomValue = (min: number, max: number): number => {
  const range = max - min + 1;

  const uint32 = new Uint32Array(1);
  window.crypto.getRandomValues(uint32);

  return min + (uint32[0] % range);
};

function srgbToLinear(C_srgb: number): number {
  if (C_srgb <= 0.04045) {
    return C_srgb / 12.92;
  } else {
    return Math.pow((C_srgb + 0.055) / 1.055, 2.4);
  }
}

function linearToSRGB(Y_linear: number): number {
  if (Y_linear <= 0.0031308) {
    return Y_linear * 12.92;
  } else {
    return 1.055 * Math.pow(Y_linear, 1.0 / 2.4) - 0.055;
  }
}

function srgbToLuminanceGrayscale(
  R_srgb: number,
  G_srgb: number,
  B_srgb: number
): number {
  const R_linear = srgbToLinear(R_srgb);
  const G_linear = srgbToLinear(G_srgb);
  const B_linear = srgbToLinear(B_srgb);
  const Y_linear = 0.2126 * R_linear + 0.7152 * G_linear + 0.0722 * B_linear;
  const Y_srgb = linearToSRGB(Y_linear);
  return Math.max(0.0, Math.min(1.0, Y_srgb));
}
