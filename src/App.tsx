import './App.css';
import WelcomeText from './components/WelcomeText';
import { Provider } from '@/components/ui/provider';
import FileDropZone from './components/FileDropZone';
import Background from './components/Background';
import { useCallback, useState } from 'react';
import ImageView from './components/ImageView';

function App() {
  const [imageFile, setImageFile] = useState<File | null>(null);

  const handleFileChange = useCallback((imageFile: File | null) => {
    setImageFile(imageFile);
  }, []);

  return (
    <>
      <Provider forcedTheme="dark">
        <Background />
        <div
          className="w-screen h-screen fixed inset-0 z-10 flex justify-center items-center"
          style={{ pointerEvents: 'none' }}
        >
          <div className="flex flex-col justify-center items-center">
            <div
              style={{
                color: '#a4a4a4',
                fontFamily: 'monospace',
                fontSize: '1.5rem',
              }}
            >
              <WelcomeText />
            </div>
            <div
              style={{ pointerEvents: 'auto' }}
              className="w-full flex flex-col justify-center items-center"
            >
              {!imageFile && (
                <FileDropZone handleFileChange={handleFileChange} />
              )}
              {imageFile && <ImageView image={imageFile} />}
            </div>
          </div>
        </div>
      </Provider>
    </>
  );
}

export default App;
