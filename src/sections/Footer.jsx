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
        setFormData({ firstName: "", email: "" , text: ""});
      } else {firstName
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
