import React from 'react';
import { css } from "@emotion/core";
import ClockLoader from "react-spinners/ClockLoader";



// Can be a string as well. Need to ensure each key-value pair ends with ;
const override = css`
  display: block;
`;

const wrapper = {
    width : '100%',
    height : '100vh',
    display: 'flex',
    justifyContent : 'center',
    alignItems : 'center'
}

const Loader = () => {
    return (
        <div className="spinner-wrapper" style={wrapper}>
            <div>
                <ClockLoader color={"#07203A"} loading={true} css={override} size={35} margin={2} />
            </div>
        </div>
    )
}

export default Loader
