import React from "react";
import { Element } from "react-scroll";
import { FaDownload } from "react-icons/fa";

const manuals = [
  {
    title: "Повний мануал",
    description: "Загальний опис пристроя",
    file: "/manuals/Datasheet_4_2_3.pdf",
  },
  {
    title: "Технічний мануал",
    description: "Інструкція для 3Д моделі",
    file: "/manuals/Tech_manual_4_2_3.pdf",
  },
  {
    title: "Користувацький мануал",
    description: "Ще один корисний файл",
    file: "/manuals/User_manual_4_2_3.pdf",
  },
];

const Manuals = () => {
  return (
    <section>
      <Element name="Мануали">
        <section className="relative z-2 py-24 md:py-28 lg:py-30">
          <div className="container">
            <div className="mb-12 text-center">
              <p className="caption mb-2 text-[#2EF2FF]">Мануали</p>
              <h3 className="h3 text-white">Завантаження Мануалу</h3>
            </div>
            <div className="flex flex-col md:flex-row justify-center items-center gap-4">
              {manuals.map((manual, index) => (
                <React.Fragment key={index}>
                  <a
                    href={manual.file}
                    download
                    className="group block rounded-xl bg-[#0c1838] p-6 shadow-lg transition hover:bg-[#2EF2FF22] border border-[#2EF2FF44] w-64"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="text-lg font-semibold text-white group-hover:text-[#2EF2FF]">
                        {manual.title}
                      </h4>
                      <FaDownload className="text-[#2EF2FF] group-hover:scale-110 transition" />
                    </div>
                    <p className="text-sm text-gray-300">{manual.description}</p>
                  </a>

                  {(index === 0 || index === 1) && (
                    <span className="text-2xl font-bold text-white md:mx-2 md:block hidden">
                      {index === 0 ? "=" : "+"}
                    </span>
                  )}

                  {(index === 0 || index === 1) && (
                    <span className="text-2xl font-bold text-white md:hidden">
                      {index === 0 ? "=" : "+"}
                    </span>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>
        </section>
      </Element>
    </section>
  );
};

export default Manuals;
