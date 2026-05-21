import Image from "next/image";
import { STYLES } from "./globals";
import { ImageScroller } from "../components/image-scroller";
import { ContactForm } from "@/components/contact-form";
import Link from "next/link";
import { ImageApiProvider } from "@/context/image-api";
import { ReactFlowProvider } from "@/context/react-flow";
import { ImageChart } from "@/components/image-chart";

const SectionHeader = ({ title }: { title: string }) => (
  <div className="flex flex-row items-center justify-start w-full gap-5 md:py-5 py-5">
    <div className="h-1 rounded-r-full bg-primary/20 flex-1" />
      <h2 className={STYLES.h2}>
        {title}
      </h2>
    <div className="h-1 rounded-l-full bg-primary/20 flex-1" />
  </div>
);

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-start font-sans m-auto w-full text-secondary relative overflow-clip">
      <section className={STYLES.section + " pt-0!"}>
        <div id="hero" className="w-full overflow-clip flex flex-col relative h-[90vh] xl:max-h-250 md:max-h-225 md:min-h-200 min-h-215 gap-3">
          <div className="rounded-b-xl lg:px-10 px-5 pb-5 w-full">
            <div className="flex flex-col pt-[max(15vh,7rem)] md:gap-5 gap-2">
              <h1 className={STYLES.h1 + " pb-3"}>
                Joseph Walker
              </h1>
              <div className="lg:w-1/2 md:w-2/3 w-5/6">
                <p className={STYLES.tagline}>Full-stack engineer building AI infrastructure + creative systems</p>
              </div>
            </div>
          </div>
          <div className="relative rounded-t-xl w-full flex-1">
            <Image 
              src="/flower-03.png"
              loading="eager"
              alt="" 
              className="absolute lg:w-1/2 md:w-2/3 sm:w-5/6 w-full m-auto md:top-0 md:bottom-auto top-auto bottom-0 -translate-x-1/2 left-1/2"
              quality={50}
              height={4096 * 0.5} 
              width={4096 * 0.5} />
          </div>
          <div className="absolute inset-0 flex flex-col gap-3 -z-10">
            <div className="w-full flex-1 bg-accent-two/50 rounded-b-3xl"/>
            <div className="w-full flex-[0.5] bg-accent-three/50 rounded-3xl"/>
          </div>
        </div>
      </section>
      <section id="about" className={STYLES.section}>
        <SectionHeader title="Why Teams Hire Me" />
        <div className="w-[90%] items-center m-auto flex flex-row gap-10">
          <div className="lg:flex-[0.5] flex-1 md:block hidden px-5 pt-5 bg-mist-300 dark:bg-mist-800 border-secondary/20 border rounded-xl">
            <Image 
              src="/flower-02.png" 
              alt="" 
              className=""
              height={1024 * 0.5}
              quality={50} 
              width={1536 * 0.5} />
          </div>
          <article className="flex-1 flex flex-col gap-5">
            <h3 className={STYLES.h3} >
              Read Me <span className="text-accent-two">+</span>
            </h3>
            <p className={STYLES.p + " text-left pb-2"}>
              I build performant systems that feel creative. Most of 
              my work sits at the intersection of backend infrastructure, AI tooling, and interactive web experiences.
              I enjoy building systems that are both technically rigorous and visually unconventional—from 
              Rust-powered image generation pipelines to distributed services with full observability stacks.
            </p>
            <div className="flex md:flex-row flex-col items-center gap-5 justify-stretch w-full m-auto">
              <Link href="" className="lg:text-lg w-full font-mono text-sm">
                <div className={STYLES.primary_button}>
                  Github
                </div>
              </Link>
              <Link href="" className="lg:text-lg w-full font-mono text-sm">
                <div className={STYLES.secondary_button}>
                  Linkedin
                </div>
              </Link>
            </div>
          </article>
        </div>
        <div className="md:hidden block px-5 pt-5">
          <Image 
            src="/flower-02.png" 
            alt="" 
            className="bg-mist-300 dark:bg-mist-800 border-secondary/20 border px-5 pt-5 rounded-xl"
            height={1024 * 0.25}
            quality={50} 
            width={1536 * 0.25} />
        </div>
      </section>
      <section id="projects" className={STYLES.section}>
        <SectionHeader title="Project Showcase" />
        <div className="w-[90%] m-auto flex flex-col md:gap-10 gap-5">
          <h3 className={STYLES.h3 + " pb-3"}>Rust Image Generator <span className="text-accent-two">+</span></h3>
          <div className="flex md:flex-row flex-col gap-5 border-b border-b-secondary/20 pb-30 py-0">
            <article className="flex flex-col justify-start gap-5 flex-[0.7]">
              <h4 className={STYLES.h4}>1. Overview</h4>
              <p className={STYLES.p}>
                A full-stack image generation system built for low-latency rendering, scalable delivery, and 
                real-time observability. The platform combines performant backend processing, responsive 
                client streaming, and production-grade telemetry to support generation at speed.
              </p>
              <div>
                <Link href="/" className="text-primary xl:text-xl text-auto font-sans font-light flex flex-row items-center hover:brightness-125 py-2" target="_blank">
                  Performance Metrics
                  <svg className="h-5 w-10 fill-accent-two" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">
                    <path d="M598.6 342.6C611.1 330.1 611.1 309.8 598.6 297.3L470.6 169.3C458.1 156.8 437.8 156.8 425.3 169.3C412.8 181.8 412.8 202.1 425.3 214.6L498.7 288L64 288C46.3 288 32 302.3 32 320C32 337.7 46.3 352 64 352L498.7 352L425.3 425.4C412.8 437.9 412.8 458.2 425.3 470.7C437.8 483.2 458.1 483.2 470.6 470.7L598.6 342.7z"/>
                  </svg>
                </Link>  
                <Link href="/" className="text-primary xl:text-xl text-auto font-sans font-light flex flex-row items-center hover:brightness-125 py-2" target="_blank">
                  Source Code
                  <svg className="h-5 w-10 fill-accent-two" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">
                    <path d="M598.6 342.6C611.1 330.1 611.1 309.8 598.6 297.3L470.6 169.3C458.1 156.8 437.8 156.8 425.3 169.3C412.8 181.8 412.8 202.1 425.3 214.6L498.7 288L64 288C46.3 288 32 302.3 32 320C32 337.7 46.3 352 64 352L498.7 352L425.3 425.4C412.8 437.9 412.8 458.2 425.3 470.7C437.8 483.2 458.1 483.2 470.6 470.7L598.6 342.7z"/>
                  </svg>
                </Link>  
              </div>
            </article>
            <div className="flex flex-col gap-5 flex-1">
              <ImageApiProvider>
                  <ImageScroller />
              </ImageApiProvider>
            </div>
          </div>
          <div className="flex flex-col gap-5">
            <article className="flex flex-col gap-5">
              <h4 className={STYLES.h4}>2. How it works</h4>
              <p className={STYLES.p}>
                Metrics, logs, and traces move through a unified telemetry pipeline—collected, 
                correlated, and surfaced in real time for fast debugging and system insight.
              </p>
            </article>
            <div className={" h-100 max-h-[70vh] w-full bg-modal/30 border-secondary/20 border rounded-xl overflow-clip"}>
              <ReactFlowProvider>
                <ImageChart />
              </ReactFlowProvider>
            </div>
          </div>
        </div>
      </section>
      <section id="contact" className={STYLES.section + " pb-40"}>
        <SectionHeader title="Let's get in touch"/>
        <div className="w-[90%] m-auto flex flex-col items-center gap-5">
          <h3 className={STYLES.h3 + " text-center"}>Make your best impression</h3>
          <ContactForm />
        </div>
      </section>
    </main>
  );
}