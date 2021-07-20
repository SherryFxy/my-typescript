import {ReactNode} from 'react'
import { AuthProvider } from './auth-context'
import {QueryClient, QueryClientProvider} from 'react-query'

// 声明一个 object 类型的变量，这个 object 里面有一个叫 children 的属性，
// 类型是 ReactNode。完整写法是 {children: children}: {children: ReactNode}
export const AppProvider = ({children}: {children: ReactNode}) => {
    return <QueryClientProvider client={new QueryClient()}>
                <AuthProvider>
                {children}
            </AuthProvider>
        </QueryClientProvider>
}