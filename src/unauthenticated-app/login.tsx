import { useAuth } from "../context/auth-context";
import { Form, Input, Button } from 'antd'

export const LoginScreen = () => {
    // const apiUrl = process.env.REACT_APP_API_URL;

    // const login = (param: {username: string, password: string}) => {
    //     fetch(`${apiUrl}/login`, {
    //         method: 'POST',
    //         headers: {
    //             'Content-type': 'application/json'
    //         },
    //         body: JSON.stringify(param)
    //     }).then(
    //         async (response: Response) => {
    //             if (response.ok) {
                    
    //             }
    //         }
    //     )
    // }
    const {login} = useAuth();

    // 鸭子类型(duck typing)：面向接口编程 而不是 面向对象编程
    const handleSubmit = (values: { username: string, password: string }) => {
        login(values);
    }
    return <Form onFinish={handleSubmit}>
        <Form.Item name={'username'} rules={[{required: true, message: '请输入用户名'}]}>
            <Input placeholder={'用户名'} type="text" id={'username'} />
        </Form.Item>
        <Form.Item name={'password'} rules={[{required:true, message: '请输入密码'}]}>
            <Input placeholder={'密码'} type="password" id={'password'} />
        </Form.Item>
        <Form.Item>
            <Button htmlType={'submit'} type="primary">登陆</Button>
        </Form.Item>
    </Form>
}