import React from "react";
import CarouselHero, { CarouselHeroProps } from "../../../components/herobanners/carouselHero/carouselHero";
import CountUpImageText, { CountUpImageTextProps } from "../../../components/contentPieces/countUpImageText/countUpImageText";
import FeatureBoxes, { FeatureBoxProps } from "../../../components/textComponents/featureBoxes/featureBoxes";
import VerticalImageTextBox, { VerticalImageTextBoxProps } from "../../../components/contentPieces/verticalImageTextBox/verticalImageTextBox";
import Testimonials, { TestimonialProps } from "../../../components/textComponents/testimonials/testimonials";
import ExperienceCard, { ExperienceCardProps } from "../../../components/contentPieces/experienceCard/experienceCard";

// Define the interface for the component props
export interface LandingPage2Props {
  carouselHero: CarouselHeroProps;
  countUpImageText: CountUpImageTextProps;
  featureBoxes: FeatureBoxProps;
  experienceCard1: ExperienceCardProps;
  experienceCard2: ExperienceCardProps;
  testimonials:TestimonialProps
  closer: VerticalImageTextBoxProps;
  bgColor: string;
  textColor: string;
}

const LandingPage2 = ({
  carouselHero,
  countUpImageText,
  featureBoxes,
  experienceCard1,
  experienceCard2,
  testimonials,
  closer,
  bgColor,
  textColor,
}: LandingPage2Props): React.JSX.Element => {
  return (
    <main className={`${bgColor} ${textColor} w-screen`}>
      <section className="w-screen overflow-x-hidden">
        <CarouselHero {...carouselHero} />
        <CountUpImageText {...countUpImageText} />
        <FeatureBoxes {...featureBoxes} />
      </section>

      <section className="w-screen overflow-x-hidden">
        <ExperienceCard {...experienceCard1} />
        <ExperienceCard {...experienceCard2} />
      </section>

      <section className="w-screen overflow-x-hidden">
        <Testimonials {...testimonials} />
      </section>

      <section className="w-screen overflow-x-hidden">
        <VerticalImageTextBox {...closer} />
      </section>
    </main>
  );
};

export default LandingPage2;
