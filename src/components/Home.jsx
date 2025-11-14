import About from "./About/About";
import Header from "./Header/Header";
import Certificates from "./Certificates/Certificates";
import Contact from "./Contact/Contact";
import Hyperspeed from "./Hyperspeed/Hyperspeed";
import { UseTheme } from "./Hooks/ThemeProvider";

const Home = () => {
    const { theme, setTheme } = UseTheme();

    return (
        <>
            <Header />
            <About />
            <Certificates />
            <Contact />
            <Hyperspeed theme={theme} />
        </>
    );
}

export default Home;