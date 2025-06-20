
import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { Bot } from 'lucide-react';

const HolographicRobot3D = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene>();
  const rendererRef = useRef<THREE.WebGLRenderer>();
  const robotRef = useRef<THREE.Group>();
  const animationRef = useRef<number>();
  const mouseRef = useRef({ x: 0, y: 0 });
  const [isLowPerformance, setIsLowPerformance] = useState(false);
  const [showFallback, setShowFallback] = useState(false);

  useEffect(() => {
    // Performance detection
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    const hasLowMemory = (navigator as any).deviceMemory && (navigator as any).deviceMemory < 4;

    if (!gl || isMobile || hasLowMemory) {
      setIsLowPerformance(true);
      setShowFallback(true);
      return;
    }

    if (!mountRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
    camera.position.set(0, 0, 10);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "high-performance"
    });
    renderer.setSize(600, 600);
    renderer.setClearColor(0x000000, 0);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    rendererRef.current = renderer;
    mountRef.current.appendChild(renderer.domElement);

    // Lighting setup for holographic effect
    const ambientLight = new THREE.AmbientLight(0x404040, 0.4);
    scene.add(ambientLight);

    const pointLight1 = new THREE.PointLight(0x00F0FF, 1, 100);
    pointLight1.position.set(10, 10, 10);
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0x9B5DE5, 0.8, 100);
    pointLight2.position.set(-10, -10, 10);
    scene.add(pointLight2);

    const pointLight3 = new THREE.PointLight(0x00FF85, 0.6, 100);
    pointLight3.position.set(0, 10, -10);
    scene.add(pointLight3);

    // Create holographic robot
    const robot = new THREE.Group();
    robotRef.current = robot;

    // Robot materials with holographic effect
    const holographicMaterial = new THREE.MeshPhongMaterial({
      color: 0x00F0FF,
      transparent: true,
      opacity: 0.8,
      emissive: 0x001122,
      shininess: 100
    });

    const accentMaterial = new THREE.MeshPhongMaterial({
      color: 0x9B5DE5,
      transparent: true,
      opacity: 0.9,
      emissive: 0x110022,
      shininess: 100
    });

    // Robot head
    const headGeometry = new THREE.BoxGeometry(2, 2, 2);
    const head = new THREE.Mesh(headGeometry, holographicMaterial);
    head.position.y = 3;
    robot.add(head);

    // Robot eyes
    const eyeGeometry = new THREE.SphereGeometry(0.2, 16, 16);
    const eyeMaterial = new THREE.MeshPhongMaterial({
      color: 0x00FF85,
      emissive: 0x00FF85,
      emissiveIntensity: 0.5
    });

    const leftEye = new THREE.Mesh(eyeGeometry, eyeMaterial);
    leftEye.position.set(-0.5, 3.2, 0.8);
    robot.add(leftEye);

    const rightEye = new THREE.Mesh(eyeGeometry, eyeMaterial);
    rightEye.position.set(0.5, 3.2, 0.8);
    robot.add(rightEye);

    // Robot body
    const bodyGeometry = new THREE.CylinderGeometry(1.5, 1.8, 3, 8);
    const body = new THREE.Mesh(bodyGeometry, holographicMaterial);
    body.position.y = 0;
    robot.add(body);

    // Robot arms
    const armGeometry = new THREE.CylinderGeometry(0.3, 0.4, 2, 8);
    const leftArm = new THREE.Mesh(armGeometry, accentMaterial);
    leftArm.position.set(-2.2, 0.5, 0);
    leftArm.rotation.z = Math.PI / 6;
    robot.add(leftArm);

    const rightArm = new THREE.Mesh(armGeometry, accentMaterial);
    rightArm.position.set(2.2, 0.5, 0);
    rightArm.rotation.z = -Math.PI / 6;
    robot.add(rightArm);

    // Robot legs
    const legGeometry = new THREE.CylinderGeometry(0.4, 0.5, 2.5, 8);
    const leftLeg = new THREE.Mesh(legGeometry, accentMaterial);
    leftLeg.position.set(-0.7, -2.5, 0);
    robot.add(leftLeg);

    const rightLeg = new THREE.Mesh(legGeometry, accentMaterial);
    rightLeg.position.set(0.7, -2.5, 0);
    robot.add(rightLeg);

    // Particle system for holographic effect
    const particleGeometry = new THREE.BufferGeometry();
    const particleCount = 100;
    const positions = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i++) {
      positions[i] = (Math.random() - 0.5) * 20;
    }

    particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    const particleMaterial = new THREE.PointsMaterial({
      color: 0x00F0FF,
      size: 0.2,
      transparent: true,
      opacity: 0.6
    });

    const particles = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particles);

    // Mouse interaction
    const handleMouseMove = (event: MouseEvent) => {
      const rect = renderer.domElement.getBoundingClientRect();
      mouseRef.current.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouseRef.current.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
    };

    renderer.domElement.addEventListener('mousemove', handleMouseMove);

    // Animation loop
    const animate = (time: number) => {
      animationRef.current = requestAnimationFrame(animate);

      const t = time * 0.001;

      if (robotRef.current) {
        // Base floating animation
        robotRef.current.position.y = Math.sin(t * 2) * 0.2;

        // Mouse interaction
        const targetRotationY = mouseRef.current.x * 0.3;
        const targetRotationX = mouseRef.current.y * 0.2;

        robotRef.current.rotation.y += (targetRotationY - robotRef.current.rotation.y) * 0.05;
        robotRef.current.rotation.x += (targetRotationX - robotRef.current.rotation.x) * 0.05;

        // Robot parts animation
        const head = robotRef.current.children[0];
        if (head) {
          head.rotation.y = Math.sin(t * 3) * 0.1;
        }

        // Arms animation
        const leftArm = robotRef.current.children[3];
        const rightArm = robotRef.current.children[4];
        if (leftArm && rightArm) {
          leftArm.rotation.z = Math.PI / 6 + Math.sin(t * 2) * 0.2;
          rightArm.rotation.z = -Math.PI / 6 - Math.sin(t * 2) * 0.2;
        }
      }

      // Animate particles
      particles.rotation.y = t * 0.1;

      // Animate lights
      pointLight1.position.x = Math.sin(t) * 15;
      pointLight1.position.z = Math.cos(t) * 15;

      pointLight2.position.x = Math.cos(t * 1.5) * 12;
      pointLight2.position.z = Math.sin(t * 1.5) * 12;

      renderer.render(scene, camera);
    };

    animate(0);

    // Handle resize
    const handleResize = () => {
      const size = Math.min(window.innerWidth * 0.6, 600);
      camera.aspect = 1;
      camera.updateProjectionMatrix();
      renderer.setSize(size, size);
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }

      if (renderer.domElement) {
        renderer.domElement.removeEventListener('mousemove', handleMouseMove);
      }

      window.removeEventListener('resize', handleResize);

      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }

      renderer.dispose();

      scene.traverse((object) => {
        if (object instanceof THREE.Mesh) {
          object.geometry.dispose();
          if (Array.isArray(object.material)) {
            object.material.forEach(material => material.dispose());
          } else {
            object.material.dispose();
          }
        }
      });
    };
  }, []);

  // Fallback for low-performance devices
  if (showFallback) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <div className="text-center space-y-6">
          <div className="relative w-48 h-48 mx-auto">
            <div className="absolute inset-0 bg-gradient-to-r from-neon-blue/20 via-neon-purple/20 to-acid-green/20 rounded-full animate-pulse"></div>
            <div className="absolute inset-8 bg-gradient-to-r from-neon-blue/40 via-neon-purple/40 to-acid-green/40 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
            <div className="absolute inset-16 bg-gradient-to-r from-neon-blue/60 via-neon-purple/60 to-acid-green/60 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <Bot className="h-24 w-24 text-neon-blue animate-pulse" />
            </div>
          </div>
          <div className="text-sm text-muted-foreground">
            Holographic AI Assistant
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      ref={mountRef}
      className="w-full h-full flex items-center justify-center cursor-pointer"
    />
  );
};

export default HolographicRobot3D;
