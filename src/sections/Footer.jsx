import { Element } from "react-scroll";
import { useState } from "react";
import { socials } from "../constants/index.jsx";

const Footer = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    text: ""
  });
  const [statusMessage, setStatusMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsSubmitting(true);

    try {
      const response = await fetch(
        "https://script.google.com/macros/s/AKfycbysHe2ONOG6M-zgyhnK28fAgEkvPWkdvXu3U9vfM7Ya9Tm8gCRPwDCO4Z2xsjgahN-zPQ/exec",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: new URLSearchParams(formData).toString(),
        }
      );

      if (response.ok) {
        setStatusMessage("Дані успішно надіслані!");
        setFormData({ name: "", email: "", text: "" });
      } else {
        setStatusMessage("Виникла помилка при відправці даних.");
      }
    } catch (error) {
      console.error("Помилка:", error);
      setStatusMessage("Помилка з'єднання.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section>
      <Element name="Зв'язатись">
        <div className="container py-5">
          <div className="flex flex-col max-md:flex-col max-md:items-center">
            <div className="flex flex-1 flex-col items-center justify-center gap-5 max-md:w-full max-md:order-first">
              <div className="flex flex-col items-center gap-2">
                <h3 className="h4 mb-5">Залишіть свої дані</h3>
              </div>
            </div>
            <div className="flex flex-1 items-center justify-center max-md:w-full max-md:mt-10 mb-5">
              <form
                onSubmit={handleSubmit}
                className="flex flex-col gap-4 w-full max-w-md"
              >
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Ваше ім'я/Позивний"
                  className="p-3 border border-gray-300 rounded-xl cursor-pointer bg-white text-black"
                  required
                />
                <input
                  type="text"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Telegram/Signal"
                  className="p-3 border border-gray-300 rounded-xl cursor-pointer bg-white text-black"
                  required
                />
                <textarea
                  type="text"
                  name="text"
                  value={formData.text}
                  onChange={handleInputChange}
                  placeholder="Ваше запитання"
                  className="p-3 border border-gray-300 rounded-xl cursor-pointer resize-none bg-white text-black"
                  required
                />
                <button
                  type="submit"
                  className="relative rounded-2xl shadow-500 group no-underline"
                  disabled={isSubmitting}
                >
                  <span className="relative flex items-center justify-center min-h-[60px] px-6 g4 rounded-2xl overflow-hidden group-hover:before:opacity-100">
                    <span className="relative z-2 font-poppins base-bold text-p1 uppercase text-center">
                      {isSubmitting ? (
                        <div className="w-6 h-6 border-4 border-t-transparent border-blue-500 rounded-full animate-spin"></div>
                      ) : (
                        "Надіслати"
                      )}
                    </span>
                  </span>
                  <span className="absolute inset-0 bg-black opacity-0 group-hover:opacity-30 transition-opacity duration-300 rounded-2xl" />
                  <span className="glow-before glow-after" />
                </button>
                {statusMessage && (
                  <p className="mt-4 text-center text-lg">{statusMessage}</p>
                )}
              </form>
            </div>
          </div>
          <div className="flex w-full max-md:flex-col">
            <div className="small-compact flex flex-1 flex-wrap items-center justify-center gap-5">
              <p className="text-xl">Контакти</p>
            </div>
            <div className="flex items-center justify-center sm:ml-auto">
              <p className="legal-after relative mr-9 text-p5 transition-all duration-500 hover:text-p1">
                +380 98 004 14 11
              </p>
              <p className="text-p5 transition-all duration-500 hover:text-p1">
                vladislavvanyuk@gmail.com
              </p>
            </div>
            <ul className="flex flex-1 justify-center gap-3 max-md:mt-10 md:justify-center">
              {socials.map(({ id, url, icon, title }) => (
                <li key={id}>
                  <a href={url} className="social-icon">
                    <img
                      src={icon}
                      alt={title}
                      className="size-3/5 object-contain"
                    />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Element>
    </section>
  );
};

export default Footer;
