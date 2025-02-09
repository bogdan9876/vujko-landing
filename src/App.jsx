import Header from "./sections/Header.jsx";
import Hero from "./sections/Hero.jsx";
import Features from "./sections/Features.jsx";
import Faq from "./sections/Faq.jsx";
import ThreeDModel from "./sections/ThreeDModel.jsx";
import Download from "./sections/Download.jsx";
import Footer from "./sections/Footer.jsx";

const App = () => {
  return (
    <main className="overflow-hidden">
      <Header />
      <Hero />
      <Features />
      <Faq />
      <ThreeDModel />
      <Download />
      <Footer />
    </main>
  );
};

export default App;
