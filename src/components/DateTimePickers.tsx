import React, { useState, useEffect } from 'react';

type Props = {};

const DateTimePickers: React.FC<Props> = ({}: Props) => {

    const [data, setData] = useState();

    useEffect(() => {
            console.log('in useeffect')
    }, [])

    return (
        <>
            hello
        </>
    )
}

export default React.memo(DateTimePickers);