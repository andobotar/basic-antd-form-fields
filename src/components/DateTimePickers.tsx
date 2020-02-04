import React, { useEffect } from 'react';
import { Button, DatePicker, Form, TimePicker } from 'antd';
import { FormComponentProps } from 'antd/es/form';

const { RangePicker } = DatePicker;

const dateFormat = 'YYYY-MM-DD';
const timeFormat = 'HH:mm:ss';
const dateTimeFormat = dateFormat + ' ' + timeFormat;

const DateTimePickers: React.FC<FormComponentProps> = ({ form }) => {
    const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = form;

    // the current date for validation
    const today = new Date();
    const todayISOString = today.toISOString().substring(0, 10);

    useEffect(() => {
        form.validateFields();
        // eslint-disable-next-line
    }, []);

    // Only show error after a field is touched - touched here means 'changed by user' and not 'changed and clicked away'
    const datePickerError = isFieldTouched('datePicker') && getFieldError('datePicker');
    const futureDatePickerError = isFieldTouched('futureDatePicker') && getFieldError('futureDatePicker');
    const rangePickerError = isFieldTouched('rangePicker') && getFieldError('rangePicker');
    const futureRangePickerError = isFieldTouched('futureRangePicker') && getFieldError('futureRangePicker');
    const dateTimePickerError = isFieldTouched('dateTimePicker') && getFieldError('dateTimePicker');
    const timePickerError = isFieldTouched('timePicker') && getFieldError('timePicker');

    const hasErrors = (fieldsError: ReturnType<typeof getFieldsError>) => {
        return Object.keys(fieldsError).some((field) => fieldsError[field]);
    };

    const handleSubmit: React.FormEventHandler = (event) => {
        event.preventDefault();
        form.validateFields((err, fieldsValue) => {
            if (err) {
                return;
            }
            // Should format date value before submit
            const rangeValue = fieldsValue['rangePicker'];
            const values = {
                ...fieldsValue,
                datePicker: fieldsValue['datePicker'].format(dateFormat),
                futureDatePicker: fieldsValue['futureDatePicker'].format(dateFormat),
                rangePicker: [rangeValue[0].format(dateFormat), rangeValue[1].format(dateFormat)],
                futureRangePicker: [rangeValue[0].format(dateFormat), rangeValue[1].format(dateFormat)],
                dateTimePicker: fieldsValue['dateTimePicker'].format(dateTimeFormat),
                timePicker: fieldsValue['timePicker'].format(timeFormat)
            };
            console.log('Received values of form: ', values);
        });
    };

    // validation rules
    const datePickerRule = [{ type: 'object', required: true, message: 'Please select a date!' }];
    const rangePickerRule = [{ type: 'array', required: true, message: 'Please select an interval!' }];
    const timePickerRule = [{ type: 'object', required: true, message: 'Please select time!' }];

    return (
        <Form onSubmit={handleSubmit}>
            {/* date picker */}
            <Form.Item label="DatePicker" validateStatus={datePickerError ? 'error' : ''} help={datePickerError || ''}>
                {getFieldDecorator('datePicker', {
                    rules: datePickerRule
                })(<DatePicker />)}
            </Form.Item>

            {/* date picker (no past dates) */}
            <Form.Item label="DatePicker (past dates are not allowed)" validateStatus={futureDatePickerError ? 'error' : ''} help={futureDatePickerError || ''}>
                {getFieldDecorator('futureDatePicker', {
                    rules: datePickerRule
                })(<DatePicker disabledDate={(d) => !d || !d.isAfter(todayISOString)} />)}
            </Form.Item>

            {/* range picker */}
            <Form.Item label="RangePicker" validateStatus={rangePickerError ? 'error' : ''} help={rangePickerError || ''}>
                {getFieldDecorator('rangePicker', {
                    rules: rangePickerRule
                })(<RangePicker />)}
            </Form.Item>

            {/* range picker (no past dates) */}
            <Form.Item
                label="RangePicker (past dates are not allowed)"
                validateStatus={futureRangePickerError ? 'error' : ''}
                help={futureRangePickerError || ''}
            >
                {getFieldDecorator('futureRangePicker', {
                    rules: rangePickerRule
                })(<RangePicker disabledDate={(d) => !d || !d.isAfter(todayISOString)} />)}
            </Form.Item>

            {/* datetime picker */}
            <Form.Item label="DateTimePicker" validateStatus={dateTimePickerError ? 'error' : ''} help={dateTimePickerError || ''}>
                {getFieldDecorator('dateTimePicker', {
                    rules: datePickerRule
                })(<DatePicker showTime format={dateTimeFormat} />)}
            </Form.Item>

            {/* time picker */}
            <Form.Item label="TimePicker" validateStatus={timePickerError ? 'error' : ''} help={timePickerError || ''}>
                {getFieldDecorator('timePicker', {
                    rules: timePickerRule
                })(<TimePicker />)}
            </Form.Item>

            {/* submit button */}
            <Form.Item>
                <Button htmlType="submit" disabled={hasErrors(getFieldsError())}>
                    Submit
                </Button>
            </Form.Item>
        </Form>
    );
};

// wrap our component in a HOC to get the form handling props
const WrappedDateTimePickers = Form.create()(DateTimePickers);

export default React.memo(WrappedDateTimePickers);
