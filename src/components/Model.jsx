import { useState, useEffect } from "react";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";

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
    return (
      <mesh>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="red" />
      </mesh>
    );
  }

  return <primitive object={model} />;
};

export default Model;
