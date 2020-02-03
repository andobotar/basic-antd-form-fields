import React, { useState, useEffect } from 'react';
import { Form, Icon, Input, InputNumber, Select, Checkbox, Radio, Button } from 'antd';
import { FormComponentProps } from 'antd/es/form';

interface UserFormProps extends FormComponentProps {
    username: string;
    password: string;
    email: string;
    age: number;
}

interface Option {
    id: string;
    displayName: string;
}

const countryOptions = [
    { id: 'HU', displayName: 'Hungary' },
    { id: 'UK', displayName: 'United Kingdom' },
    { id: 'US', displayName: 'United States' }
];

const colorOptions = [
    { id: 'red', displayName: 'Red' },
    { id: 'green', displayName: 'Green' },
    { id: 'blue', displayName: 'Blue' }
];

const sexOptions = [
    { id: 'M', displayName: 'Male'},
    { id: 'F', displayName: 'Female'},
]

const BasicForm: React.FC<UserFormProps> = ({ form }: UserFormProps) => {
    const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched, getFieldValue } = form;

    const [countries, setCountries] = useState<Array<Option>>([]);
    const [colors, setColors] = useState<Array<Option>>([]);
    const [sexes, setSexes] = useState<Array<Option>>([]);

    useEffect(() => {
        form.validateFields();
        setCountries(countryOptions);
        setColors(colorOptions);
        setSexes(sexOptions);
        // eslint-disable-next-line
    }, []);

    // Only show error after a field is touched - touched here means 'changed by user' and not 'changed and clicked away'
    const usernameError = isFieldTouched('username') && getFieldError('username');
    const passwordError = isFieldTouched('password') && getFieldError('password');
    const emailError = isFieldTouched('email') && getFieldError('email');
    const ageError = isFieldTouched('age') && getFieldError('age');
    const countryError = isFieldTouched('country') && getFieldError('country');
    const checkboxError = isFieldTouched('accept') && getFieldError('accept');

    const hasErrors = (fieldsError: Record<string, string[] | undefined>) => {
        return Object.keys(fieldsError).some(field => fieldsError[field]);
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
            }
        });
    };

    // validation rules
    const usernameRule = [{ required: true, message: 'Please input your username!' }];
    const passwordRule = [{ required: true, message: 'Please input your Password!' }];
    const emailRule = [{ type: 'email', message: 'Email format is not correct!' }];
    const ageRule = [
        { type: 'number', message: 'Must be a number' },
        { type: 'number', min: 18, max: 100, message: 'Must be between 18 and 100' }
    ];
    const countryRule = [{ required: true, message: 'Please choose a country!' }];
    const acceptTermsRule = [{ required: true, message: 'You must accept the terms and conditions to continue!' }];

    return (
        // form layouts can be 'horizontal' (default), 'vertical' or 'inline'
        <Form layout="horizontal" onSubmit={handleSubmit}>
            {/* text field - validation, icon */}
            <Form.Item label="Username" validateStatus={usernameError ? 'error' : ''} help={usernameError || ''}>
                {getFieldDecorator('username', {
                    rules: usernameRule
                })(<Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" />)}
            </Form.Item>

            {/* password field - validation, two-tone icon */}
            <Form.Item label="Password" validateStatus={passwordError ? 'error' : ''} help={passwordError || ''}>
                {getFieldDecorator('password', {
                    rules: passwordRule
                })(
                    <Input
                        prefix={<Icon type="lock" theme="twoTone" twoToneColor="#058505" />}
                        type="password"
                        placeholder="Password"
                    />
                )}
            </Form.Item>

            {/* email field - built-in email validation */}
            <Form.Item label="Email" validateStatus={emailError ? 'error' : ''} help={emailError || ''}>
                {getFieldDecorator('email', {
                    rules: emailRule
                })(<Input prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Email" />)}
            </Form.Item>

            {/* number field - type, min and max validation - multiple validation messages */}
            <Form.Item label="Age" validateStatus={ageError ? 'error' : ''} help={ageError ? ageError[0] : ''}>
                {getFieldDecorator('age', { rules: ageRule })(<InputNumber placeholder="Age" />)}
            </Form.Item>

            {/* select box */}
            <Form.Item label="Country" validateStatus={countryError ? 'error' : ''} help={countryError || ''}>
                {getFieldDecorator('country', { rules: countryRule })(
                    <Select placeholder="Please choose a counrty">
                        {countries.map(country => (
                            <Select.Option key={country.id} value={country.id}>
                                {country.displayName}
                            </Select.Option>
                        ))}
                    </Select>
                )}
            </Form.Item>

            {/* multiselect */}
            <Form.Item label="Color">
                {getFieldDecorator('color')(
                    <Select mode="multiple" placeholder="What's your favorite color?">
                        {colors.map(color => (
                            <Select.Option key={color.id} value={color.id}>
                                {color.displayName}
                            </Select.Option>
                        ))}
                    </Select>
                )}
            </Form.Item>

            {/* radio */}
            <Form.Item>
                {getFieldDecorator('sex')(
                    <Radio.Group>
                        {sexes.map(sex => (
                            <Radio key={sex.id} value={sex.id}>{sex.displayName}</Radio>
                        ))}
                    </Radio.Group>
                )}
            </Form.Item>

            {/* checkbox */}
            <Form.Item label="" validateStatus={checkboxError ? 'error' : ''} help={checkboxError || ''}>
                {/* valuePropName: 'checked' lets the 'validateFields' function find the value of the checkbox */}
                {getFieldDecorator('accept', { rules: acceptTermsRule, valuePropName: 'checked' })( 
                    <Checkbox>
                        Accept terms and conditions <span style={{ color: 'red' }}>*</span>
                    </Checkbox>
                )}
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

// wrap our component in a HOC to get the form handling props
const WrappedBasicForm = Form.create()(BasicForm);

export default React.memo(WrappedBasicForm);
