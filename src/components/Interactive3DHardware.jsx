import React, { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';
import { Cpu, Radio, Zap, Layers, RefreshCw, Sparkles, Eye } from 'lucide-react';
import { sound } from '../utils/audio';

export const Interactive3DHardware = ({ theme = 'indigo' }) => {
  const mountRef = useRef(null);
  const [activePin, setActivePin] = useState(0);
  const [isRotating, setIsRotating] = useState(true);
  const [interactionHint, setInteractionHint] = useState(true);

  const pins = [
    {
      id: 0,
      title: "ESP32-S3 Dual-Core SoC",
      subtitle: "Deterministic FreeRTOS Core",
      desc: "Dual 240MHz Xtensa cores managing preemptive serial polling, circular interrupt queues, and sub-5ms dispenser authorization.",
      icon: Cpu,
      pos: "Center Core"
    },
    {
      id: 1,
      title: "RS-485 Modbus-RTU Transceiver",
      subtitle: "Differential Telemetry Engine",
      desc: "Hardware-isolated differential transceiver polling industrial flow meters and registers with strict CRC-16 frame verification.",
      icon: Zap,
      pos: "Left Header"
    },
    {
      id: 2,
      title: "LoRa SX1262 Subsystem",
      subtitle: "868MHz Wireless Forecourt Link",
      desc: "Eliminates civil trenching costs across petrol stations with canopy-penetrating long-range RF telemetry packets.",
      icon: Radio,
      pos: "Top Trace Antenna"
    },
    {
      id: 3,
      title: "16MB Flash NVS Ring Buffer",
      subtitle: "Brownout Zero-Data-Loss Cache",
      desc: "Dual-stage commit manager preserving unsent telemetry transactions across power fluctuations until MQTT PUBACK confirmation.",
      icon: Layers,
      pos: "Right IC"
    }
  ];

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Palette Colors based on Theme
    const isBronze = theme === 'bronze';
    const primaryColor = isBronze ? 0xf59e0b : 0x6366f1;
    const secondaryColor = isBronze ? 0xea580c : 0x38bdf8;
    const pcbBaseColor = isBronze ? 0x16171b : 0x0c0e17;
    const traceColor = isBronze ? 0xd97706 : 0x4f46e5;
    const chipColor = 0x181a20;

    // 1. Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const width = container.clientWidth || 400;
    const height = container.clientHeight || 340;

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 4.5, 7.5);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    // 2. Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.2);
    scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(primaryColor, 3.5);
    dirLight1.position.set(5, 8, 4);
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(secondaryColor, 2.5);
    dirLight2.position.set(-5, 4, -3);
    scene.add(dirLight2);

    const pointLight = new THREE.PointLight(primaryColor, 4, 10);
    pointLight.position.set(0, 1.2, 0);
    scene.add(pointLight);

    // 3. 3D Board Master Group
    const boardGroup = new THREE.Group();
    scene.add(boardGroup);

    // 3a. Main PCB Substrate
    const pcbGeo = new THREE.BoxGeometry(4.8, 0.15, 3.6);
    const pcbMat = new THREE.MeshStandardMaterial({
      color: pcbBaseColor,
      roughness: 0.35,
      metalness: 0.4,
    });
    const pcbMesh = new THREE.Mesh(pcbGeo, pcbMat);
    boardGroup.add(pcbMesh);

    // 3b. PCB Copper Perimeter Edge
    const edgeGeo = new THREE.BoxGeometry(4.9, 0.08, 3.7);
    const edgeMat = new THREE.MeshStandardMaterial({
      color: traceColor,
      roughness: 0.2,
      metalness: 0.8,
    });
    const edgeMesh = new THREE.Mesh(edgeGeo, edgeMat);
    edgeMesh.position.y = -0.02;
    boardGroup.add(edgeMesh);

    // 3c. Main ESP32-S3 Microcontroller Chip (Center)
    const espGeo = new THREE.BoxGeometry(1.6, 0.25, 1.6);
    const espMat = new THREE.MeshStandardMaterial({
      color: chipColor,
      roughness: 0.2,
      metalness: 0.85,
    });
    const espMesh = new THREE.Mesh(espGeo, espMat);
    espMesh.position.set(0, 0.15, 0);
    boardGroup.add(espMesh);

    // Metallic Heat Shield Lid
    const shieldGeo = new THREE.BoxGeometry(1.3, 0.06, 1.3);
    const shieldMat = new THREE.MeshStandardMaterial({
      color: isBronze ? 0xc7923e : 0xa0aec0,
      roughness: 0.15,
      metalness: 0.95,
    });
    const shieldMesh = new THREE.Mesh(shieldGeo, shieldMat);
    shieldMesh.position.set(0, 0.3, 0);
    boardGroup.add(shieldMesh);

    // 3d. RS-485 Modbus Terminal Connector (Left side)
    const rs485Geo = new THREE.BoxGeometry(0.6, 0.5, 1.4);
    const rs485Mat = new THREE.MeshStandardMaterial({
      color: isBronze ? 0x22c55e : 0x059669,
      roughness: 0.5,
    });
    const rs485Mesh = new THREE.Mesh(rs485Geo, rs485Mat);
    rs485Mesh.position.set(-2.0, 0.25, 0.4);
    boardGroup.add(rs485Mesh);

    // 3e. LoRa RF Subsystem & Trace Antenna (Top Edge)
    const loraGeo = new THREE.BoxGeometry(1.4, 0.2, 0.8);
    const loraMat = new THREE.MeshStandardMaterial({
      color: 0x27272a,
      roughness: 0.3,
      metalness: 0.7,
    });
    const loraMesh = new THREE.Mesh(loraGeo, loraMat);
    loraMesh.position.set(-0.8, 0.15, -1.3);
    boardGroup.add(loraMesh);

    // Antenna trace rod
    const antGeo = new THREE.CylinderGeometry(0.04, 0.04, 1.8, 16);
    const antMat = new THREE.MeshStandardMaterial({
      color: isBronze ? 0xf59e0b : 0x38bdf8,
      metalness: 0.9,
      roughness: 0.1,
    });
    const antMesh = new THREE.Mesh(antGeo, antMat);
    antMesh.rotation.z = Math.PI / 2;
    antMesh.position.set(0.6, 0.18, -1.5);
    boardGroup.add(antMesh);

    // 3f. Flash Memory NVS Chip (Right side)
    const flashGeo = new THREE.BoxGeometry(0.8, 0.2, 0.6);
    const flashMat = new THREE.MeshStandardMaterial({
      color: chipColor,
      roughness: 0.3,
      metalness: 0.7,
    });
    const flashMesh = new THREE.Mesh(flashGeo, flashMat);
    flashMesh.position.set(1.6, 0.15, 0.6);
    boardGroup.add(flashMesh);

    // 3g. Blinking Telemetry LEDs
    const ledGeo = new THREE.SphereGeometry(0.08, 16, 16);
    const ledMat1 = new THREE.MeshBasicMaterial({ color: 0x10b981 });
    const led1 = new THREE.Mesh(ledGeo, ledMat1);
    led1.position.set(1.8, 0.15, -1.2);
    boardGroup.add(led1);

    const ledMat2 = new THREE.MeshBasicMaterial({ color: primaryColor });
    const led2 = new THREE.Mesh(ledGeo, ledMat2);
    led2.position.set(1.8, 0.15, -0.9);
    boardGroup.add(led2);

    // 3h. Orbiting Telemetry Data Beams
    const particleCount = 28;
    const particleGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      const angle = (i / particleCount) * Math.PI * 2;
      const radius = 2.6 + Math.sin(i) * 0.4;
      positions[i * 3] = Math.cos(angle) * radius;
      positions[i * 3 + 1] = 0.2 + (i % 3) * 0.15;
      positions[i * 3 + 2] = Math.sin(angle) * radius;
    }
    particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const particleMat = new THREE.PointsMaterial({
      color: primaryColor,
      size: 0.12,
      transparent: true,
      opacity: 0.85,
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    boardGroup.add(particles);

    // Initial board tilt for ideal perspective view
    boardGroup.rotation.x = 0.65;
    boardGroup.rotation.y = -0.55;

    // 4. Mouse Orbit Dragging & Interaction
    let isDragging = false;
    let prevMousePos = { x: 0, y: 0 };
    let targetRotation = { x: 0.65, y: -0.55 };

    const onMouseDown = (e) => {
      isDragging = true;
      setInteractionHint(false);
      prevMousePos = { x: e.clientX, y: e.clientY };
    };

    const onMouseMove = (e) => {
      if (!isDragging) return;
      const deltaX = e.clientX - prevMousePos.x;
      const deltaY = e.clientY - prevMousePos.y;

      targetRotation.y += deltaX * 0.008;
      targetRotation.x = Math.max(0.2, Math.min(1.2, targetRotation.x + deltaY * 0.008));

      prevMousePos = { x: e.clientX, y: e.clientY };
    };

    const onMouseUp = () => {
      isDragging = false;
    };

    // Touch support for mobile devices
    const onTouchStart = (e) => {
      if (e.touches.length === 1) {
        isDragging = true;
        setInteractionHint(false);
        prevMousePos = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      }
    };

    const onTouchMove = (e) => {
      if (!isDragging || e.touches.length !== 1) return;
      const deltaX = e.touches[0].clientX - prevMousePos.x;
      const deltaY = e.touches[0].clientY - prevMousePos.y;

      targetRotation.y += deltaX * 0.008;
      targetRotation.x = Math.max(0.2, Math.min(1.2, targetRotation.x + deltaY * 0.008));

      prevMousePos = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    };

    const onTouchEnd = () => {
      isDragging = false;
    };

    const dom = renderer.domElement;
    dom.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
    dom.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('touchmove', onTouchMove, { passive: true });
    window.addEventListener('touchend', onTouchEnd);

    // 5. Animation Loop
    let animId;
    const startTime = performance.now();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const elapsed = (performance.now() - startTime) * 0.001;

      // Gentle auto-rotation when user is not dragging
      if (!isDragging && isRotating) {
        targetRotation.y += 0.003;
      }

      // Smooth damping interpolation
      boardGroup.rotation.y += (targetRotation.y - boardGroup.rotation.y) * 0.08;
      boardGroup.rotation.x += (targetRotation.x - boardGroup.rotation.x) * 0.08;

      // Floating wave animation
      boardGroup.position.y = Math.sin(elapsed * 1.5) * 0.12;

      // Orbiting telemetry particles
      particles.rotation.y = elapsed * 0.5;

      // Blinking LEDs
      led1.material.opacity = 0.4 + Math.sin(elapsed * 8) * 0.6;
      led2.material.opacity = 0.4 + Math.cos(elapsed * 6) * 0.6;

      renderer.render(scene, camera);
    };

    animate();

    // 6. Responsive Resize Handler
    const handleResize = () => {
      if (!container) return;
      const newW = container.clientWidth;
      const newH = container.clientHeight;
      camera.aspect = newW / newH;
      camera.updateProjectionMatrix();
      renderer.setSize(newW, newH);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animId);
      dom.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      dom.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', onTouchEnd);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
      if (container && dom.parentNode === container) {
        container.removeChild(dom);
      }
    };
  }, [theme, isRotating]);

  const active = pins[activePin];
  const Icon = active.icon;

  return (
    <div className="glass-panel rounded-2xl border border-white/10 p-5 space-y-4 relative overflow-hidden">
      {/* Header bar */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/5 pb-3">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-cyan-500/15 border border-cyan-500/30 text-cyan-300">
            <Cpu className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-white font-bold text-xs font-mono">
                Interactive 3D Hardware Telemetry Core
              </span>
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            </div>
            <span className="text-[10px] text-slate-400 font-mono">
              Three.js WebGL • 60 FPS • Drag 360° to rotate
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              sound.playClick();
              setIsRotating(prev => !prev);
            }}
            className={`px-2.5 py-1 rounded-lg text-[11px] font-mono border transition-all cursor-pointer flex items-center gap-1 ${
              isRotating
                ? 'bg-cyan-500/15 border-cyan-500/30 text-cyan-300'
                : 'bg-white/5 border-white/10 text-slate-400'
            }`}
          >
            <RefreshCw className={`w-3 h-3 ${isRotating ? 'animate-spin' : ''}`} />
            <span>{isRotating ? 'Auto-Rotate ON' : 'Paused'}</span>
          </button>
        </div>
      </div>

      {/* 3D Canvas Viewport */}
      <div className="relative w-full h-[260px] sm:h-[300px] rounded-xl bg-obsidian-900/60 border border-white/5 flex items-center justify-center cursor-grab active:cursor-grabbing overflow-hidden">
        <div ref={mountRef} className="w-full h-full" />

        {/* Interaction Hint Overlay */}
        {interactionHint && (
          <div className="absolute bottom-3 left-3 pointer-events-none px-3 py-1.5 rounded-xl bg-obsidian-950/80 border border-white/10 text-[11px] font-mono text-cyan-300 flex items-center gap-2 backdrop-blur-md animate-pulse">
            <Eye className="w-3.5 h-3.5" />
            <span>Click & drag to rotate 3D PCB in real-time</span>
          </div>
        )}

        {/* Selected Component Badge */}
        <div className="absolute top-3 right-3 px-3 py-1.5 rounded-xl bg-obsidian-950/80 border border-white/10 text-[11px] font-mono text-slate-200 backdrop-blur-md flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
          <span>{active.pos}</span>
        </div>
      </div>

      {/* Component Selector Tabs */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        {pins.map((pin) => {
          const isSelected = activePin === pin.id;
          const PinIcon = pin.icon;
          return (
            <button
              key={pin.id}
              onClick={() => {
                sound.playClick();
                setActivePin(pin.id);
              }}
              className={`p-2.5 rounded-xl text-left transition-all cursor-pointer border ${
                isSelected
                  ? 'bg-cyan-500/15 border-cyan-500/40 text-white shadow-glow-cyan'
                  : 'bg-white/5 border-white/5 text-slate-400 hover:text-slate-200 hover:bg-white/10'
              }`}
            >
              <div className="flex items-center gap-1.5">
                <PinIcon className={`w-3.5 h-3.5 ${isSelected ? 'text-cyan-400' : 'text-slate-500'}`} />
                <span className="font-bold text-[11px] truncate">{pin.title.split(' ')[0]}</span>
              </div>
              <span className="text-[10px] text-slate-400 block truncate mt-0.5">{pin.pos}</span>
            </button>
          );
        })}
      </div>

      {/* Active Component Deep Dive Specs */}
      <div className="p-3.5 rounded-xl bg-obsidian-900 border border-white/5 space-y-1.5 animate-in fade-in duration-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-mono font-bold text-cyan-300">
            <Icon className="w-4 h-4 text-cyan-400" />
            <span>{active.title}</span>
          </div>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
            {active.subtitle}
          </span>
        </div>
        <p className="text-xs text-slate-300 font-sans leading-relaxed">
          {active.desc}
        </p>
      </div>
    </div>
  );
};
