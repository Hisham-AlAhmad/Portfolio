import About from "./About/About";
import Header from "./Header/Header";
import Certificates from "./Certificates/Certificates";
import Contact from "./Contact/Contact";
import Hyperspeed from "./Hyperspeed/Hyperspeed";
import { UseTheme } from "./Hooks/ThemeProvider";
import ClickSpark from "./ClickSpark/ClickSpark";

const Home = () => {
    const { theme, setTheme } = UseTheme();

    return (
        <>
            <ClickSpark>
                <Header />
            </ClickSpark>

            <ClickSpark sparkColor="var(--primary)">
                <About />
            </ClickSpark>

            <ClickSpark sparkColor="var(--light)">
                <Certificates />
            </ClickSpark>

            <ClickSpark sparkColor="var(--text-primary)">
                <Contact />
            </ClickSpark>

            <ClickSpark sparkColor="var(--light)">
                <Hyperspeed theme={theme} />
            </ClickSpark>
        </>
    );
}

export default Home;