import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { Element } from "react-scroll";
import Model from "../components/Model.jsx";

const ThreeDModel = () => {
  return (
    <Element name="ЗД Модель">
      <section className="relative z-2 py-24 md:py-28 lg:py-30">
        <div className="container block lg:flex py-30">
          <div className="testimonials_head-res relative z-2 mr-20 flex-300">
            <p className="caption mb-5 max-md:mb-2.5">3д Модель</p>
            <h3 className="h3 max-md:h5 text-p4">Вуйко в 3Д</h3>
          </div>

          <div className="relative -my-12 -mr-3 flex-50 items-start max-lg:static max-md:block">
            <Suspense fallback={<div>Loading 3D model...</div>}>
              <Canvas style={{ height: "500px", width: "100%" }}>
                <ambientLight intensity={0.8} />
                <directionalLight position={[10, 10, 10]} intensity={0.8} />
                <OrbitControls minDistance={1} maxDistance={10} />
                <Model />
              </Canvas>
            </Suspense>
          </div>
        </div>
      </section>
    </Element>
  );
};

export default ThreeDModel;
