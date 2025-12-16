import { useEffect } from "react";

const ImageView = ({ image }: { image: string }) => {
    useEffect(() => {
        const canvas = document.getElementById('imageCanvas') as HTMLCanvasElement;
        const ctx = canvas.getContext('2d');
        const img = new Image();

        if (image) {
        img.src = image;
        img.onload = () => {
            if (ctx) {
            const imageWidth = img.naturalWidth;
            const imageHeight = img.naturalHeight;

            canvas.width = imageWidth;
            canvas.height = imageHeight;

            ctx.clearRect(0, 0, imageWidth, imageHeight);
            ctx.drawImage(img, 0, 0, imageWidth, imageHeight);
            }
        };
        }
    }, [image]);

    return (
        <div className="flex items-center justify-center">
        <canvas id="imageCanvas" style={{ maxWidth: '70vw', maxHeight: '80vh' }}></canvas>
      </div>
    );
}

export default ImageView;