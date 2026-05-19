"use client";

import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

type GlobePoint = {
  lat: number;
  lon: number;
  color: string;
};

const travelPoints: GlobePoint[] = [
  { lat: 35.0116, lon: 135.7681, color: "#60a5fa" },
  { lat: 64.9631, lon: -19.0208, color: "#f59e0b" },
  { lat: 38.7223, lon: -9.1393, color: "#34d399" },
  { lat: 31.6295, lon: -7.9811, color: "#f97316" }
];

function toVector3(lat: number, lon: number, radius: number) {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lon + 180) * (Math.PI / 180);
  return new THREE.Vector3(
    -(radius * Math.sin(phi) * Math.cos(theta)),
    radius * Math.cos(phi),
    radius * Math.sin(phi) * Math.sin(theta)
  );
}

export function TravelGlobe() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const points = useMemo(() => travelPoints, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const scene = new THREE.Scene();
    scene.fog = new THREE.Fog(0x03111f, 6, 18);

    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
    camera.position.set(0, 0, 6.4);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x03111f, 0);
    renderer.domElement.style.touchAction = "none";
    renderer.domElement.style.pointerEvents = "auto";
    renderer.domElement.style.cursor = "grab";
    container.appendChild(renderer.domElement);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enablePan = false;
    controls.enableZoom = false;
    controls.rotateSpeed = 0.35;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 0.6;

    const globeGroup = new THREE.Group();
    scene.add(globeGroup);

    globeGroup.add(
      new THREE.Mesh(
        new THREE.SphereGeometry(2.2, 64, 64),
        new THREE.MeshStandardMaterial({ color: 0x0b1d2f, roughness: 0.7, metalness: 0.15, emissive: 0x07203a, emissiveIntensity: 0.2 })
      )
    );

    globeGroup.add(
      new THREE.Mesh(
        new THREE.SphereGeometry(2.33, 64, 64),
        new THREE.MeshBasicMaterial({ color: 0x2dd4bf, transparent: true, opacity: 0.08 })
      )
    );

    globeGroup.add(
      new THREE.Mesh(
        new THREE.SphereGeometry(2.24, 32, 32),
        new THREE.MeshBasicMaterial({ color: 0x63b3ff, wireframe: true, transparent: true, opacity: 0.12 })
      )
    );

    scene.add(new THREE.AmbientLight(0xffffff, 1.8));
    const directional = new THREE.DirectionalLight(0xffffff, 2.8);
    directional.position.set(4, 3, 5);
    scene.add(directional);

    points.forEach((point) => {
      const marker = new THREE.Mesh(
        new THREE.SphereGeometry(0.05, 14, 14),
        new THREE.MeshStandardMaterial({ color: new THREE.Color(point.color), emissive: new THREE.Color(point.color), emissiveIntensity: 0.7 })
      );
      marker.position.copy(toVector3(point.lat, point.lon, 2.25));
      globeGroup.add(marker);
    });

    const resize = () => {
      const { clientWidth, clientHeight } = container;
      camera.aspect = clientWidth / clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(clientWidth, clientHeight, false);
    };

    const handlePointerDown = (event: PointerEvent) => {
      controls.autoRotate = false;
      const startX = event.clientX;
      const startRotation = globeGroup.rotation.y;

      const handlePointerMove = (moveEvent: PointerEvent) => {
        globeGroup.rotation.y = startRotation + (moveEvent.clientX - startX) * 0.01;
      };

      const handlePointerUp = () => {
        controls.autoRotate = true;
        window.removeEventListener("pointermove", handlePointerMove);
        window.removeEventListener("pointerup", handlePointerUp);
      };

      window.addEventListener("pointermove", handlePointerMove);
      window.addEventListener("pointerup", handlePointerUp);
    };

    container.addEventListener("pointerdown", handlePointerDown);
    resize();
    window.addEventListener("resize", resize);

    let frame = 0;
    const animate = () => {
      frame = window.requestAnimationFrame(animate);
      controls.update();
      globeGroup.rotation.x = Math.sin(Date.now() * 0.0005) * 0.08;
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("resize", resize);
      container.removeEventListener("pointerdown", handlePointerDown);
      container.removeChild(renderer.domElement);
      controls.dispose();
      renderer.dispose();
      scene.clear();
    };
  }, [points]);

  return <div ref={containerRef} className="h-full w-full touch-none" aria-label="Interactive travel globe" />;
}
