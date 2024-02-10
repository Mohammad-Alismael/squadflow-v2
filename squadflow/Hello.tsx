import React from 'react';
import PropTypes from 'prop-types';

Hello.propTypes = {

};

function Hello({title}: {title: string}) {
    return (
        <div>{title}</div>
    );
}

export default Hello;