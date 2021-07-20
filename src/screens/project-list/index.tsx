import { List } from "./list"
import { SearchPanel } from "./search-panel"
import {useState, useEffect} from 'react';
import { cleanObject, useDebounce, useMount } from "../../utils";
import { useHttp } from "../../utils/http";
import styled from '@emotion/styled'

/**
 * npm start的时候，process.env读取的是 .env.development，
 * npm run build的时候，process.env读取的是 .env里面的变量
 */

export const ProjectListScreen = () => {
    // 状态提升
    const [param, setParam] = useState({
        name: '',
        personId: ''
    })
    const [users, setUsers] = useState([])
    const [list, setList] = useState([])

    const debouncedParam = useDebounce(param, 200);

    const client = useHttp();

    useEffect(() => {
        client('projects', {data: cleanObject(debouncedParam)}).then(setList)
        // fetch(`${apiUrl}/projects?name=${param.name}&personId=${param.personId}`)
        // fetch(`${apiUrl}/projects?${qs.stringify(cleanObject(debouncedParam))}`).then(async response => {
        //     if (response.ok) {
        //         setList(await response.json())
        //     }
        // })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [debouncedParam])

    useMount(() => {
        client('users').then(setUsers);
        // fetch(`${apiUrl}/users`).then(async response => {
        //     if (response.ok) {
        //         setUsers(await response.json())
        //     }
        // })
    })

    return <Container>
        <h1>项目列表</h1>
        <SearchPanel users={users} param={param} setParam={setParam} />
        <List users={users} list={list} />
    </Container>
}

const Container = styled.div`
    padding: 3.2rem;
`