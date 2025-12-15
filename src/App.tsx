import './App.css'
import FaultyTerminal from './components/FaultyTerminal'
import WelcomeText from './components/WelcomeText'
import { Provider } from "@/components/ui/provider"
import FileDropZone from './components/FileDropZone'

function App() {

  return (
    <>
    <Provider>
      <div className='w-screen h-screen fixed inset-0 z-0 flex justify-center items-center'>
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

      <div
        className='w-screen h-screen fixed inset-0 z-10 flex justify-center items-center' 
        style={{ pointerEvents: 'none' }} 
      >
        <div className='flex flex-col justify-center items-center'>
          <div style={{color: '#a4a4a4', fontFamily: 'monospace', fontSize: '1.5rem'}}> 
            <WelcomeText />
          </div>
          <div style={{ pointerEvents: 'auto' }} className='w-full flex flex-col justify-center items-center'>
            <FileDropZone />
          </div>
        </div>
      </div>
    </Provider>
    </>
  )
}

export default App