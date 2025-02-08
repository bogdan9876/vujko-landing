import { useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";
import { Suspense } from "react";
import { testimonials } from "../constants/index.jsx";
import TestimonialItem from "../components/TestimonialItem.jsx";

const Model = () => {
  const [model, setModel] = useState(null);

  useEffect(() => {
    const loader = new OBJLoader();

    loader.load(
      "images/vujko.obj",
      (obj) => {
        obj.scale.set(0.7, 0.7, 0.7);
        obj.position.set(0, 0, 0);
        setModel(obj);
      },
      undefined,
      (error) => {
        console.error("Error loading model:", error);
      }
    );
  }, []);

  if (!model) {
    return <mesh>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="red" />
      </mesh>;
  }

  return <primitive object={model} />;
};

const Testimonials = () => {
  const halfLength = Math.floor(testimonials.length / 2);

  return (
    <section className="relative z-2 py-24 md:py-28 lg:py-30">
      <div className="container block lg:flex">
        <div className="testimonials_head-res relative z-2 mr-20 flex-300">
          <p className="caption mb-5 max-md:mb-2.5">3д Модель</p>
          <h3 className="h3 max-md:h5 text-p4">Вуйко в 3Д</h3>
        </div>

        <div className="relative -my-12 -mr-3 flex-50 items-start max-lg:static max-md:block">
          <Suspense fallback={<div>Loading 3D model...</div>}>
            <Canvas style={{ height: "500px", width: "100%" }}>
              <ambientLight intensity={1} />
              <directionalLight position={[10, 10, 10]} intensity={2} />
              <OrbitControls minDistance={1} maxDistance={10} />
              <Model />
            </Canvas>
          </Suspense>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
