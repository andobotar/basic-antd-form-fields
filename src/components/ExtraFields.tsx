import React, { useState, useEffect } from 'react';
import { Form, Cascader, Switch, Button, Slider } from 'antd';
import { FormComponentProps } from 'antd/es/form';
import { teamOptions } from '../util/cascade-options';

interface CascadeOption {
    value: string;
    label?: React.ReactNode;
    disabled?: boolean;
    children?: CascadeOption[];
}

const ExtraFields: React.FC<FormComponentProps> = ({ form }) => {
    const { getFieldDecorator, getFieldsError, getFieldValue } = form;

    const [footballTeamOptions, setFootballTeamOptions] = useState<Array<CascadeOption>>([]);

    useEffect(() => {
        setFootballTeamOptions(teamOptions);
    }, []);

    const hasErrors = (fieldsError: ReturnType<typeof getFieldsError>) => {
        return Object.keys(fieldsError).some((field) => fieldsError[field]);
    };

    const handleSubmit: React.FormEventHandler = (event) => {
        event.preventDefault();
        form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
            }
        });
    };

    return (
        <Form onSubmit={handleSubmit}>
            {/* switch */}
            <Form.Item label="I like chocolate">
                {/* To avoid 'undefined' as an answer, provide an 'initialValue' */}
                {getFieldDecorator('chocolate-switch', { valuePropName: 'checked', initialValue: true })(
                    <Switch />
                    // with icons:
                    // <Switch checkedChildren={<Icon type="check" />} unCheckedChildren={<Icon type="close" />} />
                )}
            </Form.Item>

            {/* slider */}
            <Form.Item label="Level of experience">
                {getFieldDecorator('experience')(
                    <Slider marks={{ 0: 'Fogalmatlan', 25: 'Kezdő', 50: 'Haladó', 75: 'Magabiztos', 100: 'Beképzelt' }} tipFormatter={(value) => value + '%'} />
                )}
            </Form.Item>

            {/* cascader - returns a string[] */}
            <Form.Item label="Football team picker">
                {getFieldDecorator('Football team')(<Cascader options={footballTeamOptions} placeholder="please choose a team" />)}
            </Form.Item>

            {/* submit button */}
            <Form.Item>
                <Button htmlType="submit" disabled={hasErrors(getFieldsError()) || getFieldValue('accept') === false}>
                    Submit
                </Button>
            </Form.Item>
        </Form>
    );
};

const WrappedExtraFields = Form.create()(ExtraFields);
export default React.memo(WrappedExtraFields);
