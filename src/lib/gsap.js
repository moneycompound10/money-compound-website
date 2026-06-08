import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { Flip } from "gsap/dist/Flip";
import { Draggable } from "gsap/dist/Draggable";
import { MotionPathPlugin } from "gsap/dist/MotionPathPlugin";
import { TextPlugin } from "gsap/dist/TextPlugin";

// Register plugins only on the client side
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, Flip, Draggable, MotionPathPlugin, TextPlugin);
}


export * from "gsap";
export { ScrollTrigger, Flip, Draggable, MotionPathPlugin };
export default gsap;
