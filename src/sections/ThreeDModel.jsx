import { Element } from "react-scroll";
import { FaDownload } from "react-icons/fa";

const manuals = [
  {
    title: "Мануал",
    description: "Загальний опис пристроя",
    file: "/manuals/Datasheet_4_2_2.pdf",
  },
  {
    title: "Мануал #2",
    description: "Інструкція для 3Д моделі",
    file: "/manuals/manual2.pdf",
  },
  {
    title: "Мануал #3",
    description: "Ще один корисний файл",
    file: "/manuals/manual3.zip",
  },
];

const ThreeDModel = () => {
  return (
    <Element name="Мануали">
      <section className="relative z-2 py-24 md:py-28 lg:py-30">
        <div className="container">
          <div className="mb-12 text-center">
            <p className="caption mb-2 text-[#2EF2FF]">Мануали</p>
            <h3 className="h3 text-white">Завантаження Мануалу</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {manuals.map((manual, index) => (
              <a
                key={index}
                href={manual.file}
                download
                className="group block rounded-xl bg-[#0c1838] p-6 shadow-lg transition hover:bg-[#2EF2FF22] border border-[#2EF2FF44]"
              >
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-lg font-semibold text-white group-hover:text-[#2EF2FF]">
                    {manual.title}
                  </h4>
                  <FaDownload className="text-[#2EF2FF] group-hover:scale-110 transition" />
                </div>
                <p className="text-sm text-gray-300">{manual.description}</p>
              </a>
            ))}
          </div>
        </div>
      </section>
    </Element>
  );
};

export default ThreeDModel;
