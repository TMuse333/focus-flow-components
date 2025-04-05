import React from "react";
import ThreeBoxHero,{ThreeBoxHeroProps} from "../../components/herobanners/threeBoxHero/threeBoxHero";


export interface ServicePage1Props {
    heroContent:ThreeBoxHeroProps
}


const ServicePage1 = ({heroContent
}:ServicePage1Props):React.JSX.Element => {




    return (
        <>
        <main className={`w-screen`}>
            <ThreeBoxHero
            {...heroContent}
            />


        </main>
        </>
    )
}

export default ServicePage1