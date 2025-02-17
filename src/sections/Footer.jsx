import { useState } from "react";
import { socials } from "../constants/index.jsx";

const Footer = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Тут можна обробити форму, наприклад, відправити на сервер або використати Google Forms
    console.log(formData);
  };

  return (
    <footer>
      <div className="container py-10">
        <div className="flex w-full max-md:flex-col">
          <div className="flex flex-1 flex-col items-center justify-center gap-5 max-md:w-full">
            <div className="flex flex-col items-center gap-2">
              <p className="text-xl text-aligh">Контакти:</p>
              <p className="legal-after text-p5 transition-all duration-500 hover:text-p1">
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
            </form>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
