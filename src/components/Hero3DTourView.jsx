import React, { useEffect, useRef, useState, useCallback } from 'react';
import * as THREE from 'three';
import { 
  ChevronLeft, 
  ChevronRight, 
  Download, 
  ExternalLink, 
  FileText, 
  Copy, 
  Check, 
  X, 
  Terminal,
  Activity,
  Sparkles,
  Layers,
  ArrowRight,
  BookOpen,
  Briefcase,
  Code2,
  Cpu,
  MapPin,
  Clock,
  ShieldCheck,
  Building2,
  Maximize2
} from 'lucide-react';
import { portfolioData } from '../data/portfolioData';
import { sound } from '../utils/audio';

// Specific building locations and dedicated camera zoom angles for each station
const CAMPUS_STATIONS = [
  {
    id: 'overview',
    pill: 'Highlights',
    category: 'CAMPUS OVERVIEW',
    buildingName: 'Smart City & Distributed Grid',
    subtitle: 'High-throughput edge-to-cloud pipelines across industrial fuel networks',
    description: portfolioData.identity.tagline,
    metrics: [
      { label: 'BPCL STATIONS', value: '100+' },
      { label: 'ESD LATENCY', value: '<1s' }
    ],
    // Panoramic aerial isometric view
    camPos: [24, 28, 30],
    target: [0, 2.5, 0],
    buildingPos: [0, 0, 0],
    landmarkIcon: 'shield'
  },
  {
    id: 'projects',
    pill: 'Projects',
    category: 'FLAGSHIP ARCHITECTURE',
    buildingName: 'BPCL CGD Innovation Complex',
    subtitle: 'Angular 20, Python Flask microservices & ESP32 Modbus RTU firmware',
    description: 'The industrial telemetry nerve-center monitoring 100+ Retail Outlets, processing daily custody-transfer gas volume conversions (SCM/MMBTU), and streaming emergency alerts over WebSockets.',
    metrics: [
      { label: 'GAS RECONCILIATION', value: '100%' },
      { label: 'STATE RETENTION', value: 'Zero Loss' }
    ],
    // Close-up zoomed camera framing the stepped Engineering Tower
    camPos: [-1.5, 9.5, -0.5],
    target: [-5.5, 4.5, -5.5],
    buildingPos: [-5.5, 0, -5.5],
    landmarkIcon: 'monitor'
  },
  {
    id: 'skills',
    pill: 'Ideas Lab',
    category: 'TECH ARSENAL',
    buildingName: 'Hardware & IoT Systems Lab',
    subtitle: 'Python, C++, TypeScript, Azure AKS, Docker, Modbus RTU, LoRa',
    description: 'Advanced engineering laboratory spanning low-level microcontroller register configuration (ESP-IDF) to containerized cloud microservices orchestrated on Azure Kubernetes Service.',
    metrics: [
      { label: 'CORE LANGUAGES', value: 'Python • C++' },
      { label: 'CLOUD & EDGE', value: 'AKS • ESP-IDF' }
    ],
    // Close-up zoomed camera framing the modern L-shaped R&D Lab
    camPos: [-1.8, 10.2, 8.8],
    target: [-6.0, 4.2, 5.0],
    buildingPos: [-6.0, 0, 5.0],
    landmarkIcon: 'lightbulb'
  },
  {
    id: 'experience',
    pill: 'Growth Track',
    category: 'CAREER TIMELINE',
    buildingName: 'ConnectSecure Enterprise Tower',
    subtitle: 'Software Engineer • ConnectSecure (Full-time)',
    description: 'At ConnectSecure, architected scalable real-time monitoring dashboards using Angular 20, PrimeNG & ApexCharts for City Gas Distribution across hundreds of BPCL Retail Outlets, WebSockets live alert streaming, and station-level gas custody reconciliation billing engines.',
    metrics: [
      { label: 'CURRENT ROLE', value: 'Software Eng.' },
      { label: 'BPCL STATIONS', value: 'Hundreds' }
    ],
    // Close-up zoomed camera framing the tall Corporate High-Rise
    camPos: [9.5, 12.0, -1.0],
    target: [5.5, 5.5, -5.5],
    buildingPos: [5.5, 0, -5.5],
    landmarkIcon: 'clock'
  },
  {
    id: 'academics',
    pill: 'Academics',
    category: 'UNIVERSITY & HONORS',
    buildingName: 'UVCE University Hall & Library',
    subtitle: 'B.Tech in Electronics & Communication Engineering (2022 — 2026)',
    description: 'University of Visvesvaraya College of Engineering (UVCE). Graduated with academic distinction (8.76 / 10 CGPA). Rigorous coursework in Operating Systems, Embedded Systems, and Computer Networks.',
    metrics: [
      { label: 'OVERALL CGPA', value: '8.76 / 10' },
      { label: 'DEPARTMENT', value: 'ECE Honours' }
    ],
    // Close-up zoomed camera framing the Academic Library with the 3D Book!
    camPos: [8.5, 9.8, 9.5],
    target: [5.2, 4.0, 5.2],
    buildingPos: [5.2, 0, 5.2],
    landmarkIcon: 'book'
  },
  {
    id: 'location',
    pill: 'Campus & Hub',
    category: 'HEADQUARTERS',
    buildingName: 'Bengaluru Tech Center',
    subtitle: 'On-site engineering at ConnectSecure Technologies, Bengaluru, India',
    description: 'Operating in Bengaluru, India\'s Silicon Valley, building high-throughput industrial edge pipelines and distributed cloud architectures for mission-critical forecourt automation.',
    metrics: [
      { label: 'TIMEZONE', value: 'IST (UTC+5:30)' },
      { label: 'STATUS', value: 'High-Impact Roles' }
    ],
    // Close-up zoomed camera framing the Central Entrance Plaza & Location Pin
    camPos: [4.5, 8.5, 11.5],
    target: [0.5, 3.2, 5.5],
    buildingPos: [0.5, 0, 5.5],
    landmarkIcon: 'location'
  },
  {
    id: 'askme',
    pill: 'AI Clone',
    category: 'INTERACTIVE AGENT',
    buildingName: 'AI Hologram & Analytics Dome',
    subtitle: 'Interactive conversational agent trained on Ashok\'s real engineering record',
    description: 'Direct conversational clone of Ashok H. Ask questions regarding real-time Modbus register parsing, BPCL custody transfer billing engine, or distributed cloud microservices.',
    metrics: [
      { label: 'RAG RECALL', value: '95%+' },
      { label: 'LATENCY', value: 'Sub-Second' }
    ],
    // Close-up zoomed camera framing the Geodesic AI Observatory Dome
    camPos: [4.2, 8.5, -0.5],
    target: [0, 2.5, -4.5],
    buildingPos: [0, 0, -4.5],
    landmarkIcon: 'sparkle'
  }
];

export const Hero3DTourView = ({
  onOpenResume,
  onOpenAi,
  onOpenCaseStudy,
  onSwitchToList,
  onSwitchToBento,
  onSwitchToMildSugar,
  soundEnabled,
  onToggleSound,
}) => {
  const mountRef = useRef(null);
  const [currentStationIdx, setCurrentStationIdx] = useState(0);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [isCardVisible, setIsCardVisible] = useState(true);

  // Three.js animation refs
  const sceneRef = useRef(null);
  const cameraRef = useRef(null);
  const rendererRef = useRef(null);
  const reqIdRef = useRef(null);

  // Camera glide refs
  const currentCamPosRef = useRef(new THREE.Vector3(...CAMPUS_STATIONS[0].camPos));
  const targetCamPosRef = useRef(new THREE.Vector3(...CAMPUS_STATIONS[0].camPos));
  const currentLookAtRef = useRef(new THREE.Vector3(...CAMPUS_STATIONS[0].target));
  const targetLookAtRef = useRef(new THREE.Vector3(...CAMPUS_STATIONS[0].target));
  const mouseOffsetRef = useRef({ x: 0, y: 0 });

  // Mesh animation refs
  const landmarkIconsRef = useRef([]);
  const clockHandsRef = useRef(null);
  const radarBeaconsRef = useRef([]);

  const activeStation = CAMPUS_STATIONS[currentStationIdx];

  // Glide camera directly to the respective building block
  const goToStation = useCallback((idx) => {
    if (idx < 0 || idx >= CAMPUS_STATIONS.length) return;
    setCurrentStationIdx(idx);
    setIsCardVisible(true);
    const station = CAMPUS_STATIONS[idx];
    targetCamPosRef.current.set(...station.camPos);
    targetLookAtRef.current.set(...station.target);
    sound.playSwoosh();
  }, []);

  const currentStationIdxRef = useRef(currentStationIdx);
  useEffect(() => {
    currentStationIdxRef.current = currentStationIdx;
  }, [currentStationIdx]);

  const goToStationRef = useRef(goToStation);
  useEffect(() => {
    goToStationRef.current = goToStation;
  }, [goToStation]);

  // Keyboard navigation: Left/Right arrows or keys 1-7
  useEffect(() => {
    const handleKeyDown = (e) => {
      const tag = document.activeElement?.tagName?.toLowerCase();
      if (tag === 'input' || tag === 'textarea') return;

      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        e.preventDefault();
        setCurrentStationIdx((prev) => {
          const next = (prev + 1) % CAMPUS_STATIONS.length;
          goToStation(next);
          return next;
        });
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        e.preventDefault();
        setCurrentStationIdx((prev) => {
          const next = (prev - 1 + CAMPUS_STATIONS.length) % CAMPUS_STATIONS.length;
          goToStation(next);
          return next;
        });
      } else if (e.key >= '1' && e.key <= '7') {
        const num = parseInt(e.key, 10) - 1;
        if (num < CAMPUS_STATIONS.length) {
          goToStation(num);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [goToStation]);

  // =========================================================================
  // THREE.JS REAL ARCHITECTURAL ISOMETRIC CITY BUILDER
  // =========================================================================
  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth;
    const height = container.clientHeight;

    // 1. Scene setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xedf2f8); // Soft clean porcelain backdrop matching Spline
    scene.fog = new THREE.FogExp2(0xedf2f8, 0.010);
    sceneRef.current = scene;

    // 2. Isometric Perspective Camera
    const camera = new THREE.PerspectiveCamera(36, width / height, 0.5, 350);
    camera.position.set(...CAMPUS_STATIONS[0].camPos);
    camera.lookAt(...CAMPUS_STATIONS[0].target);
    cameraRef.current = camera;

    // 3. Renderer with soft shadow maps and ACES Filmic exposure
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.12;
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // 4. Soft High-Key Architectural Sunlight
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.65);
    scene.add(ambientLight);

    const sun = new THREE.DirectionalLight(0xfffaee, 1.85);
    sun.position.set(35, 48, 28);
    sun.castShadow = true;
    sun.shadow.mapSize.width = 2048;
    sun.shadow.mapSize.height = 2048;
    sun.shadow.camera.near = 5;
    sun.shadow.camera.far = 130;
    sun.shadow.camera.left = -26;
    sun.shadow.camera.right = 26;
    sun.shadow.camera.top = 26;
    sun.shadow.camera.bottom = -26;
    sun.shadow.bias = -0.0003;
    scene.add(sun);

    const skyFill = new THREE.DirectionalLight(0xdbe6f6, 0.85);
    skyFill.position.set(-25, 20, -20);
    scene.add(skyFill);

    // 5. Materials
    const whiteWallMat = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      roughness: 0.6,
      metalness: 0.02,
    });
    const warmStoneMat = new THREE.MeshStandardMaterial({
      color: 0xf8fafc,
      roughness: 0.55,
      metalness: 0.05,
    });
    const darkGlassMat = new THREE.MeshStandardMaterial({
      color: 0x94a3b8, // Crisp recessed architectural window glass
      roughness: 0.2,
      metalness: 0.4,
    });
    const blueGlassMat = new THREE.MeshStandardMaterial({
      color: 0x38bdf8,
      roughness: 0.15,
      metalness: 0.5,
    });
    const streetMat = new THREE.MeshStandardMaterial({
      color: 0xe2e8f0,
      roughness: 0.95,
    });
    const sidewalkMat = new THREE.MeshStandardMaterial({
      color: 0xf1f5f9,
      roughness: 0.85,
    });
    const roadMarkMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
    const foliageMat = new THREE.MeshStandardMaterial({
      color: 0x6ee7b7,
      roughness: 0.65,
    });
    const trunkMat = new THREE.MeshStandardMaterial({ color: 0x94a3b8 });
    
    // Signature Spline Cobalt Blue for Landmark 3D Icons
    const cobaltBlueMat = new THREE.MeshStandardMaterial({
      color: 0x2563eb,
      emissive: 0x1d4ed8,
      emissiveIntensity: 0.35,
      roughness: 0.2,
      metalness: 0.45,
    });

    // 6. Base Ground & Campus Sidewalk Island
    const ground = new THREE.Mesh(new THREE.PlaneGeometry(180, 180), new THREE.MeshStandardMaterial({ color: 0xedf2f8 }));
    ground.rotation.x = -Math.PI / 2;
    ground.position.y = -0.05;
    ground.receiveShadow = true;
    scene.add(ground);

    // Campus Master Island
    const campusBase = new THREE.Mesh(new THREE.BoxGeometry(34, 0.4, 34), streetMat);
    campusBase.position.y = -0.2;
    campusBase.receiveShadow = true;
    scene.add(campusBase);

    // Sidewalk blocks
    const sidewalkOffsets = [-10.5, 0, 10.5];
    sidewalkOffsets.forEach((sx) => {
      sidewalkOffsets.forEach((sz) => {
        const sw = new THREE.Mesh(new THREE.BoxGeometry(8.5, 0.12, 8.5), sidewalkMat);
        sw.position.set(sx, 0.06, sz);
        sw.receiveShadow = true;
        scene.add(sw);
      });
    });

    // Street Crosswalk Markings (Zebra stripes)
    for (let x = -14; x <= 14; x += 3.5) {
      if (Math.abs(x) > 4) {
        const stripe = new THREE.Mesh(new THREE.PlaneGeometry(0.4, 1.4), roadMarkMat);
        stripe.rotation.x = -Math.PI / 2;
        stripe.position.set(x, 0.02, 0);
        scene.add(stripe);
      }
    }

    // =========================================================================
    // 7. REAL ARCHITECTURAL BUILDING BLOCKS BUILDER
    // =========================================================================
    const cityGroup = new THREE.Group();
    const clickableObjects = [];

    // Helper: Build a realistic multi-story building block with real window frames
    const createArchitecturalBlock = (x, z, width, depth, floors, floorHeight = 1.0, hasRoofRim = true, stationIdx = null) => {
      const bGroup = new THREE.Group();
      bGroup.position.set(x, 0, z);

      const totalH = floors * floorHeight;

      // Solid core
      const core = new THREE.Mesh(new THREE.BoxGeometry(width, totalH, depth), whiteWallMat);
      core.position.y = totalH / 2;
      core.castShadow = true;
      core.receiveShadow = true;
      bGroup.add(core);

      // Floor slabs & realistic window matrices
      for (let f = 0; f < floors; f++) {
        const fy = f * floorHeight;

        // Overhanging floor slab
        const slab = new THREE.Mesh(new THREE.BoxGeometry(width + 0.12, 0.08, depth + 0.12), warmStoneMat);
        slab.position.y = fy;
        bGroup.add(slab);

        // Inset window frames (front & sides)
        const cols = Math.floor(width / 0.85);
        for (let c = 0; c < cols; c++) {
          const wx = -width / 2 + 0.5 + c * ((width - 1.0) / Math.max(1, cols - 1));
          
          // Front window
          const winF = new THREE.Mesh(new THREE.PlaneGeometry(0.45, floorHeight * 0.58), darkGlassMat);
          winF.position.set(wx, fy + floorHeight * 0.52, depth / 2 + 0.02);
          bGroup.add(winF);

          // Back window
          const winB = new THREE.Mesh(new THREE.PlaneGeometry(0.45, floorHeight * 0.58), darkGlassMat);
          winB.position.set(wx, fy + floorHeight * 0.52, -depth / 2 - 0.02);
          winB.rotation.y = Math.PI;
          bGroup.add(winB);
        }

        const sideCols = Math.floor(depth / 0.85);
        for (let sc = 0; sc < sideCols; sc++) {
          const wz = -depth / 2 + 0.5 + sc * ((depth - 1.0) / Math.max(1, sideCols - 1));
          const winL = new THREE.Mesh(new THREE.PlaneGeometry(0.45, floorHeight * 0.58), darkGlassMat);
          winL.position.set(-width / 2 - 0.02, fy + floorHeight * 0.52, wz);
          winL.rotation.y = -Math.PI / 2;
          bGroup.add(winL);

          const winR = new THREE.Mesh(new THREE.PlaneGeometry(0.45, floorHeight * 0.58), darkGlassMat);
          winR.position.set(width / 2 + 0.02, fy + floorHeight * 0.52, wz);
          winR.rotation.y = Math.PI / 2;
          bGroup.add(winR);
        }
      }

      // Rooftop parapet & HVAC chillers
      if (hasRoofRim) {
        const parapet = new THREE.Mesh(
          new THREE.BoxGeometry(width + 0.14, 0.28, depth + 0.14),
          warmStoneMat
        );
        parapet.position.y = totalH + 0.14;
        bGroup.add(parapet);

        // Rooftop AC chiller units
        const chiller = new THREE.Mesh(new THREE.BoxGeometry(0.8, 0.45, 0.65), darkGlassMat);
        chiller.position.set(0.4, totalH + 0.25, -0.3);
        bGroup.add(chiller);

        const vent = new THREE.Mesh(new THREE.CylinderGeometry(0.2, 0.2, 0.4, 8), darkGlassMat);
        vent.position.set(-0.5, totalH + 0.25, 0.4);
        bGroup.add(vent);
      }

      if (stationIdx !== null) {
        bGroup.userData = { stationIdx };
        bGroup.traverse((child) => {
          child.userData.stationIdx = stationIdx;
        });
        clickableObjects.push(bGroup);
      }

      cityGroup.add(bGroup);
      return bGroup;
    };

    // Helper: Add stylized trees with planters
    const addTree = (x, z) => {
      const planter = new THREE.Mesh(new THREE.CylinderGeometry(0.45, 0.45, 0.15, 12), warmStoneMat);
      planter.position.set(x, 0.08, z);
      cityGroup.add(planter);

      const trunk = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.1, 0.8, 6), trunkMat);
      trunk.position.set(x, 0.45, z);
      cityGroup.add(trunk);

      const foliage = new THREE.Mesh(new THREE.DodecahedronGeometry(0.55), foliageMat);
      foliage.position.set(x, 1.05, z);
      foliage.castShadow = true;
      cityGroup.add(foliage);
    };

    // 1. SPECIFIC LANDMARK: BPCL INNOVATION TOWER (Projects Station at [-5.5, 0, -5.5])
    // Tiered Stepped Skyscraper
    createArchitecturalBlock(-5.5, -5.5, 3.4, 3.4, 6, 1.0, true, 1);
    // Tier 2 step
    const pTier2 = createArchitecturalBlock(-5.5, -5.5, 2.4, 2.4, 2, 1.0, true, 1);
    pTier2.position.y = 6.0;

    // 2. SPECIFIC LANDMARK: CONNECTSECURE CORPORATE HIGH-RISE (Experience Station at [5.5, 0, -5.5])
    // Tall Corporate Tower with Double Antenna Masts
    createArchitecturalBlock(5.5, -5.5, 3.6, 3.6, 7, 1.0, true, 3);
    const cTier2 = createArchitecturalBlock(5.5, -5.5, 2.6, 2.6, 2, 1.0, true, 3);
    cTier2.position.y = 7.0;
    // Antenna
    const ant1 = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.04, 2.8), darkGlassMat);
    ant1.position.set(5.0, 10.4, -5.0);
    cityGroup.add(ant1);

    // 3. SPECIFIC LANDMARK: UVCE ACADEMIC LIBRARY (Academics Station at [5.2, 0, 5.2])
    // Modern University Atrium Building
    createArchitecturalBlock(5.2, 5.2, 3.8, 3.8, 4, 1.1, true, 4);
    // Glass Atrium roof
    const atrium = new THREE.Mesh(new THREE.BoxGeometry(2.4, 0.8, 2.4), blueGlassMat);
    atrium.position.set(5.2, 4.8, 5.2);
    atrium.userData = { stationIdx: 4 };
    cityGroup.add(atrium);
    clickableObjects.push(atrium);

    // 4. SPECIFIC LANDMARK: HARDWARE & IOT SYSTEMS LAB (Skills Station at [-6.0, 0, 5.0])
    // L-Shaped Technology Complex
    createArchitecturalBlock(-6.0, 5.0, 3.6, 2.2, 4, 1.0, true, 2);
    createArchitecturalBlock(-4.5, 3.6, 2.0, 2.8, 3, 1.0, true, 2);

    // 5. SPECIFIC LANDMARK: BENGALURU ENTRANCE PLAZA (Location Station at [0.5, 0, 5.5])
    createArchitecturalBlock(0.5, 5.5, 3.2, 2.8, 4, 1.0, true, 5);

    // 6. SPECIFIC LANDMARK: AI HOLOGRAM DOME (Ask AI Station at [0, 0, -4.5])
    // Geodesic Glass Dome Pavilion (Matching Spline Screenshot!)
    const domeBase = new THREE.Mesh(new THREE.CylinderGeometry(2.2, 2.4, 0.6, 24), warmStoneMat);
    domeBase.position.set(0, 0.3, -4.5);
    domeBase.userData = { stationIdx: 6 };
    cityGroup.add(domeBase);
    clickableObjects.push(domeBase);

    const geoDome = new THREE.Mesh(
      new THREE.IcosahedronGeometry(2.0, 2),
      new THREE.MeshStandardMaterial({ color: 0xffffff, wireframe: true })
    );
    geoDome.position.set(0, 1.8, -4.5);
    geoDome.userData = { stationIdx: 6 };
    cityGroup.add(geoDome);
    clickableObjects.push(geoDome);

    const domeCore = new THREE.Mesh(
      new THREE.SphereGeometry(1.6, 16, 16),
      new THREE.MeshStandardMaterial({ color: 0x38bdf8, transparent: true, opacity: 0.45, roughness: 0.1 })
    );
    domeCore.position.set(0, 1.8, -4.5);
    domeCore.userData = { stationIdx: 6 };
    cityGroup.add(domeCore);
    clickableObjects.push(domeCore);

    // 7. SURROUNDING REAL CAMPUS BUILDINGS (Filling out the bustling cityscape)
    createArchitecturalBlock(-10.5, -5.5, 3.0, 3.0, 5, 0.95);
    createArchitecturalBlock(-10.5, 5.0, 3.0, 3.2, 4, 1.0);
    createArchitecturalBlock(-10.5, 0, 3.0, 2.8, 6, 0.9);
    createArchitecturalBlock(10.5, -5.5, 3.2, 3.0, 5, 1.0);
    createArchitecturalBlock(10.5, 5.2, 3.2, 3.2, 4, 1.05);
    createArchitecturalBlock(10.5, 0, 2.8, 3.2, 5, 0.95);
    createArchitecturalBlock(-5.5, 0, 3.2, 2.4, 4, 1.0);
    createArchitecturalBlock(5.2, 0, 2.8, 3.2, 4, 1.0);

    // Avenue Trees & Green Courtyards
    const treeCoords = [
      [-1.8, -1.8], [1.8, -1.8], [-1.8, 1.8], [1.8, 1.8],
      [-8.5, -1.5], [-8.5, 1.5], [8.5, -1.5], [8.5, 1.5],
      [-1.5, -8.5], [1.5, -8.5], [-1.5, 8.5], [1.5, 8.5]
    ];
    treeCoords.forEach(([tx, tz]) => addTree(tx, tz));

    scene.add(cityGroup);

    // Active Building Ground Halo (Visual accent beneath the active building)
    const haloGeo = new THREE.RingGeometry(2.3, 2.65, 32);
    const haloMat = new THREE.MeshBasicMaterial({ 
      color: 0x2563eb, 
      side: THREE.DoubleSide, 
      transparent: true, 
      opacity: 0.65 
    });
    const activeHalo = new THREE.Mesh(haloGeo, haloMat);
    activeHalo.rotation.x = -Math.PI / 2;
    activeHalo.position.set(...CAMPUS_STATIONS[0].buildingPos);
    activeHalo.position.y = 0.08;
    scene.add(activeHalo);

    // =========================================================================
    // 8. FLOATING COBALT BLUE 3D LANDMARK ICONS
    // =========================================================================
    const icons = [];

    CAMPUS_STATIONS.forEach((station, sIdx) => {
      const [bx, by, bz] = station.buildingPos;
      const iconGroup = new THREE.Group();

      // Position icon directly above its dedicated building
      const iconY = station.id === 'overview' ? 8.5 : station.id === 'projects' ? 9.2 : station.id === 'experience' ? 10.4 : 6.8;
      iconGroup.position.set(bx, iconY, bz);

      if (station.landmarkIcon === 'book') {
        // Giant Open 3D Academics Book
        const pageL = new THREE.Mesh(new THREE.BoxGeometry(0.9, 0.12, 1.2), cobaltBlueMat);
        pageL.position.set(-0.45, 0, 0);
        pageL.rotation.z = 0.28;
        iconGroup.add(pageL);

        const pageR = new THREE.Mesh(new THREE.BoxGeometry(0.9, 0.12, 1.2), cobaltBlueMat);
        pageR.position.set(0.45, 0, 0);
        pageR.rotation.z = -0.28;
        iconGroup.add(pageR);

        const spine = new THREE.Mesh(new THREE.CylinderGeometry(0.1, 0.1, 1.2, 8), cobaltBlueMat);
        spine.rotation.x = Math.PI / 2;
        iconGroup.add(spine);
      } else if (station.landmarkIcon === 'lightbulb') {
        // 3D Ideas Lightbulb
        const bulb = new THREE.Mesh(new THREE.SphereGeometry(0.7, 16, 16), cobaltBlueMat);
        iconGroup.add(bulb);

        const bulbNeck = new THREE.Mesh(new THREE.CylinderGeometry(0.35, 0.22, 0.45, 12), cobaltBlueMat);
        bulbNeck.position.y = -0.68;
        iconGroup.add(bulbNeck);
      } else if (station.landmarkIcon === 'location') {
        // 3D Campus Location Pin
        const pinHead = new THREE.Mesh(new THREE.SphereGeometry(0.65, 16, 16), cobaltBlueMat);
        pinHead.position.y = 0.45;
        iconGroup.add(pinHead);

        const pinCone = new THREE.Mesh(new THREE.ConeGeometry(0.55, 1.0, 16), cobaltBlueMat);
        pinCone.position.y = -0.15;
        pinCone.rotation.x = Math.PI;
        iconGroup.add(pinCone);
      } else if (station.landmarkIcon === 'monitor') {
        // 3D Projects Video Monitor Screen
        const screen = new THREE.Mesh(new THREE.BoxGeometry(1.5, 1.05, 0.18), cobaltBlueMat);
        iconGroup.add(screen);

        const playBtn = new THREE.Mesh(new THREE.ConeGeometry(0.24, 0.38, 3), new THREE.MeshBasicMaterial({ color: 0xffffff }));
        playBtn.position.set(0, 0, 0.12);
        playBtn.rotation.z = -Math.PI / 2;
        iconGroup.add(playBtn);
      } else if (station.landmarkIcon === 'clock') {
        // 3D Timeline Clock
        const dial = new THREE.Mesh(new THREE.CylinderGeometry(0.75, 0.75, 0.22, 24), cobaltBlueMat);
        dial.rotation.x = Math.PI / 2;
        iconGroup.add(dial);

        const hHand = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.38, 0.04), new THREE.MeshBasicMaterial({ color: 0xffffff }));
        hHand.position.set(0, 0.16, 0.14);
        iconGroup.add(hHand);
        clockHandsRef.current = hHand;
      } else if (station.landmarkIcon === 'shield') {
        // 3D Highlights Shield
        const shield = new THREE.Mesh(new THREE.BoxGeometry(1.2, 1.4, 0.22), cobaltBlueMat);
        iconGroup.add(shield);

        const coreStar = new THREE.Mesh(new THREE.OctahedronGeometry(0.28), new THREE.MeshBasicMaterial({ color: 0xffffff }));
        coreStar.position.z = 0.16;
        iconGroup.add(coreStar);
      } else {
        // 3D AI Sparkle Node
        const sparkle = new THREE.Mesh(new THREE.OctahedronGeometry(0.75), cobaltBlueMat);
        iconGroup.add(sparkle);
      }

      iconGroup.castShadow = true;
      iconGroup.userData = { stationIdx: sIdx };
      iconGroup.traverse((child) => {
        child.userData.stationIdx = sIdx;
      });
      scene.add(iconGroup);
      clickableObjects.push(iconGroup);
      icons.push({ group: iconGroup, baseY: iconY });
    });
    landmarkIconsRef.current = icons;

    // =========================================================================
    // 9. ANIMATION LOOP WITH TARGET CAMERA DAMPING
    // =========================================================================
    let lastTime = performance.now();
    const startTime = performance.now();

    const animate = () => {
      reqIdRef.current = requestAnimationFrame(animate);

      const now = performance.now();
      const delta = Math.min((now - lastTime) / 1000, 0.1);
      lastTime = now;
      const time = (now - startTime) / 1000;

      // Smooth Camera Glide directly to respective building
      const desiredPos = new THREE.Vector3().copy(targetCamPosRef.current);
      desiredPos.x += mouseOffsetRef.current.x * 0.7;
      desiredPos.y += -mouseOffsetRef.current.y * 0.5;

      currentCamPosRef.current.lerp(desiredPos, delta * 3.2);
      currentLookAtRef.current.lerp(targetLookAtRef.current, delta * 3.2);

      camera.position.copy(currentCamPosRef.current);
      camera.lookAt(currentLookAtRef.current);

      // Update active building halo on ground
      const currentActive = CAMPUS_STATIONS[currentStationIdxRef.current];
      if (currentActive) {
        const [targetX, , targetZ] = currentActive.buildingPos;
        activeHalo.position.x += (targetX - activeHalo.position.x) * delta * 5.0;
        activeHalo.position.z += (targetZ - activeHalo.position.z) * delta * 5.0;
        const pulse = 1.0 + Math.sin(time * 3.5) * 0.08;
        activeHalo.scale.set(pulse, pulse, pulse);
        activeHalo.visible = currentActive.id !== 'overview';
      }

      // Gentle floating bob & rotate for Cobalt Blue icons
      if (landmarkIconsRef.current.length > 0) {
        landmarkIconsRef.current.forEach((item, idx) => {
          item.group.position.y = item.baseY + Math.sin(time * 2.4 + idx * 0.9) * 0.28;
          item.group.rotation.y = time * 0.6 + idx * 0.4;
        });
      }

      // Rotate clock hand
      if (clockHandsRef.current) {
        clockHandsRef.current.rotation.z = -time * 0.8;
      }

      renderer.render(scene, camera);
    };

    animate();

    // Resize handler
    const handleResize = () => {
      if (!container || !renderer || !camera) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    // Mouse Parallax & Raycaster Hover/Click
    const raycaster = new THREE.Raycaster();
    const mouseCoord = new THREE.Vector2();
    let pointerDownPos = { x: 0, y: 0 };
    let isDragging = false;

    const handlePointerDown = (e) => {
      pointerDownPos = { x: e.clientX, y: e.clientY };
      isDragging = false;
    };

    const handlePointerMove = (e) => {
      const rect = container.getBoundingClientRect();
      const normX = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const normY = ((e.clientY - rect.top) / rect.height) * 2 - 1;
      mouseOffsetRef.current = { x: normX, y: normY };

      const dx = Math.abs(e.clientX - pointerDownPos.x);
      const dy = Math.abs(e.clientY - pointerDownPos.y);
      if (dx > 6 || dy > 6) {
        isDragging = true;
      }

      mouseCoord.x = normX;
      mouseCoord.y = -normY;
      raycaster.setFromCamera(mouseCoord, camera);
      const hits = raycaster.intersectObjects(clickableObjects, true);

      let found = false;
      for (const h of hits) {
        let cur = h.object;
        while (cur && cur !== scene) {
          if (cur.userData && cur.userData.stationIdx !== undefined) {
            found = true;
            break;
          }
          cur = cur.parent;
        }
        if (found) break;
      }

      container.style.cursor = found ? 'pointer' : 'default';
    };

    const handlePointerUp = (e) => {
      const dx = Math.abs(e.clientX - pointerDownPos.x);
      const dy = Math.abs(e.clientY - pointerDownPos.y);
      if (dx > 8 || dy > 8 || isDragging) return;

      const rect = container.getBoundingClientRect();
      const normX = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const normY = ((e.clientY - rect.top) / rect.height) * 2 - 1;

      mouseCoord.x = normX;
      mouseCoord.y = -normY;
      raycaster.setFromCamera(mouseCoord, camera);
      const hits = raycaster.intersectObjects(clickableObjects, true);

      for (const h of hits) {
        let cur = h.object;
        while (cur && cur !== scene) {
          if (cur.userData && cur.userData.stationIdx !== undefined) {
            goToStationRef.current(cur.userData.stationIdx);
            return;
          }
          cur = cur.parent;
        }
      }
    };

    container.addEventListener('pointerdown', handlePointerDown);
    window.addEventListener('pointermove', handlePointerMove);
    container.addEventListener('pointerup', handlePointerUp);

    // Cleanup
    return () => {
      if (reqIdRef.current) cancelAnimationFrame(reqIdRef.current);
      window.removeEventListener('resize', handleResize);
      container.removeEventListener('pointerdown', handlePointerDown);
      window.removeEventListener('pointermove', handlePointerMove);
      container.removeEventListener('pointerup', handlePointerUp);
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  // Copy email
  const handleCopyEmail = () => {
    navigator.clipboard.writeText(portfolioData.identity.email);
    setCopiedEmail(true);
    sound.playSuccess();
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  return (
    <main 
      id="hero-view" 
      className="relative min-h-dvh overflow-hidden bg-[#edf2f8] text-slate-800 font-sans select-none"
    >
      {/* 3D WebGL Canvas */}
      <div 
        ref={mountRef} 
        className="absolute inset-0 w-full h-full cursor-grab active:cursor-grabbing z-0" 
      />

      {/* ===================================================================== */}
      {/* 1. TOP HEADER (Matching Spline Meridian University layout)            */}
      {/* ===================================================================== */}
      <header className="relative z-20 flex items-center justify-between p-4 sm:p-6 pointer-events-none">
        
        {/* Monogram Brand */}
        <div className="pointer-events-auto flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-[#2563eb] text-white flex items-center justify-center font-extrabold text-xs shadow-md">
            AH
          </div>
          <div>
            <h1 className="font-bold text-sm sm:text-base text-slate-900 tracking-tight">
              Ashok H
            </h1>
            <p className="text-[11px] text-slate-500 font-mono hidden sm:block">
              Software & Systems Engineer • ConnectSecure
            </p>
          </div>
        </div>

        {/* View Switchers */}
        <div className="pointer-events-auto flex items-center gap-2 sm:gap-3">
          <div className="flex items-center gap-1 rounded-full bg-white/80 p-1 shadow-sm border border-slate-200 backdrop-blur-md">
            <button
              onClick={() => {
                sound.playClick();
                onSwitchToMildSugar?.();
              }}
              className="inline-flex min-h-8 items-center rounded-full px-3.5 text-xs font-semibold text-slate-600 hover:text-slate-900 transition-colors"
            >
              Mild Sugar
            </button>
            <button
              onClick={() => sound.playClick()}
              className="inline-flex min-h-8 items-center rounded-full px-3.5 text-xs font-bold text-white bg-[#2563eb] shadow-sm transition-all"
            >
              3D Campus City
            </button>
            <button
              onClick={() => {
                sound.playClick();
                onSwitchToBento?.();
              }}
              className="inline-flex min-h-8 items-center rounded-full px-3.5 text-xs font-semibold text-slate-600 hover:text-slate-900 transition-colors"
            >
              Read as page
            </button>
          </div>

          <button
            onClick={() => {
              sound.playClick();
              onOpenResume?.();
            }}
            className="inline-flex min-h-8 items-center gap-1.5 rounded-full bg-white text-slate-800 border border-slate-200 px-3.5 text-xs font-bold shadow-sm hover:bg-slate-50 active:scale-[0.96] transition-all"
          >
            <Download className="w-3.5 h-3.5 text-[#2563eb]" />
            <span className="hidden sm:inline">Resume</span>
          </button>
        </div>
      </header>

      {/* ===================================================================== */}
      {/* 2. FLOATING CARD (Exact replica of Meridian University Card on left)   */}
      {/* ===================================================================== */}
      {isCardVisible && (
        <div className="fixed left-4 sm:left-8 top-24 z-20 w-[90vw] sm:w-[370px] max-w-full pointer-events-auto transition-all duration-300">
          <div className="relative rounded-2xl bg-white/95 border border-slate-200/80 shadow-2xl p-5 backdrop-blur-xl text-slate-800">
            
            {/* Close / Minimize card button */}
            <button
              onClick={() => {
                sound.playClick();
                setIsCardVisible(false);
              }}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-700 p-1 rounded-lg hover:bg-slate-100"
              title="Close card"
            >
              <X className="w-3.5 h-3.5" />
            </button>

            {/* Category Pill Tag */}
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2 h-2 rounded-full bg-[#2563eb]" />
              <span className="text-[10px] font-mono font-bold tracking-widest text-[#2563eb] uppercase">
                {activeStation.category}
              </span>
            </div>

            {/* Building Name & Subtitle */}
            <h2 className="text-base sm:text-lg font-bold text-slate-900 leading-snug">
              {activeStation.buildingName}
            </h2>
            <p className="text-xs text-slate-500 font-medium mt-1 leading-relaxed">
              {activeStation.subtitle}
            </p>

            {/* Description */}
            <p className="text-xs text-slate-600 mt-2.5 leading-relaxed">
              {activeStation.description}
            </p>

            {/* Key Metrics Boxes (Matching Spline's enrolled/ratio metrics) */}
            <div className="grid grid-cols-2 gap-2 mt-4 pt-3 border-t border-slate-100">
              {activeStation.metrics.map((m, mIdx) => (
                <div key={mIdx} className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                  <div className="text-sm font-bold text-[#2563eb] font-mono">
                    {m.value}
                  </div>
                  <div className="text-[10px] text-slate-500 uppercase font-mono font-semibold mt-0.5">
                    {m.label}
                  </div>
                </div>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="mt-4 flex items-center gap-2">
              {activeStation.id === 'projects' && (
                <button
                  onClick={() => {
                    sound.playClick();
                    onOpenCaseStudy?.(portfolioData.projects[0]);
                  }}
                  className="flex-1 py-2 rounded-xl bg-[#2563eb] hover:bg-[#1d4ed8] text-white text-xs font-bold font-mono flex items-center justify-center gap-1.5 shadow-sm transition-all"
                >
                  <Activity className="w-3.5 h-3.5" />
                  <span>Case Study</span>
                </button>
              )}

              {activeStation.id === 'askme' && (
                <button
                  onClick={() => {
                    sound.playClick();
                    onOpenAi?.();
                  }}
                  className="flex-1 py-2 rounded-xl bg-[#2563eb] hover:bg-[#1d4ed8] text-white text-xs font-bold font-mono flex items-center justify-center gap-1.5 shadow-sm transition-all"
                >
                  <Terminal className="w-3.5 h-3.5" />
                  <span>Launch AI Agent</span>
                </button>
              )}

              {activeStation.id === 'location' && (
                <button
                  onClick={handleCopyEmail}
                  className="flex-1 py-2 rounded-xl bg-[#2563eb] hover:bg-[#1d4ed8] text-white text-xs font-bold font-mono flex items-center justify-center gap-1.5 shadow-sm transition-all"
                >
                  {copiedEmail ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedEmail ? 'Copied Email' : 'Copy Email'}</span>
                </button>
              )}

              <button
                onClick={() => {
                  sound.playClick();
                  const next = (currentStationIdx + 1) % CAMPUS_STATIONS.length;
                  goToStation(next);
                }}
                className="py-2 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold font-mono flex items-center justify-center gap-1 transition-all"
                title="Fly to Next Building Block"
              >
                <span>Fly to Next</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Floating Re-Open Card Button when closed */}
      {!isCardVisible && (
        <button
          onClick={() => {
            sound.playPop();
            setIsCardVisible(true);
          }}
          className="fixed left-4 sm:left-8 top-24 z-20 px-3.5 py-2 rounded-full bg-white/95 text-xs font-bold text-[#2563eb] border border-slate-200 shadow-lg flex items-center gap-1.5 transition-all"
        >
          <Building2 className="w-3.5 h-3.5 text-[#2563eb]" />
          <span>Inspect {activeStation.buildingName}</span>
        </button>
      )}

      {/* ===================================================================== */}
      {/* 3. BOTTOM PILL NAVIGATION RAIL (Exact replica of Meridian screenshot!) */}
      {/* ===================================================================== */}
      <footer className="fixed bottom-6 left-0 right-0 z-30 flex items-center justify-center px-4 pointer-events-none">
        <nav 
          aria-label="Campus navigation"
          className="pointer-events-auto flex items-center gap-1.5 p-1.5 rounded-full bg-white/95 shadow-xl border border-slate-200/80 max-w-full overflow-x-auto backdrop-blur-xl"
        >
          {/* Previous Landmark Chevron */}
          <button
            type="button"
            onClick={() => {
              const next = (currentStationIdx - 1 + CAMPUS_STATIONS.length) % CAMPUS_STATIONS.length;
              goToStation(next);
            }}
            className="flex h-8 w-8 items-center justify-center rounded-full text-slate-400 hover:text-slate-800 hover:bg-slate-100 transition-colors"
            title="Fly to previous building"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          {/* Station Pills */}
          <div className="flex items-center gap-1">
            {CAMPUS_STATIONS.map((st, idx) => {
              const isActive = currentStationIdx === idx;
              return (
                <button
                  key={st.id}
                  type="button"
                  onClick={() => goToStation(idx)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-all ${
                    isActive
                      ? 'bg-[#2563eb] text-white shadow-sm'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                  title={`Fly directly to ${st.buildingName}`}
                >
                  {isActive && <span className="w-1.5 h-1.5 rounded-full bg-white" />}
                  <span>{st.pill}</span>
                </button>
              );
            })}
          </div>

          {/* Next Landmark Chevron */}
          <button
            type="button"
            onClick={() => {
              const next = (currentStationIdx + 1) % CAMPUS_STATIONS.length;
              goToStation(next);
            }}
            className="flex h-8 w-8 items-center justify-center rounded-full text-slate-400 hover:text-slate-800 hover:bg-slate-100 transition-colors"
            title="Fly to next building"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </nav>
      </footer>
    </main>
  );
};
