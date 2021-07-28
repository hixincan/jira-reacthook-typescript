import {SearchPanel} from './search-panel'
import {List} from './list'
import {useEffect, useState} from "react";
import qs from "qs";
import {cleanObject} from "../../util";

const apiUrl = process.env.REACT_APP_API_URL;

export const ProjectList = ()=>{
    const [users, setUsers] = useState([])
    const [param, setParam] = useState({
        name: '',
        personId: ''
    });
    const [list, setList] = useState([])

    // 当param变化时，请求数据
    useEffect(()=>{
        fetch(`${apiUrl}/projects?${qs.stringify(cleanObject(param))}`).then(async (res)=>{
            if (res.ok) {
                // 把数据保存下来
                setList(await res.json())
            }
        })
    }, [param])

    useEffect(()=>{
        fetch(`${apiUrl}/users`).then(async (res)=>{
            if (res.ok) {
                // 把数据保存下来
                setUsers(await res.json())
            }
        })
    }, [])


    return <div>
        <SearchPanel param={param} setParam={setParam} users={users} />
        <List list={list} users={users} />
    </div>
}