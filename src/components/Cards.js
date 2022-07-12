import React from 'react';
import WebCard from './WebCard';

const ClientCards = ({client, name}) => {

    return (
        <>
            {client.roles.map((role, index) => <WebCard key={`${role.name}-${index}`} role={role} name={name} />)}
        </>
    )
}

export default ClientCards;