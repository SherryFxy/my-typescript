import {User} from './search-panel';

interface Project{
    id: number,
    name: string,
    personId: number,
    organization: string,
    created: number
}
interface UserProps{
    users: User[],
    list: Project[],
}

export const List = ({users, list}: UserProps) => {
    return <table>
        <thead>
            <tr>
                <th>名称</th>
                <th>负责人</th>
            </tr>
        </thead>
        <tbody>
            {
                list.map(project => <tr key={project.id}>
                    <td>{project.name}</td>
                    {/* find返回通过函数条件的第一个元素，之后的值不会再执行函数判断，若无匹配的值，返回undefined */}
                    <td>{users.find(user => user.id === project.personId)?.name || '未知'}</td>
                </tr>)
            }
        </tbody>
    </table>
}