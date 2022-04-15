import React, { Component } from 'react';
import { Image } from 'semantic-ui-react';

class UserProfileImage extends Component {
    state = {}

    render() {
        return (
            <Image
                size='medium'
                rounded
                src='./images/kobey.jpeg'
            />
        );
    }
}

export default UserProfileImage;