import * as THREE from 'three';
import { useRef, useEffect, useState } from 'react';
import { useGLTF, useAnimations } from '@react-three/drei';
import { useThree } from '@react-three/fiber';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

const DemoComputer = (props) => {
  const group = useRef();
  const { nodes, materials, animations } = useGLTF('/models/computer.glb');
  const { actions } = useAnimations(animations, group);
  const { gl } = useThree();

  const [videoTexture, setVideoTexture] = useState(null);

  const videoRef = useRef(null);

  const textureSrc = props.texture ?? '/textures/project/project.mp4';

  useEffect(() => {
    if (videoRef.current) {
      const prev = videoRef.current;
      prev.pause();
      prev.removeAttribute('src');   
      prev.load();                   
      videoRef.current = null;
    }

    const video = document.createElement('video');
    video.src = textureSrc;
    video.crossOrigin = 'anonymous';
    video.loop = true;
    video.muted = true;
    video.playsInline = true;
    videoRef.current = video;

    const onLoaded = () => {
      const tex = new THREE.VideoTexture(video);
      tex.flipY = false;                         
      tex.colorSpace = gl.outputColorSpace;      

      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
        });
      }

      setVideoTexture(tex);
    };

    video.addEventListener('loadedmetadata', onLoaded, { once: true });
    video.load();

    return () => {
      video.removeEventListener('loadedmetadata', onLoaded);
      video.pause();
      video.removeAttribute('src');
      video.load();
    };
  }, [textureSrc]); 
  const prevTextureRef = useRef(null);
  useEffect(() => {
    const prev = prevTextureRef.current;
    if (prev && prev !== videoTexture) {
      prev.dispose();
    }
    prevTextureRef.current = videoTexture;
  }, [videoTexture]);
  useGSAP(() => {
    if (!group.current || !videoTexture) return;
    gsap.from(group.current.rotation, {
      y: Math.PI / 2,
      duration: 1,
      ease: 'power3.out',
    });
  }, [videoTexture]);

  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Scene">

        <mesh
          name="monitor-screen"
          geometry={nodes['monitor-screen'].geometry}
          material={nodes['monitor-screen'].material}
          position={[0.127, 1.831, 0.511]}
          rotation={[1.571, -0.005, 0.031]}
          scale={[0.661, 0.608, 0.401]}
        >
          {videoTexture && (
            <meshBasicMaterial map={videoTexture} toneMapped={false} />
          )}
        </mesh>

        <group name="RootNode" position={[0, 1.093, 0]} rotation={[-Math.PI / 2, 0, -0.033]} scale={0.045}>
          {Array.from({ length: 149 }, (_, i) => {
            const n = String(i + 1).padStart(3, '0');
            const name = i === 0 ? 'Screen001' : `Screen${n}`;
            return (
              <group
                key={name}
                name={name}
                position={[5.658, i === 0 ? 1.643 : 1.644, 0.812]}
                rotation={[Math.PI / 2, 0, 0]}
                scale={[0.923, 0.855, 0.855]}
              />
            );
          })}
          <group name="Tower-light-007" position={[16.089, -3.47, -14.495]} rotation={[Math.PI / 2, 0, 0]} scale={0.963} />
          <group name="Tower-light-008" position={[15.155, -3.47, -14.495]} rotation={[Math.PI / 2, 0, 0]} scale={0.963} />
        </group>

        <group
          name="Monitor-B-_computer_0"
          position={[0.266, 1.132, 0.051]}
          rotation={[0, -0.033, 0]}
          scale={[0.042, 0.045, 0.045]}
        >
          <mesh name="Monitor-B-_computer_0_1" geometry={nodes['Monitor-B-_computer_0_1'].geometry} material={materials.computer} />
          <mesh name="Monitor-B-_computer_0_2" geometry={nodes['Monitor-B-_computer_0_2'].geometry} material={materials.base__0} />
          <mesh name="Monitor-B-_computer_0_3" geometry={nodes['Monitor-B-_computer_0_3'].geometry} material={materials.Material_36} />
          <mesh name="Monitor-B-_computer_0_4" geometry={nodes['Monitor-B-_computer_0_4'].geometry} material={materials.Material_35} />
          <mesh name="Monitor-B-_computer_0_5" geometry={nodes['Monitor-B-_computer_0_5'].geometry} material={materials.Material_34} />
          <mesh name="Monitor-B-_computer_0_6" geometry={nodes['Monitor-B-_computer_0_6'].geometry} material={materials.keys} />
          <mesh name="Monitor-B-_computer_0_7" geometry={nodes['Monitor-B-_computer_0_7'].geometry} material={materials.keys2} />
          <mesh name="Monitor-B-_computer_0_8" geometry={nodes['Monitor-B-_computer_0_8'].geometry} material={materials.Material_37} />
        </group>

      </group>
    </group>
  );
};

useGLTF.preload('/models/computer.glb');

export default DemoComputer;