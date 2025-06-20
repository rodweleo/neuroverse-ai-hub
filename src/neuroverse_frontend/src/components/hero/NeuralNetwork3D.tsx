
import { useEffect, useRef } from 'react';
import * as THREE from 'three';

const NeuralNetwork3D = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene>();
  const rendererRef = useRef<THREE.WebGLRenderer>();
  const animationRef = useRef<number>();

  useEffect(() => {
    if (!mountRef.current) return;

    // Scene setup with larger canvas
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
    camera.position.z = 12;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(600, 600);
    renderer.setClearColor(0x000000, 0);
    rendererRef.current = renderer;
    mountRef.current.appendChild(renderer.domElement);

    // Enhanced blockchain-like structure with more layers
    const nodes: THREE.Mesh[] = [];
    const connections: THREE.Line[] = [];
    const blocks: THREE.Mesh[] = [];

    // More complex neural network layers
    const layers = [
      { count: 6, y: 4, z: 0 },
      { count: 8, y: 2, z: -2 },
      { count: 10, y: 0, z: 0 },
      { count: 8, y: -2, z: 2 },
      { count: 6, y: -4, z: 0 }
    ];

    const nodeGeometry = new THREE.SphereGeometry(0.12, 32, 32);
    
    layers.forEach((layer, layerIndex) => {
      for (let i = 0; i < layer.count; i++) {
        const nodeMaterial = new THREE.MeshBasicMaterial({
          color: layerIndex % 3 === 0 ? 0x00F0FF : layerIndex % 3 === 1 ? 0x9B5DE5 : 0x00FF85,
          transparent: true,
          opacity: 0.9
        });
        
        const node = new THREE.Mesh(nodeGeometry, nodeMaterial);
        const x = (i - layer.count / 2 + 0.5) * 2;
        node.position.set(x, layer.y, layer.z);
        
        // Enhanced glow effect
        const glowGeometry = new THREE.SphereGeometry(0.2, 32, 32);
        const glowMaterial = new THREE.MeshBasicMaterial({
          color: nodeMaterial.color,
          transparent: true,
          opacity: 0.4
        });
        const glow = new THREE.Mesh(glowGeometry, glowMaterial);
        node.add(glow);
        
        // Add pulsing ring around nodes
        const ringGeometry = new THREE.RingGeometry(0.25, 0.3, 32);
        const ringMaterial = new THREE.MeshBasicMaterial({
          color: nodeMaterial.color,
          transparent: true,
          opacity: 0.6,
          side: THREE.DoubleSide
        });
        const ring = new THREE.Mesh(ringGeometry, ringMaterial);
        ring.lookAt(camera.position);
        node.add(ring);
        
        scene.add(node);
        nodes.push(node);
      }
    });

    // Create blockchain-like cubes floating around
    for (let i = 0; i < 15; i++) {
      const blockGeometry = new THREE.BoxGeometry(0.3, 0.3, 0.3);
      const blockMaterial = new THREE.MeshBasicMaterial({
        color: Math.random() > 0.5 ? 0x00F0FF : 0x9B5DE5,
        transparent: true,
        opacity: 0.7,
        wireframe: true
      });
      const block = new THREE.Mesh(blockGeometry, blockMaterial);
      
      block.position.set(
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 12,
        (Math.random() - 0.5) * 8
      );
      
      block.rotation.set(
        Math.random() * Math.PI,
        Math.random() * Math.PI,
        Math.random() * Math.PI
      );
      
      scene.add(block);
      blocks.push(block);
    }

    // Enhanced connections with data flow effect
    let nodeIndex = 0;
    for (let layerIndex = 0; layerIndex < layers.length - 1; layerIndex++) {
      const currentLayerStart = nodeIndex;
      const currentLayerEnd = nodeIndex + layers[layerIndex].count;
      const nextLayerStart = currentLayerEnd;
      const nextLayerEnd = nextLayerStart + layers[layerIndex + 1].count;

      for (let i = currentLayerStart; i < currentLayerEnd; i++) {
        for (let j = nextLayerStart; j < nextLayerEnd; j++) {
          if (Math.random() > 0.3) { // Not all connections to avoid clutter
            const points = [
              nodes[i].position,
              nodes[j].position
            ];
            
            const geometry = new THREE.BufferGeometry().setFromPoints(points);
            const material = new THREE.LineBasicMaterial({
              color: 0x00FF85,
              transparent: true,
              opacity: 0.4
            });
            
            const line = new THREE.Line(geometry, material);
            scene.add(line);
            connections.push(line);
          }
        }
      }
      nodeIndex += layers[layerIndex].count;
    }

    // More particles for enhanced effect
    const particleGeometry = new THREE.BufferGeometry();
    const particleCount = 200;
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 30;
      positions[i + 1] = (Math.random() - 0.5) * 20;
      positions[i + 2] = (Math.random() - 0.5) * 15;
      
      // Random neon colors
      const color = new THREE.Color();
      color.setHex(Math.random() > 0.5 ? 0x00F0FF : Math.random() > 0.5 ? 0x9B5DE5 : 0x00FF85);
      colors[i] = color.r;
      colors[i + 1] = color.g;
      colors[i + 2] = color.b;
    }

    particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particleGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    
    const particleMaterial = new THREE.PointsMaterial({
      size: 0.1,
      transparent: true,
      opacity: 0.8,
      vertexColors: true
    });

    const particles = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particles);

    // Enhanced animation
    const animate = () => {
      animationRef.current = requestAnimationFrame(animate);

      const time = Date.now() * 0.001;

      // Rotate the entire network more dynamically
      scene.rotation.y = Math.sin(time * 0.3) * 0.2;
      scene.rotation.x = Math.cos(time * 0.2) * 0.1;

      // Animate nodes with more complex patterns
      nodes.forEach((node, index) => {
        const nodeTime = time + index * 0.1;
        const scale = 1 + Math.sin(nodeTime * 3) * 0.3;
        
        if (node.children[0]) {
          node.children[0].scale.setScalar(scale);
        }
        
        // Pulse rings
        if (node.children[1]) {
          node.children[1].scale.setScalar(1 + Math.sin(nodeTime * 2) * 0.2);
          node.children[1].rotation.z += 0.02;
        }
        
        // Main node pulse
        const pulse = 1 + Math.sin(nodeTime * 4) * 0.15;
        node.scale.setScalar(pulse);
        
        // Floating motion
        node.position.y += Math.sin(nodeTime) * 0.002;
      });

      // Animate blockchain cubes
      blocks.forEach((block, index) => {
        block.rotation.x += 0.01;
        block.rotation.y += 0.015;
        block.rotation.z += 0.008;
        
        // Floating motion
        block.position.y += Math.sin(time + index) * 0.005;
      });

      // Enhanced connection animation
      connections.forEach((connection, index) => {
        const material = connection.material as THREE.LineBasicMaterial;
        const connectionTime = time * 2 + index * 0.1;
        material.opacity = 0.2 + Math.sin(connectionTime) * 0.3;
      });

      // Animate particles with wave motion
      const positions = particles.geometry.attributes.position.array as Float32Array;
      for (let i = 1; i < positions.length; i += 3) {
        positions[i] += Math.sin(time + i) * 0.01;
      }
      particles.geometry.attributes.position.needsUpdate = true;
      
      particles.rotation.y += 0.002;
      particles.rotation.x += 0.001;

      renderer.render(scene, camera);
    };

    animate();

    // Handle resize
    const handleResize = () => {
      if (mountRef.current) {
        const size = Math.min(mountRef.current.clientWidth, 600);
        renderer.setSize(size, size);
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
      
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
      
      renderer.dispose();
      
      // Clean up geometries and materials
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

  return (
    <div 
      ref={mountRef} 
      className="w-full h-full flex items-center justify-center"
    />
  );
};

export default NeuralNetwork3D;
