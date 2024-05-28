import React from "react";
import getConsult from "@/actions/getConsult";
import Container from "../components/Container";
import DetailsPage from "./DetailsPage";

const Consulting = async () => {
    const consult = await getConsult();
    return (
        <Container>
            <DetailsPage consult={consult} /> 
        </Container>
    );
}

export default Consulting;

