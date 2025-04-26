import { GoArrowRight } from "react-icons/go";
import Section from "./Section";
import H2 from "../UI/H2";

const AboutSection = () => {



  return (
    <Section classes='h-fit mb-44 max-w-[90%] overflow-hidden'>
      <div className="flex flex-wrap gap-20 justify-between">
        <div className="lg:basis-2/3 text-center lg:text-left flex flex-col gap-10 lg:items-start justify-center ">
          <H2 data-aos="fade-up">REVIVING
            CULTURE,
            REDEFINING
            IDENTITY</H2>
          <p className=" text-xl lg:text-2xl" data-aos="fade-up">Grass Roots is a 100% Egyptian company that aims to revive heritage and spread the culture rooted in our Egyptian identity — whether ancient or modern.
            <br /> <br /> Through curated commercial activities, we offer products and services that reflect our identity in a modern, tourist-friendly form that celebrates Egyptian culture globally.</p>
          {/* <button className="text-2xl text-[#ffc000]" data-aos="fade-up">Learn More <GoArrowRight className="inline" size={35} /></button> */}
        </div>
        <img src="khan.webp" alt="" className=" lg:h-[600px] object-cover rounded-2xl" data-aos="fade-left" />
      </div>
    </Section>
  )
}

export default AboutSection