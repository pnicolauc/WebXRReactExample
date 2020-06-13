import React, { useState, useCallback } from "react";
import { Hover, Select, DefaultXRControllers, ARCanvas } from "react-xr";
import "./styles.css";

function Box({ color, size, scale, children, ...rest }) {
  return (
    <mesh scale={scale} {...rest}>
      <boxBufferGeometry attach="geometry" args={size} />
      <meshPhongMaterial attach="material" color={color} />
      {children}
    </mesh>
  );
}

function Button(props) {
  const [hover, setHover] = useState(false);
  const [color, setColor] = useState("blue");

  const onSelect = useCallback(() => {
    setColor((Math.random() * 0xffffff) | 0);
  }, [setColor]);

  return (
    <Select onSelect={onSelect}>
      <Hover onChange={setHover}>
        <Box
          color={color}
          scale={hover ? [0.6, 0.6, 0.6] : [0.5, 0.5, 0.5]}
          size={[0.4, 0.1, 0.1]}
          {...props}
        >
          Hello react-xr!
        </Box>
      </Hover>
    </Select>
  );
}

function App() {
  return (
    <ARCanvas sRGB>
      <ambientLight />
      <pointLight position={[10, 10, 10]} />
      <Button position={[0, 0.1, -0.2]} />
      <DefaultXRControllers />
    </ARCanvas>
  );
}

export default App;
