import React from "react";
import { Container } from "react-bootstrap";
const LayoutFooter = () => {
    return (
        <React.Fragment>
            <footer className="bg-light border-top py-3 fixed-bottom" style={{zIndex:-1}}>
                <Container>
                    &copy; Test - 2023
                </Container>
            </footer>
        </React.Fragment>
    );
}
export default LayoutFooter;