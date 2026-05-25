import Image from "next/image";
import { STYLES } from "./globals";
import { ContactForm } from "@/components/contact-form";
import Link from "next/link";
import { ImageApiProvider } from "@/context/image-api";
import { ImageScroller } from "@/components/image-scroller";
import { ReactFlowProvider } from "@/context/react-flow";
import { ImageChart } from "@/components/image-chart";
import { ExternalLink } from "@/components/external-link";

const SectionHeader = ({ title }: { title: string }) => (
  <div className="flex flex-row items-center justify-start w-full gap-5 md:py-5">
    <div className="h-2 rounded-r-full bg-trim/10 flex-1" />
      <h2 className={STYLES.h2}>
        {title}
      </h2>
    <div className="h-2 rounded-l-full bg-trim/10 flex-1" />
  </div>
);

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-start font-sans m-auto w-full text-secondary-text relative overflow-clip">
      <section className={STYLES.section + " relative"}>
        <div id="hero" className={STYLES.sectionBody + " overflow-clip h-[90vh] md:max-h-175 md:min-h-160 min-h-190 max-h-225"}>
          <div className={STYLES.article + " pt-15 flex-[0.5]!"}>
            <div className="flex flex-col gap-5">
              <h1 className={STYLES.h1}>
                Joseph Walker
              </h1>
              <div className="lg:w-1/2 md:w-2/3 w-5/6">
                <p className={STYLES.tagline}>Full Stack Engineer building AI infrastructure + creative systems</p>
              </div>
            </div>
          </div>
          <div className="relative rounded-t-xl w-full flex-1">
            <Image 
              src="/flower-03.png"
              priority
              fetchPriority="high"
              alt="" 
              className="absolute lg:w-1/2 md:w-2/3 sm:w-5/6 w-full max-w-125 m-auto md:top-0 md:bottom-auto top-auto bottom-0 -translate-x-1/2 left-1/2 md:-translate-y-10"
              quality={50}
              height={4096 * 0.15} 
              width={4096 * 0.15} />
          </div>
          <div className="absolute inset-0 flex flex-col gap-3 -z-10">
            <div className="w-full flex-1 bg-primary-dark/70 relative overflow-clip rounded-b-3xl"/>
            <div className="w-full flex-[0.5] bg-primary/70 relative overflow-clip rounded-3xl"/>
          </div>
        </div>
      </section>
      <section id="about" className={STYLES.section}>
        <SectionHeader title="Why Teams Hire Me" />
        <div className={STYLES.sectionBody + " flex-row! items-center!"}>
          <div className="aspect-video md:flex w-115 hidden px-5 pt-5 bg-modal/50 border-trim/20 border rounded-xl max-w-1/2">
            <Image 
              src="/flower-02.png" 
              alt="" 
              className="mx-auto mt-auto"
              loading="eager"
              fetchPriority="high"
              height={1024 * 0.25}
              quality={50} 
              width={1536 * 0.25} />
          </div>
          <article className={STYLES.article}>
            <h3 className={STYLES.h3} >
              Read Me
            </h3>
            <p className={STYLES.p + " text-left pb-2"}>
              I build performant systems that feel creative. Most of 
              my work sits at the intersection of backend infrastructure, AI tooling, and interactive web experiences.
              I enjoy building systems that are both technically rigorous and visually unconventional—from 
              Rust-powered image generation pipelines to distributed services with full observability stacks.
            </p>
            <div className="flex md:flex-row flex-col items-center gap-5 justify-stretch w-full m-auto">
              <Link href="" className="lg:w-fit w-full">
                <div className={STYLES.primary_button + " lg:px-20! px-0 lg:w-auto"}>
                  Github
                </div>
              </Link>
              <Link href="" className="lg:w-fit w-full">
                <div className={STYLES.secondary_button + " lg:px-20! px-0 lg:w-auto"}>
                  Linkedin
                </div>
              </Link>
            </div>
          </article>
        </div>
        <div className={STYLES.sectionBody + " md:hidden block mt-3"}>
          <Image 
            src="/flower-02.png" 
            alt="" 
            loading="eager"
            fetchPriority="high"
            className="border-trim/20 border w-full m-auto px-5 pt-5 rounded-xl bg-modal/50"
            height={1024 * 0.2}
            quality={50} 
            width={1536 * 0.2} />
        </div>
      </section>
      <section id="projects" className={STYLES.section}>
        <SectionHeader title="Project Showcase" />
        <div className={STYLES.sectionBody}>
          <h3 className={STYLES.h3 + " lg:pb-5"}>Rust Image Generator</h3>
          <div className={STYLES.subSection}>
            <article className={STYLES.article + " flex-[0.7]"}>
              <h4 className={STYLES.h4}>Overview</h4>
              <p className={STYLES.p}>
                A full-stack image generation system built for low-latency rendering, scalable delivery, and 
                real-time observability. The platform combines performant backend processing, responsive 
                client streaming, and production-grade telemetry to support generation at speed.
              </p>
              <div className="my-auto flex flex-col gap-5">
                <ExternalLink href="/">
                  Performance Metrics
                </ExternalLink>
                <ExternalLink href="/">
                  Server Source Code
                </ExternalLink>
              </div>
            </article>
            <div className="flex flex-col flex-1 bg-modal/50 md:p-3 p-2 border-trim/20 border rounded-xl">
              <ImageApiProvider>
                  <ImageScroller />
              </ImageApiProvider>
            </div>
          </div>
          <div className={STYLES.subSection + " flex-col!"}>
            <article className={STYLES.article}>
              <h4 className={STYLES.h4}>How it works</h4>
              <p className={STYLES.p + " lg:w-5/6"}>
                Metrics, logs, and traces move through a unified telemetry pipeline—collected, 
                correlated, and surfaced in real time for fast debugging and system insight.
              </p>
            </article>
            <div className={"h-100 max-h-[70vh] w-full bg-modal/50 border-trim/20 border rounded-xl overflow-clip"}>
              <ReactFlowProvider>
                <ImageChart />
              </ReactFlowProvider>
            </div>
            <ExternalLink href="/">
              Infra Source Code
            </ExternalLink>
          </div>
        </div>
      </section>
      <section id="contact" className={STYLES.section}>
        <SectionHeader title="Let&apos;s connect"/>
        <div className={STYLES.sectionBody}>
          <div className={STYLES.subSection}>
            <article className={STYLES.article}>
              <h3 className={STYLES.h3}>Get In Touch</h3>
              <p className={STYLES.p}>
                Open to Rust engineering opportunities across backend, infrastructure, and systems programming. Feel free to reach out.
              </p>
            </article>
            <div className="lg:p-5 p-2 max-w-full md:w-1/2 w-full flex md:justify-end justify-center">
              <ContactForm />
            </div>
          </div>
          <div className={STYLES.subSection + " flex-col!"}>
            <article className={STYLES.article}>
              <h4 className={STYLES.h4}>Other ways to reach me</h4>
              <p className={STYLES.p + " pb-5"}>You can also reach me here.</p>
            </article>
            <div className={"flex md:flex-row flex-col justify-center! md:gap-20! gap-5"}>
              <Link target="_blank" aria-label="Chat on WhatsApp" className="px-15 bg-modal/50 hover:brightness-125 py-2 rounded-md flex items-center justify-center border-trim/15 border" href="https://wa.me/+995598081800"> 
                <svg className="h-7 w-28" id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1487.13 346">
                  <path className="fill-secondary-text" d="M1127.34,188.81l21.43-65.42,21.65,65.42h-43.08ZM1428.25,229.87c-15.56,0-24.36-10.83-24.36-32.93v-5.64c0-20.08,9.25-32.26,25.26-32.26,13.08,0,23.68,9.25,23.68,34.96s-9.7,35.87-24.59,35.87ZM1370.28,297.09h33.38v-55.94c8.12,10.83,20.08,15.79,32.93,15.79,31.13,0,50.53-24.36,50.53-63.84s-16.69-61.13-48.27-61.13c-15.56,0-27.29,5.64-36.09,17.37v-13.76h-32.48v161.51ZM1296.75,229.87c-15.56,0-24.36-10.83-24.36-32.93v-5.64c0-20.08,9.25-32.26,25.26-32.26,13.08,0,23.68,9.25,23.68,34.96s-9.7,35.87-24.59,35.87ZM1238.77,297.09h33.38v-55.94c8.12,10.83,20.08,15.79,32.93,15.79,31.13,0,50.53-24.36,50.53-63.84s-16.69-61.13-48.27-61.13c-15.56,0-27.29,5.64-36.09,17.37v-13.76h-32.48v161.51ZM1070.95,253.32h35.64l11.96-35.64h60.68l11.96,35.64h36.77l-57.52-161.06h-41.73l-57.75,161.06ZM1014.33,256.93c34.06,0,51.43-13.99,51.43-36.99s-10.83-32.48-41.96-37.67l-14.66-2.48c-12.63-2.03-16.47-6.09-16.47-12.63s4.96-11.73,19.17-11.73c13.31,0,18.72,4.96,20.98,17.59h31.13c-1.8-26.84-18.95-41.05-52.11-41.05-30.9,0-50.75,13.31-50.75,36.09s13.31,31.58,43.08,36.54l13.53,2.26c12.41,2.03,15.34,6.54,15.34,13.31,0,7.89-5.19,12.86-19.4,12.86s-22.33-5.41-23.68-17.82h-31.81c1.13,29.32,22.56,41.73,56.17,41.73ZM921.85,256.03c10.38,0,20.98-2.93,27.29-7.22v-25.26c-6.32,3.61-12.41,5.41-18.05,5.41-9.7,0-14.89-4.06-14.89-16.47v-50.75h32.93v-26.17h-32.93v-32.48h-29.78v18.05c0,10.15-2.48,14.44-12.63,14.44h-8.8v26.17h17.82v51.88c0,27.29,10.38,42.41,39.02,42.41ZM796.89,233.47c-10.83,0-16.92-4.74-16.92-13.08,0-9.47,6.99-13.99,23.23-16.69,9.02-1.58,16.02-3.38,21.43-7.22v11.5c0,15.56-11.05,25.49-27.75,25.49ZM788.31,256.93c17.37,0,29.55-7.22,39.02-17.82,1.13,5.64,3.16,10.38,5.86,14.21h31.58c-5.64-8.8-8.12-21.88-8.12-39.25v-37.67c0-27.97-14.89-44.44-50.08-44.44-31.13,0-49.4,12.86-53.01,41.05h30.45c1.8-10.83,8.35-17.14,21.43-17.14,12.18,0,19.17,4.96,19.17,13.53s-5.19,11.5-28.2,14.89c-25.04,3.61-48.05,12.63-48.05,37.9,0,22.56,16.02,34.74,39.93,34.74ZM625.23,253.32h33.38v-69.02c0-8.12,2.03-11.96,6.99-16.92,4.96-4.96,11.5-7.67,18.5-7.67,11.05,0,16.92,6.09,16.92,20.98v72.63h33.38v-78.95c0-27.29-13.53-42.41-39.02-42.41-13.08,0-25.26,4.06-36.77,17.59v-57.29h-33.38v161.06ZM444.09,253.32h36.77l26.62-116.17,27.07,116.17h37.22l42.63-161.06h-36.99l-25.26,118.87-27.07-117.97h-33.38l-27.52,118.42-25.26-119.33h-38.12l43.31,161.06Z"/>
                  <g>
                    <path className="fill-secondary-text" d="M173,0C77.45,0,0,77.45,0,173c0,31.43,8.38,60.91,23.04,86.31L0,346l89.87-21.25c24.67,13.54,53,21.25,83.13,21.25,95.55,0,173-77.45,173-173S268.55,0,173,0ZM173,315.01c-28.91,0-55.81-8.64-78.24-23.48l-53.1,13.52,14.89-50.75c-16.11-23.03-25.56-51.06-25.56-81.3,0-78.43,63.58-142.01,142.01-142.01s142.01,63.58,142.01,142.01-63.58,142.01-142.01,142.01Z"/>
                    <path className="fill-secondary-text" d="M213.54,195.84l41.86,19.73c1.92.91,3.15,2.85,2.98,4.97-.45,5.51-2.66,16.55-12.56,26.44-27.93,27.93-78.09-3.67-80.13-4.89-12.34-6.63-24.06-15.49-35.17-26.61-11.11-11.11-19.98-22.84-26.61-35.17-1.22-2.04-32.82-52.19-4.89-80.13,9.9-9.9,20.93-12.1,26.44-12.56,2.12-.17,4.07,1.06,4.97,2.98l19.73,41.86c.93,1.98.52,4.33-1.02,5.88l-14.71,14.71c-3.18,3.18-4.12,8.13-1.92,12.06,5.37,9.63,12.59,18.9,20.95,27.43,8.53,8.36,17.8,15.58,27.43,20.95,3.93,2.19,8.88,1.26,12.06-1.92l14.71-14.71c1.55-1.55,3.9-1.96,5.88-1.02Z"/>
                  </g>
                </svg>
              </Link>
              <Link target="_blank" aria-label="Connect on Linkedin" className="px-15 bg-modal/50 hover:brightness-125 py-2 rounded-md flex items-center justify-center border-trim/20 border" href="">
                <p className="text-secondary-text text-xl font-bold pr-0.5">Linked</p>
                <svg className="fill-secondary-text h-7 w-7 -translate-y-px" height="800px" width="800px" version="1.1" id="Layer_1" viewBox="0 0 382 382">
                  <path d="M347.445,0H34.555C15.471,0,0,15.471,0,34.555v312.889C0,366.529,15.471,382,34.555,382h312.889
                    C366.529,382,382,366.529,382,347.444V34.555C382,15.471,366.529,0,347.445,0z M118.207,329.844c0,5.554-4.502,10.056-10.056,10.056
                    H65.345c-5.554,0-10.056-4.502-10.056-10.056V150.403c0-5.554,4.502-10.056,10.056-10.056h42.806
                    c5.554,0,10.056,4.502,10.056,10.056V329.844z M86.748,123.432c-22.459,0-40.666-18.207-40.666-40.666S64.289,42.1,86.748,42.1
                    s40.666,18.207,40.666,40.666S109.208,123.432,86.748,123.432z M341.91,330.654c0,5.106-4.14,9.246-9.246,9.246H286.73
                    c-5.106,0-9.246-4.14-9.246-9.246v-84.168c0-12.556,3.683-55.021-32.813-55.021c-28.309,0-34.051,29.066-35.204,42.11v97.079
                    c0,5.106-4.139,9.246-9.246,9.246h-44.426c-5.106,0-9.246-4.14-9.246-9.246V149.593c0-5.106,4.14-9.246,9.246-9.246h44.426
                    c5.106,0,9.246,4.14,9.246,9.246v15.655c10.497-15.753,26.097-27.912,59.312-27.912c73.552,0,73.131,68.716,73.131,106.472
                    L341.91,330.654L341.91,330.654z"/>
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}