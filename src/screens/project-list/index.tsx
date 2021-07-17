import { List } from "./list"
import { SearchPanel } from "./search-panel"
import {useState, useEffect} from 'react';
import * as qs from 'qs';
import { cleanObject, useDebounce, useMount } from "../../utils";
import { useHttp } from "../../utils/http";

/**
 * npm start的时候，process.env读取的是 .env.development，
 * npm run build的时候，process.env读取的是 .env里面的变量
 */
const apiUrl = process.env.REACT_APP_API_URL;

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
    }, [debouncedParam])

    useMount(() => {
        client('users').then(setUsers);
        // fetch(`${apiUrl}/users`).then(async response => {
        //     if (response.ok) {
        //         setUsers(await response.json())
        //     }
        // })
    })

    return <div>
        <SearchPanel users={users} param={param} setParam={setParam} />
        <List users={users} list={list} />
    </div>
}