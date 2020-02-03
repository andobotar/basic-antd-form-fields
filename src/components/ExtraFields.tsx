import React, { useState, useEffect } from 'react';

type Props = {};

const ExtraFields: React.FC<Props> = ({}: Props) => {

    const [data, setData] = useState();

    useEffect(() => {
            console.log('in useeffect');
            
    }, [])

    return (
        <>
            hellllooo
        </>
    )
}

export default React.memo(ExtraFields);