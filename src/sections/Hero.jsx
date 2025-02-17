import { Element, Link as LinkScroll } from "react-scroll";
import Button from "../components/Button.jsx";

const Hero = () => {
  return (
    <section className="relative pt-60 pb-40 max-lg:pt-52 max-lg:pb-36 max-md:pt-36 max-md:pb-32">
      <Element name="hero">
        <div className="container grid grid-cols-2 items-center gap-8 max-lg:grid-cols-1">
          <div className="relative z-2 max-w-512 max-lg:max-w-388">
            <div className="caption small-2 uppercase text-p3">ПЛАТА ІНІЦІАЦІЇ</div>
            <h1 className="mb-6 h1 text-p4 uppercase max-lg:mb-7 max-lg:h2 max-md:mb-4 max-md:text-5xl max-md:leading-12">
              ВУЙКО
            </h1>
            <p className="max-w-440 mb-14 body-1 max-md:mb-10">
              Електронний пристрій ініціації боєприпасу VUJKO. Це детонатор подвійного
              призначення з можливістю динамічного веб-налаштування, який можна використовувати в поєднанні з
              БПЛА FPV як бортовий пристрій
            </p>
            <Button icon="/images/zap.svg" href="https://www.linkedin.com/company/vujko/">Замовити</Button>
          </div>
          <div className="flex justify-center max-lg:mt-10">
            <img src="/images/art.png" className="size-500 max-lg:h-auto" alt="hero" />
          </div>
        </div>
      </Element>
    </section>
  );
};

export default Hero;