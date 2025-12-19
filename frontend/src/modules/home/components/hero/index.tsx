import { Button, Heading } from "@medusajs/ui"
import Link from "next/link"
import Image from "next/image"

const Hero = () => {
  return (
    <div className="h-[25vh] w-full border-b border-ui-border-base relative bg-ui-bg-subtle overflow-hidden">
      <Image
        src="/babypic.jpg"
        alt="Hero Background"
        fill
        className="object-cover z-0"
        priority
      />
      <div className="absolute inset-0 z-10 flex flex-col justify-center items-center text-center small:p-32 gap-6">
        <Heading
          level="h1"
          className="text-xl leading-10 text-ui-fg-base font-normal text-center"
        >
          Made, Found, Custom, and Supplied By Praise
        </Heading>
        <Link href="/store">
          <Button variant="primary" className="w-[7rem] h-[2rem] text-[1rem]">
            Shop All
          </Button>
        </Link>
      </div>

      <div className="absolute bottom-4 left-4 z-20 flex flex-col gap-2 text-ui-fg-base text-medium-regular">
        <Link
          href="https://www.tiktok.com/@.praisemcb?_r=1&_t=ZP-92LwzgBsRVn"
          target="_blank"
          className="flex items-center gap-2"
        >
           <Image
            src="/tiktok.svg"
            alt="Tiktok"
            width={15}
            height={15}
          />
          <span>@.praisemcb</span>
        </Link>
        <Link
          href="https://www.depop.com/dbruhhhh/"
          target="_blank"
          className="flex items-center gap-2"
        >
          <Image
            src="/depop.svg"
            alt="Depop"
            width={15}
            height={15}
          />
          <span>@dbruhhhh</span>
        </Link>
      </div>
    </div>
  )
}

export default Hero
