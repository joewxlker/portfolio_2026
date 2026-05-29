export const STYLES = {
  h1: "lg:text-7xl md:text-6xl text-5xl -translate-y-1 font-fancy font-black text-white",
  h2: "lg:text-3xl md:text-2xl text-2xl font-fancy font-bold text-secondary-text text-center py-2",
  h3: "lg:text-3xl lg:text-3xl text-2xl text-primary-text font-sans text-left",
  h4: "lg:text-2xl lg:text-2xl text-xl font-medium text-primary-text font-sans truncate",
  p: "text-secondary-text font-light font-sans lg:text-lg text-auto",
  article: "flex-1 flex flex-col gap-4",

  tagline: "xl:text-3xl md:text-3xl text-2xl font-sans text-stone-200 text-left",
  caption: "text-secondary-text font-light font-sans lg:text-auto text-sm text-center",
  section: "flex flex-col items-center w-full gap-5 relative lg:pt-20 pt-15",
  sectionBody: "w-[90%] md:max-w-[90%] max-w-125 items-stretch m-auto flex flex-col gap-10",
  subSection: "w-full flex md:flex-row flex-col gap-5 py-0",

  secondary_button: "mr-1 cursor-pointer relative hover:brightness-125 border md:px-6 md:py-2 px-3 py-2 text-white text-center lg:text-lg font-semibold font-sans bg-primary-dark/70 dark:bg-primary-dark/30 border-primary-dark-shadow shadow-[5px_5px_var(--color-primary-dark-shadow)]",
  primary_button: "mr-1 cursor-pointer relative hover:brightness-125 border md:px-6 md:py-2 px-3 py-2 text-white text-center lg:text-lg font-semibold font-sans bg-primary/70 dark:bg-primary/30 border-primary-shadow shadow-[5px_5px_var(--color-primary-shadow)]",

  pending_button: "mr-1 cursor-pointer relative hover:brightness-125 border md:px-6 md:py-2 px-3 py-2 text-white text-center lg:text-lg font-semibold font-sans cursor-default bg-pending/70 dark:bg-pending/30 border-pending-shadow text-white/60 pointer-events-none shadow-[5px_5px_var(--color-pending-shadow)]",
  success_button: "mr-1 cursor-pointer relative hover:brightness-125 border md:px-6 md:py-2 px-3 py-2 text-white text-center lg:text-lg font-semibold font-sans cursor-default bg-success/70 dark:bg-success/30 border-success-shadow pointer-events-none shadow-[5px_5px_var(--color-success-shadow)]",
  error_button: "mr-1 cursor-pointer relative hover:brightness-125 border md:px-6 md:py-2 px-3 py-2 text-white text-center lg:text-lg font-semibold font-sans cursor-default bg-error/70 dark:bg-error/30 border-error-shadow pointer-events-none shadow-[5px_5px_var(--color-error-shadow)] shake-onmount",
};

export const LINKS = {
  metrics: process.env.NEXT_PUBLIC_METRICS_URL ?? "",
  image_api_source_code: "https://github.com/joewxlker/image_api",
  ansible_source_code: "",
  linkedin_profile: "https://www.linkedin.com/in/joe-walker-89312a22a/",
  whatsapp: "https://wa.me/+995598081800",
  github_profile: "https://github.com/joewxlker",
}