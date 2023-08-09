import { Suspense, useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { useLoader, Canvas, useFrame } from '@react-three/fiber';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {useControls} from 'leva';
import LocomotiveScroll from 'locomotive-scroll';
import './App.css';
import * as THREE from 'three';

gsap.registerPlugin(ScrollTrigger);

const Model = () => {
  const fbxRef = useRef();
  const fbx = useLoader(FBXLoader, '/StandingArguing.fbx');
  const clips = fbx.animations;
  const mixer = useRef();

  useEffect(() => {
    mixer.current = new THREE.AnimationMixer(fbxRef.current);

    if (clips && clips.length > 0) {
      const animationAction = mixer.current.clipAction(clips[0]);
      animationAction.play();
    }

    return () => {
      // Clean up the mixer when the component is unmounted
      mixer.current.stopAllAction();
    };
  }, [clips]);

  useFrame((state, delta) => {
    if (mixer.current) {
      mixer.current.update(delta);
    }
  });

  const { scale, positions, rotations } = useControls('controls', {
    scale: { value: 0.05, min: 0.01, max: 0.1 },
    positions: { value: [0.4,-7.9,1.3], step: 0.1 },
    rotations: { value: [0, 0, 0], step: 0.1 },
  });

  return (
    <group ref={fbxRef} scale={scale} position={positions} rotation={rotations}>
      <primitive object={fbx} />
    </group>
  );
};

function App() {
  useEffect(() => {
    const locoScroll = new LocomotiveScroll({
      el: document.querySelector("#main"),
      smooth: true,
    });
    locoScroll.on("scroll", ScrollTrigger.update);

    ScrollTrigger.scrollerProxy("#main", {
      scrollTop(value) {
        return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
      },
      getBoundingClientRect() {
        return {
          top: 0,
          left: 0,
          width: window.innerWidth,
          height: window.innerHeight,
        };
      },
      pinType: document.querySelector("#main").style.transform ? "transform" : "fixed",
    });

    ScrollTrigger.addEventListener("refresh", () => locoScroll.update());
    ScrollTrigger.refresh();

    gsap.to("#page1", {
      scrollTrigger: {
        trigger: "#page1",
        start: "top top",
        end: "bottom top",
        pin: true,
        scroller: "#main",
      },
    });
    gsap.to("#page2", {
      scrollTrigger: {
        trigger: "#page2",
        start: "top top",
        end: "bottom top",
        pin: true,
        scroller: "#main",
      },
    });
    gsap.to("#page3", {
      scrollTrigger: {
        trigger: "#page3",
        start: "top top",
        end: "bottom top",
        pin: true,
        scroller: "#main",
      },
    });
  }, []);

  return (
    <div>
        <div className='fixed w-screen h-screen top-0 left-0 z-[30] pointer-events-none'>
          <Canvas>
          <ambientLight intensity={0.2} />
          <spotLight position={[10, 15, 10]} angle={0.3} />
          <Suspense fallback={null}>
          <Model />
          </Suspense>
          </Canvas>
        </div>
     <div id="nav" className="flex items-center justify-between h-7 w-full fixed z-50 px-4">
        <h3 className="font-gilroy font-normal text-22">CYBERFICTION*</h3>
        <button className="px-10 py-2 rounded-full bg-black text-white border-none">APRIL, 2023</button>
      </div>
      <div id="main" className="relative overflow-hidden">
        <div id="page" className="relative h-screen w-screen bg-gray-200">
          <div id="loop" className="flex absolute top-30 h-25 w-full font-gilroy text-100">
            <h1 className="font-normal animate-loop">CYBERFICTION IS THE <b><i>REAL</i></b> <span>STORY</span> IN THE <span><i>METAVERSE.</i></span></h1>
          </div>
          <h3 className="absolute top-55 font-gilroy font-normal text-gray-700 left-5">
            CYBERFICTION AIMS TO BE A DECENTRALIZED COMMUNITY THAT CAN <br /> CREATE NEW VALUES AND PROFITS THROUGH PLAY IN THE VIRTUAL <br /> WORLD.
          </h3>
          <h4 className="absolute top-62 font-gilroy font-semibold left-25">...SCROLL TO READ</h4>
        </div>
        <div id="page1" className="relative h-screen w-screen bg-gray-200">
          <div id="right-text" className="absolute top-30 left-10">
            <h3 className="font-gilroy font-normal text-gray-700">CYBERFICTION / KEY WORD</h3>
            <h1 className="font-normal text-50 leading-1.5">HAVE FUN<br />LET'S PLAY<br />JUST BE TOGETHER</h1>
          </div>
          <div id="left-text" className="absolute top-50 right-10 text-right">
            <h1 className="font-normal text-50 leading-1.5">MAKE A STORY<br />TAKE A CHANCE<br />BUILD AND OWNED</h1>
            <h3 className="font-gilroy font-normal text-gray-700">..AND MAINTAIN GOOD HUMANITY</h3>
          </div>
        </div>
        <div id="page2" className="relative h-screen w-screen bg-gray-200">
          <div id="text1" className="absolute top-30 left-10">
            <h3 className="font-gilroy font-normal text-gray-700">CYBERFICTION / HAVE FUN</h3>
            <h1 className="font-normal text-60 leading-1.5">LET'S<br />HAVE FUN<br />TOGETHER</h1>
          </div>
          <div id="text2" className="absolute top-55 right-10 text-right">
            <p className="text-gray-700 font-gilroy font-normal">
              LET'S HAVE A BLAST! LET'S JUST THROW AWAY AGE, GENDER, REGION, <br /> STATUS, ETC., DON'T COMPETE, DON'T FIGHT, COOPERATE AND SHARE <br /> WITH EACH OTHER AND ENJOY IT TOGETHER! SO THAT YOU CAN STAND <br /> THERE IN THE NOT-TOO-DISTANT FUTURE AND DREAM OF ANOTHER NEW <br /> FUTURE
            </p>
          </div>
        </div>
        <div id="page3" className="relative h-screen w-screen bg-gray-200">
          <div id="text3" className="absolute top-40 right-10 text-right">
            <h3 className="font-gilroy font-normal text-gray-700">CYBERFICTION / PLAYGROUND</h3>
            <h1 className="font-normal text-70 leading-1.5">CYBERFIELD<br />IS OUR<br />PLAYGROUND</h1>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
