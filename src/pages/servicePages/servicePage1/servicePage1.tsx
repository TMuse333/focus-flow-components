import React from "react";
import CarouselGrid, { CarouselGridProps } from "../../../components/carousels/gridCarousel/gridCarousel";
import TiltingContent, { TiltingContentProps } from "../../../components/contentPieces/tiltingContent/tiltingContent";
import VerticalImageTextBox, { VerticalImageTextBoxProps } from "../../../components/contentPieces/verticalImageTextBox/verticalImageTextBox";
import ThreeBoxHero,{ThreeBoxHeroProps} from "../../../components/herobanners/threeBoxHero/threeBoxHero";
import FeatureBoxes, { FeatureBoxProps } from "../../../components/textComponents/featureBoxes/featureBoxes";
import CircleSteps, {CircleStepsProps} from "../../../components/carousels/stepsCarousel/stepsCarousel";

export interface ServicePage1Props {
    heroContent:ThreeBoxHeroProps,
    introContent:TiltingContentProps
    features:FeatureBoxProps,
    steps:CircleStepsProps
    carouselImages:CarouselGridProps
    closingContent:VerticalImageTextBoxProps
    textColor:string,
    bgColor:string
}


const ServicePage1 = ({heroContent,
    introContent, features,
    carouselImages,
    closingContent,
    textColor,
    bgColor,
    steps
}:ServicePage1Props):React.JSX.Element => {




    return (
        <>
        <main className={`w-screen ${textColor}
        ${bgColor} space-y-24`}>
            <ThreeBoxHero
            {...heroContent}
            />
            <TiltingContent
            {...introContent}
            />
            <FeatureBoxes
            {...features}
            />
            <CircleSteps
            {...steps}
            />
            <CarouselGrid
            {...carouselImages}
            />
            <VerticalImageTextBox
            {...closingContent}
            />



        </main>
        </>
    )
}

export default ServicePage1