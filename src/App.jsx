import Header from "./sections/Header.jsx";
import Hero from "./sections/Hero.jsx";
import Features from "./sections/Features.jsx";
import Faq from "./sections/Faq.jsx";
import Manuals from "./sections/Manuals.jsx";
import WebSite from "./sections/WebSite.jsx";
import Footer from "./sections/Footer.jsx";

const App = () => {
  return (
    <main className="overflow-hidden">
      <Header />
      <Hero />
      <Features />
      <Manuals />
      <WebSite />
      <Faq />
      <Footer />
    </main>
  );
};

export default App;
