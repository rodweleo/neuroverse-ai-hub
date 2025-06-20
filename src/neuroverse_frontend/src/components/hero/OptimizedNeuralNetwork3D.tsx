
import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { Cpu } from 'lucide-react';

const OptimizedNeuralNetwork3D = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene>();
  const rendererRef = useRef<THREE.WebGLRenderer>();
  const animationRef = useRef<number>();
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

    // Optimized scene setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
    camera.position.z = 8;

    const renderer = new THREE.WebGLRenderer({ 
      alpha: true, 
      antialias: false, // Disable for performance
      powerPreference: "high-performance"
    });
    renderer.setSize(400, 400); // Smaller size for better performance
    renderer.setClearColor(0x000000, 0);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)); // Limit pixel ratio
    rendererRef.current = renderer;
    mountRef.current.appendChild(renderer.domElement);

    // Simplified network structure
    const nodes: THREE.Mesh[] = [];
    const connections: THREE.Line[] = [];

    // Fewer layers for performance
    const layers = [
      { count: 4, y: 2, z: 0 },
      { count: 6, y: 0, z: -1 },
      { count: 4, y: -2, z: 0 }
    ];

    const nodeGeometry = new THREE.SphereGeometry(0.1, 16, 16); // Lower detail
    
    layers.forEach((layer, layerIndex) => {
      for (let i = 0; i < layer.count; i++) {
        const nodeMaterial = new THREE.MeshBasicMaterial({
          color: layerIndex % 2 === 0 ? 0x00F0FF : 0x9B5DE5,
          transparent: true,
          opacity: 0.8
        });
        
        const node = new THREE.Mesh(nodeGeometry, nodeMaterial);
        const x = (i - layer.count / 2 + 0.5) * 1.5;
        node.position.set(x, layer.y, layer.z);
        
        scene.add(node);
        nodes.push(node);
      }
    });

    // Simplified connections
    let nodeIndex = 0;
    for (let layerIndex = 0; layerIndex < layers.length - 1; layerIndex++) {
      const currentLayerStart = nodeIndex;
      const currentLayerEnd = nodeIndex + layers[layerIndex].count;
      const nextLayerStart = currentLayerEnd;
      const nextLayerEnd = nextLayerStart + layers[layerIndex + 1].count;

      for (let i = currentLayerStart; i < currentLayerEnd; i++) {
        for (let j = nextLayerStart; j < nextLayerEnd; j++) {
          if (Math.random() > 0.5) { // Fewer connections
            const points = [nodes[i].position, nodes[j].position];
            const geometry = new THREE.BufferGeometry().setFromPoints(points);
            const material = new THREE.LineBasicMaterial({
              color: 0x00FF85,
              transparent: true,
              opacity: 0.3
            });
            
            const line = new THREE.Line(geometry, material);
            scene.add(line);
            connections.push(line);
          }
        }
      }
      nodeIndex += layers[layerIndex].count;
    }

    // Simplified animation with reduced frame rate
    let lastTime = 0;
    const targetFPS = 30;
    const frameInterval = 1000 / targetFPS;

    const animate = (currentTime: number) => {
      animationRef.current = requestAnimationFrame(animate);

      if (currentTime - lastTime < frameInterval) return;
      lastTime = currentTime;

      const time = currentTime * 0.001;

      // Simple rotation
      scene.rotation.y = Math.sin(time * 0.2) * 0.1;

      // Simplified node animation
      nodes.forEach((node, index) => {
        const nodeTime = time + index * 0.2;
        const pulse = 1 + Math.sin(nodeTime * 2) * 0.1;
        node.scale.setScalar(pulse);
      });

      renderer.render(scene, camera);
    };

    animate(0);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      
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

  // Fallback component for low-performance devices
  if (showFallback) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <div className="text-center space-y-6">
          <div className="relative w-32 h-32 mx-auto">
            <div className="absolute inset-0 bg-gradient-to-r from-neon-blue/20 via-neon-purple/20 to-acid-green/20 rounded-full animate-pulse"></div>
            <div className="absolute inset-4 bg-gradient-to-r from-neon-blue/40 via-neon-purple/40 to-acid-green/40 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
            <div className="absolute inset-8 bg-gradient-to-r from-neon-blue/60 via-neon-purple/60 to-acid-green/60 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <Cpu className="h-12 w-12 text-neon-blue animate-pulse" />
            </div>
          </div>
          <div className="text-sm text-muted-foreground">
            Neural Network Visualization
          </div>
        </div>
      </div>
    );
  }

  return (
    <div 
      ref={mountRef} 
      className="w-full h-full flex items-center justify-center"
    />
  );
};

export default OptimizedNeuralNetwork3D;
