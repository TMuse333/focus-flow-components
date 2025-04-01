
import ImageTextBox,{ ImageTextBoxProps } from "../../components/contentPieces/imageTextBox/imageTextBox";
import FullBodyHero, {FullBodyHeroProps} from "../../components/herobanners/fullBodyHero/fullBodyHero";
import ExperienceCard,{ExperienceCardProps} from "../../components/contentPieces/experienceCard/experienceCard";
import TextAndList,{TextAndListProps} from "../../components/textComponents/textAndList/textAndList";
import GoogleReviews, {GoogleReviewsProps} from "../../components/carousels/googleReviews/googleReviews";
import ParallaxText, {ParallaxTextProps} from "../../components/contentPieces/parallaxText/parallaxText";
import VerticalImageTextBox, {VerticalImageTextBoxProps} from "../../components/contentPieces/verticalImageTextBox/verticalImageTextBox";
import React from "react";



// Assuming the other interfaces are imported or defined somewhere
export interface LandingPage1Props {
//   heroProps: FullBodyHeroProps;
  introSection:{
    title: string;
    src: string;
    alt: string;
    description: string;
    aspects: string[];
    link: string;
    buttonText: string;
    reverse?: boolean;
    aspectHeader: string;
    bgColor?: string;
    buttonColor?: string;
    hoverTextColor?: string;
    objectContain?: boolean;
  }
//   whyUs: TextAndListProps;
//   service1Intro: ImageTextBoxProps;
//   service2Intro: ImageTextBoxProps;
//   reviews: GoogleReviewsProps;
//   service3Intro: ParallaxTextProps;
//   closer: VerticalImageTextBoxProps;
//   textColor: string;
//   bgColor: string;
}

const LandingPage1 = ({
//   heroProps,
  introSection,
//   whyUs,
//   service1Intro,
//   service2Intro,
//   reviews,
//   service3Intro,
//   closer,
//   textColor,
//   bgColor,
}: LandingPage1Props): React.JSX.Element => {
  return (
    <main 
    // className={`bg-${bgColor} text-${textColor} w-screen`}
    >
        <section className='w-screen overflow-x-hidden'>

   

      {/* <FullBodyHero {...heroProps} /> */}
      <ExperienceCard {...introSection} />
      {/* <TextAndList {...whyUs} /> */}
      {/* <ImageTextBox {...service1Intro} />
      <ImageTextBox {...service2Intro} />
      <GoogleReviews {...reviews} />
      </section>
      <ParallaxText {...service3Intro} />
      <section className='w-screen overflow-x-hidden'>

      <VerticalImageTextBox {...closer} /> */}
      </section>
    </main>
  );
};

export default LandingPage1;
