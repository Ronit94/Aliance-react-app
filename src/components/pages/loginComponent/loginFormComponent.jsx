import { Form, Icon, Input, Button, Checkbox, Select, Modal,message } from 'antd';
import HttpCommonService from '../../../services/commonService'
import AuthService from '../../../services/authService'
import { Redirect } from 'react-router-dom'
import React from 'react'
import './login.css'
const FormItem = Form.Item;
const Option = Select.Option;
class LoginForm extends React.Component {

    state = {
        college: [],
        state: [],
        rediret: false
    };

    constructor() {
        super();
        this.commonService = new HttpCommonService();
        this.auth = new AuthService();
    }

    componentDidMount() {
        this.setState({ college: [], state: [] });
        this.auth.fetchCollegeData({})
            .then(response => {
                let state = response.responseData.map(college => ({
                    text: `${college.College_state}`,
                    value: college.College_state,
                }));

                let college = response.responseData.map(college => ({
                    text: `${college.College_Name}`,
                    value: college.College_Name,
                }));

                state = [...new Map(state.map(o => [o.text, o])).values()]
                college = [...new Map(college.map(o => [o.text, o])).values()]

                this.setState({ state, college });
            })
    }
    success = () => {
        message.success('Welcome Admin');
    };
    handleSubmit = (e) => {
        e.preventDefault();
        this.setState({ rediret: false })
        this.props.form.validateFields((err, values) => {
            if (!err) {
                this.auth.login(values).then((response) => {
                    if (response.responseCode === 200) {
                        this.success()
                        this.setState({ rediret: true })
                    }
                })
            }
        });
    }

    info() {
        Modal.info({
            title: 'Terms and conditions',
            content: (
                <div>
                    <p>Some Terms and condition</p>
                </div>
            ),
            onOk() { },
        });
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        const { college, state, rediret } = this.state;

        if (rediret) {
            return <Redirect to="dashboard" />
        } else {
            return (
                <Form onSubmit={this.handleSubmit} className="login-form">
                    <FormItem>
                        {getFieldDecorator('adminName', {
                            rules: [{ required: true, message: 'Please input your registration id!' }],
                        })(
                            <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Registration ID" />
                        )}
                    </FormItem>
                    <FormItem>
                        {getFieldDecorator('adminPassword', {
                            rules: [{ required: true, message: 'Please input your Password!' }],
                        })(
                            <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
                        )}
                    </FormItem>
                    <FormItem>
                        {getFieldDecorator('collegeName', {
                            rules: [{ required: true, message: 'Please select college name' }],
                        })(
                            <Select className="collegeSelect"
                                showSearch
                                style={{ width: 200 }}
                                placeholder="Select a college"
                                optionFilterProp="children"
                                filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                            >
                                {college.map(d => <Option key={d.value}>{d.text}</Option>)}
                            </Select>
                        )}
                    </FormItem>
                    <FormItem>
                        {getFieldDecorator('collegeState', {
                            rules: [{ required: true, message: 'Please select college state name' }],
                        })(
                            <Select className="collegeSelect"
                                showSearch
                                style={{ width: 200 }}
                                placeholder="Select a state"
                                optionFilterProp="children"
                                onChange={this.handleChange}
                                onFocus={this.handleFocus}
                                onBlur={this.handleBlur}
                                filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                            >
                                {state.map(d => <Option key={d.value}>{d.text}</Option>)}
                            </Select>
                        )}
                    </FormItem>
                    <FormItem>
                        {getFieldDecorator('remember', {
                            valuePropName: 'checked',
                            initialValue: true,
                        })(
                            <Checkbox className="RememberMe">Remember me</Checkbox>
                        )}
                        <a className="login-form-forgot" href="/register">Forgot password</a>
                        <Button type="primary" htmlType="submit" className="login-form-button">
                            Log in
              </Button>
                        <Button onClick={this.info} className="anchor">Terms and condition</Button>
                    </FormItem>
                </Form>
            );
        }
    }
}


export default LoginForm