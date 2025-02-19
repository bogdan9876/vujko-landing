import { Element } from "react-scroll";
import { links } from "../constants/index.jsx";
import { Marker } from "../components/Marker.jsx";

const Download = () => {
  return (
    <section>
      <Element
        name="Конфігурація"
        className="g7 relative pb-32 pt-24 max-lg:pb-24 max-md:py-16"
        spy={false}
      >
        <div className="container">
          <div className="flex items-center">
            <div className="relative flex-540 max-xl:flex-280 max-lg:flex256 max-md:flex-100">
              <div className="mb-5">
                <h3 className="h3 max-lg:h4 max-md:h5 z-3 relative ml-0 mb-7 max-w-lg text-p4 max-md:mb-11 max-sm:max-w-sm">
                  Сайт конфігурації
                </h3>
              </div>

              <p className="body-1 mb-10 max-w-md">
                Адаптивний сайт конфігурації під будь-який пристрій
              </p>

              <ul className="flex flex-wrap items-center gap-4">
                {links.map(({ id, url, icon }) => (
                  <li
                    key={id}
                    className="download_tech-link download_tech-link_last-before download_tech-link_last-after"
                  >
                    <a
                      href={url}
                      className="size-22 download_tech-icon_before relative flex items-center justify-center rounded-half border-2 border-s3 bg-s1 transition-borderColor duration-500"
                    >
                      <span className="absolute -top-2 rotate-90">
                        <Marker />
                      </span>
                      <img
                        src={"/images/lines.svg"}
                        alt="lines"
                        className="absolute size-13/20 object-contain"
                      />
                      <span className="download_tech-icon">{icon}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mb-10 max-md:hidden">
              <div className="download_preview-before download_preview-after rounded-40 relative w-[955px] border-2 border-s5 p-6">
                <div className="relative rounded-3xl bg-s1 px-6 pb-6 pt-14">
                  <span className="download_preview-dot left-6 bg-p2" />
                  <span className="download_preview-dot left-11 bg-s3" />
                  <span className="download_preview-dot left-16 bg-p1/15" />

                  <iframe
                    src="/vujko/custom.htm"
                    width="855"
                    height="655"
                    className="rounded-xl border-0"
                    title="custom preview"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </Element>
    </section>
  );
};
export default Download;
