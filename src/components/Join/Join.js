import React from 'react';
import FacebookLogin from 'react-facebook-login';

const responseFacebook = (response) => {
    localStorage.setItem('userDetails', JSON.stringify(response))

    window.location.assign('/chat')
  }
const Join = () => {
    return (
        <FacebookLogin
            appId="256492801189720"
            fields="name,email,picture,gender,birthday"
            callback={responseFacebook} />
    );
};

export default Join;