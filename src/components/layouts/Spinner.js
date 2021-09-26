import React from 'react';
import { css } from "@emotion/core";
import MoonLoader from "react-spinners/MoonLoader";



// Can be a string as well. Need to ensure each key-value pair ends with ;
const override = css`
  display: block;
`;

const wrapper = {
    width : '100%',
    minHeight: '50vh',
    display: 'flex',
    justifyContent : 'center',
    alignItems : 'center'
}

const Spinner = () => {
    return (
        <div className="spinner-wrapper" style={wrapper}>
            <MoonLoader color={"#07203A"} loading={true} css={override} size={30} />
        </div>
    )
}

export default Spinner
