import { useState } from "react";
import { socials } from "../constants/index.jsx";

const Footer = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
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
      const response = await fetch('https://script.google.com/macros/s/AKfycbz_63N8xhoNzUDw8fTpZvTU4x7CwHhsXlvU6EE8CCtdbgt_16b6gDlvAm_dcTGNgwZ1/exec', {
        method: 'POST',
        headers: {
          'Content-Type': 'text/plain;charset=utf-8',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
        }),
      });
  
      if (response.ok) {
        setStatusMessage("Дані успішно надіслані!");
        setFormData({ name: "", email: "" });
      } else {
        setStatusMessage("Виникла помилка при відправці даних.");
      }
    } catch (error) {
      console.log('Error:', error);
      setStatusMessage("Помилка з'єднання.");
    }
  };

  return (
    <footer>
      <div className="container py-10">
        <div className="flex w-full max-md:flex-col">
          <div className="flex flex-1 flex-col items-center justify-center gap-5 max-md:w-full">
            <div className="flex flex-col items-center gap-2">
              <p className="text-xl text-aligh">Контакти:</p>
              <p className="text-p5 transition-all duration-500 hover:text-p1 overflow-hidden whitespace-normal break-words">
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

          <div className="flex flex-1 items-center justify-center max-md:w-full max-md:mt-10">
            <form
              onSubmit={handleSubmit}
              className="flex flex-col gap-4 w-full max-w-md"
            >
              <h3 className="text-xl mb-5">Залишіть свої дані</h3>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Ваше ім'я"
                className="p-3 border border-gray-300 rounded-md"
                required
              />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Ваша електронна пошта"
                className="p-3 border border-gray-300 rounded-md"
                required
              />
              <button
                type="submit"
                className="mt-4 p-3 bg-blue-500 text-white rounded-md hover:bg-blue-600"
              >
                Надіслати
              </button>
              {statusMessage && (
                <p className="mt-4 text-center text-lg">{statusMessage}</p>
              )}
            </form>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
