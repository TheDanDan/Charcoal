import FaultyTerminal from './FaultyTerminal';

const Background = () => {
  return (
    <div className="w-screen h-screen fixed inset-0 z-0 flex justify-center items-center">
      <FaultyTerminal
        scale={4}
        gridMul={[2, 1]}
        digitSize={3}
        timeScale={0.5}
        pause={false}
        scanlineIntensity={0.2}
        glitchAmount={1}
        flickerAmount={1}
        noiseAmp={0.8}
        chromaticAberration={0}
        dither={0.2}
        curvature={0.1}
        tint="#a4a4a4"
        mouseReact={true}
        mouseStrength={0.5}
        pageLoadAnimation={false}
        brightness={0.75}
      />
    </div>
  );
};

export default Background;
