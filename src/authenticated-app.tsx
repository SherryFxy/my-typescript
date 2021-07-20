import { useAuth } from "./context/auth-context"
import { ProjectListScreen } from "./screens/project-list"
import styled from '@emotion/styled';
import { Row } from './components/lib';
import { Dropdown, Menu, Button } from 'antd'
// import softwareLogo from './assets/software-logo.svg'
import {ReactComponent as SoftwareLogo} from './assets/software-logo.svg'
/**
 * grid 和 flex 各自的应用场景
 * 1. 要考虑，是一维布局 还是 二维布局
 * 一般来说，一维布局用flex，二维布局用grid
 * 2. 是从内容出发还是从布局出发？
 * 从内容出发：你先有一组内容(数量一般不固定),然后希望他们均匀的分布在容器中，由内容自己的大小决定占据的空间
 * 从布局出发：先规划网格(数量一般比较固定)，然后再把元素往里填充
 * 从内容出发，用flex
 * 从布局出发，用grid
 *
 */
export const AuthenticatedApp = () => {
    const {logout, user} = useAuth();
    return <Container>
        <Header between={true}>
            <HeaderLeft gap={true}>
                {/* <img src={softwareLogo} /> */}
                <SoftwareLogo width={'18rem'} color={'rgb(38, 132, 255)'} />
                <h2>项目</h2>
                <h2>用户</h2>
            </HeaderLeft>
            <HeaderRight>
                {/* <button onClick={logout}>登出</button> */}
                <Dropdown overlay={<Menu>
                    <Menu.Item key={'layout'}>
                        <Button type="link" onClick={logout}>登出</Button>
                    </Menu.Item>
                </Menu>}>
                    <Button type={'link'} onClick={e => e.preventDefault()}>Hi, {user?.name}</Button>
                </Dropdown>
            </HeaderRight>
        </Header>
        <Main>
            <ProjectListScreen />
        </Main>
    </Container>
}

// const HeaderItem = styled.h3`
//     margin-right: 3rem;
// `

const Container = styled.div`
    display: grid;
    /* grid-template-columns: 20rem 1fr 20rem;
    grid-template-rows: 6rem 1fr 6rem;
    grid-template-areas:
    "header header header"
    "nav main aside"
    "footer footer footer"; */
    grid-template-rows: 6rem 1fr;
    height: 100vh;
    /* grid-gap: 1rem; */
`
// grid-area 用来给grid子元素起名字
// const Header = styled.header`
//     grid-area: header;
//     display: flex;
//     flex-direction: row;
//     align-items: center;
//     justify-content: space-between;
// `
const Header = styled(Row)`
padding: 3.2rem;
box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.1);
z-index: 1
`;
const HeaderLeft = styled(Row)``

const HeaderRight = styled.div``;
const Main = styled.main``