import { Github } from "@medusajs/icons"
import { Button, Heading } from "@medusajs/ui"
import Link from "next/link";
import LocalizedClientLink from "@modules/common/components/localized-client-link"

const Hero = () => {
  return (
    <div
      className="h-[75vh] w-full border-b border-ui-border-base relative bg-gradient-to-b from-green-100 to-green-50"
      style={{ backgroundImage: "linear-gradient(180deg, #D1FAE5, #ECFDF5)" }}
    >
      <div className="absolute inset-0 z-10 flex flex-col justify-center items-center text-center small:p-32 gap-8 px-4">
        <div className="space-y-5">
          <Heading
            level="h1"
            className="text-3xl small:text-5xl min-h-[56px] leading-tight text-ui-fg-base font-serif font-bold animate-text-reveal animation-delay-300"
          >
            India's 1st Grounding Mat Solution
          </Heading>
          <Heading
            level="h2"
            className="text-2xl small:text-3xl leading-tight text-ui-fg-subtle font-serif font-normal animate-text-reveal animation-delay-600"
          >
            Powered by Lyfas
          </Heading>
        </div>
        <LocalizedClientLink
          className="hover:text-ui-fg-base"
          href="/store"
          data-testid="nav-store-link"
        >
          <Button
            variant="primary"
            className="bg-emerald-500 text-white hover:bg-emerald-600 animate-enter animation-delay-900"
          >
            Shop Now
          </Button>
        </LocalizedClientLink>
      </div>
    </div>
  );
};

export default Hero;
