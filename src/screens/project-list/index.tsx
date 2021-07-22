import { List } from "./list"
import { SearchPanel } from "./search-panel"
import { useState } from 'react';
import { useDebounce } from "../../utils";
import { useProjects } from '../../utils/project'
import { useUsers } from '../../utils/user'
// import { useHttp } from "../../utils/http";
import styled from '@emotion/styled';

import { Typography } from 'antd'

// import { useAsync } from '../../utils/use-async'


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
    const debouncedParam = useDebounce(param, 200);
    const {data: list, isLoading, error } = useProjects(debouncedParam)
    const {data: users } = useUsers()

    return <Container>
        <h1>项目列表</h1>
        <SearchPanel users={users || []} param={param} setParam={setParam} />
        {error ? <Typography.Text type={"danger"}>{error.message}</Typography.Text> : null}
        <List loading={isLoading} users={users || []} dataSource={list || []} />
    </Container>
}

const Container = styled.div`
    padding: 3.2rem;
`