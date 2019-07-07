import React from "react";

import PageContainer from "../../page-content";
import PageHeader from "../../resusable-components/page-header";

import geirfa from "./geirfa.json";

class Vocabulary extends React.Component {
    render() {

        console.log(geirfa);

        return (
            <PageContainer>


                <PageHeader>
                    Vocabulary
                </PageHeader>


            </PageContainer>
        );
    }
}

export default Vocabulary;