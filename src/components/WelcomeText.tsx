import DecryptedText from './DecryptedText';

const WelcomeText = () => (
    <div style={{ textAlign: "center", padding: "2rem" }}>
        <h1>
            <DecryptedText
                text="Obscure your Images"
                animateOn="view"
                speed={200}
                maxIterations={30}
            />
        </h1>
        <DecryptedText
            text="Drop a file to start"
            animateOn="view"
            speed={200}
            maxIterations={30}
        />
    </div>
);

export default WelcomeText;