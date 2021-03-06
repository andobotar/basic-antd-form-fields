import React, { useState, useEffect } from 'react';
import { Transfer } from 'antd';
import { TransferItem, TransferProps } from 'antd/lib/transfer';

import { transferData } from '../util/transfer-data';

const TransferComponent: React.FC = () => {
    const [characters, setCharacters] = useState<Array<TransferItem>>([]);
    const [targetKeys, setTargetKeys] = useState<Array<string>>([]);
    const [selectedKeys, setSelectedKeys] = useState<Array<string>>([]);

    useEffect(() => {
        setCharacters(transferData);
        if (characters) {
            const targetCharacterKeys = characters.filter((character: TransferItem) => character.initialPosition === 'right').map((char) => char.key);
            setTargetKeys(targetCharacterKeys);
        }
    }, [characters]);

    const handleChange: TransferProps['onChange'] = (nextTargetKeys) => {
        setTargetKeys(nextTargetKeys);
        console.log('Target Character Keys: ', nextTargetKeys);
        // To get the modified source array:
        console.log(
            'Source Character Keys: ',
            transferData.filter((item) => !nextTargetKeys.includes(item.key))
        );
    };

    const handleSelectChange: TransferProps['onSelectChange'] = (sourceSelectedKeys, targetSelectedKeys) => {
        setSelectedKeys([...sourceSelectedKeys, ...targetSelectedKeys]);
    };

    return (
        <>
            <Transfer
                dataSource={characters}
                titles={['Source', 'Target']}
                targetKeys={targetKeys}
                selectedKeys={selectedKeys}
                onChange={handleChange}
                onSelectChange={handleSelectChange}
                render={(item) => item.title || ''}
            />
        </>
    );
};

export default React.memo(TransferComponent);
