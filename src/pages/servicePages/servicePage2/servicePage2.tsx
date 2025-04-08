import React from "react";
import ThreeBoxHero, {ThreeBoxHeroProps} from "../../../components/herobanners/threeBoxHero/threeBoxHero";
import ExperienceCard, {ExperienceCardProps} from "../../../components/contentPieces/experienceCard/experienceCard";
import FeatureBoxes, {FeatureBoxProps} from "../../../components/textComponents/featureBoxes/featureBoxes";
import Testimonials, {TestimonialProps} from "../../../components/textComponents/testimonials/testimonials";
import CircleSteps, {CircleStepsProps} from "../../../components/carousels/stepsCarousel/stepsCarousel";
import TextAndList, {TextAndListProps} from "../../../components/textComponents/textAndList/textAndList";


export interface ServicePage2Props {
    heroContent:ThreeBoxHeroProps,
    introContent:ExperienceCardProps,
    features:FeatureBoxProps,
    testimonials?:TestimonialProps,
    steps:CircleStepsProps,
    gettingStarted:TextAndListProps,
    textColor?:string,
    bgColor:string,
    isMobile:boolean
}

const ServicePage2 = ({
    heroContent,
    introContent,
    features,
    testimonials,
    steps,
    gettingStarted,
    textColor,
    bgColor,
    isMobile
  }:ServicePage2Props):React.JSX.Element => {



    return (
        <section className={`overflow-x-hidden space-y-20
        ${bgColor} ${textColor ? `${textColor}` : ''}`}>

            <ThreeBoxHero
            {...heroContent}
            />
            <ExperienceCard
            {...introContent}
            />
            <FeatureBoxes
            {...features}
            />
            <CircleSteps
            {...steps}
            />
            {testimonials && (
                <Testimonials
                {...testimonials}
                />
            )}
            <TextAndList
            {...gettingStarted}
            isMobile={isMobile}
            />
            




        </section>
    )
  }

  export default ServicePage2