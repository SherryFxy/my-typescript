import { List } from "./list"
import { SearchPanel } from "./search-panel"
import {useState, useEffect} from 'react';

/**
 * npm start的时候，process.env读取的是 .env.development，
 * npm run build的时候，process.env读取的是 .env里面的变量
 */
const apiUrl = process.env.REACT_APP_API_URL;

export const ProjectListScreen = () => {
    const [param, setParam] = useState({
        name: '',
        personId: ''
    })
    const [users, setUsers] = useState([])
    const [list, setList] = useState([])

    useEffect(() => {
        fetch(`${apiUrl}/projects?name=${param.name}&personId=${param.personId}`).then(async response => {
            if (response.ok) {
                setList(await response.json())
            }
        })
    }, [param])

    useEffect(() => {
        fetch(`${apiUrl}/users`).then(async response => {
            if (response.ok) {
                setUsers(await response.json())
            }
        })
    }, [])

    return <div>
        <SearchPanel users={users} param={param} setParam={setParam} />
        <List users={users} list={list} />
    </div>
}