import { useAuth } from "../context/auth-context";

export const RegisterScreen = () => {
    const {register, user} = useAuth();

    // 鸭子类型(duck typing)：面向接口编程 而不是 面向对象编程
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const username = (event.currentTarget.elements[0] as HTMLInputElement).value
        const password = (event.currentTarget.elements[1] as HTMLInputElement).value
        register({username, password});
    }
    return <form onSubmit={handleSubmit}>
        <div>
            <label htmlFor="username">用户名</label>
            <input type="text" id={'username'} />
        </div>
        <div>
            <label htmlFor="password">密码</label>
            <input type="password" id={'password'} />
        </div>
        <button type={'submit'}>注册</button>
    </form>
}