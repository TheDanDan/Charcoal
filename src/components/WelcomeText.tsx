import DecryptedText from './DecryptedText';

const WelcomeText = () => (
  <div style={{ textAlign: 'center', padding: '2rem' }}>
    <h1 className="m-10">
      <DecryptedText
        text="Obscure your Images"
        animateOn="view"
        speed={50}
        maxIterations={20}
        sequential={true}
      />
    </h1>
  </div>
);

export default WelcomeText;
