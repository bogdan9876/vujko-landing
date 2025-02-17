import { useState } from "react";
import { socials } from "../constants/index.jsx";
import Button from "../components/Button.jsx";

const Footer = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    text: ""
  });
  const [statusMessage, setStatusMessage] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

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
        name
        setStatusMessage("Виникла помилка при відправці даних.");
      }
    } catch (error) {
      console.error("Помилка:", error);
      setStatusMessage("Помилка з'єднання.");
    }
  };

  return (
    <footer>
      <div className="container py-10">
        <div className="flex flex-1 flex-col items-center justify-center gap-5 max-md:w-full">
          <div className="flex flex-col items-center gap-2">
          <h3 className="text-xl mb-5">Залишіть свої дані</h3>
          </div> 
        </div>
        <div className="flex flex-1 items-center justify-center max-md:w-full max-md:mt-10">
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-4 w-full max-w-md"
          >
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Ваше ім'я"
              className="p-3 border border-gray-300 rounded-xl cursor-pointer"
              required
            />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Ваша електронна пошта"
              className="p-3 border border-gray-300 rounded-xl cursor-pointer"
              required
            />
            <textarea
              type="text"
              name="text"
              value={formData.text}
              onChange={handleInputChange}
              placeholder="Ваше запитання"
              className="p-3 border border-gray-300 rounded-xl cursor-pointer resize-none"
              required
            />
            <Button
              type="submit"
              className="mt-4 p-3 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
              Надіслати
            </Button>
            {statusMessage && (
              <p className="mt-4 text-center text-lg">{statusMessage}</p>
            )}
          </form>
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
              contact@vujko.net
            </p>
          </div>
          <ul className="flex flex-1 justify-center gap-3 max-md:mt-10 md:justify-end">
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
    </footer>
  );
};

export default Footer;
