import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValuesType} from './App';

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: string) => void
    changeFilter: (value: FilterValuesType) => void
    addTask: (title: string) => void
}

export function Todolist(props: PropsType) {

    let [title, setTitle] = useState("")

    const addTask = () => {
        props.addTask(title);
        setTitle("");
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.charCode === 13) {
            addTask();
        }
    }

    const onAllClickHandler = () => props.changeFilter("all");
    const onActiveClickHandler = () => props.changeFilter("active");
    const onCompletedClickHandler = () => props.changeFilter("completed");

    return <div>
        <h3>{props.title}</h3>
        <div>
            <input value={title}
                   onChange={ onChangeHandler }
                   onKeyPress={ onKeyPressHandler }
            />
            <button onClick={addTask}>+</button>
        </div>
        <ul>
            {
                props.tasks.map(t => {

                    const onClickHandler = () => props.removeTask(t.id)

                    return <li key={t.id}>
                        <input type="checkbox" checked={t.isDone}/>
                        <span>{t.title}</span>
                        <button onClick={ onClickHandler }>x</button>
                    </li>
                })
            }
        </ul>
        <div>
            <button onClick={ onAllClickHandler }>All</button>
            <button onClick={ onActiveClickHandler }>Active</button>
            <button onClick={ onCompletedClickHandler }>Completed</button>
        </div>
    </div>
}





















//after 7 lesson---------------------------------------------------
// import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
// import {FilterValuesType} from './App';
// import {EditableSpan} from "./components/EditableSpan";
// import Button from '@mui/material/Button';
// import IconButton from '@mui/material/IconButton';
// import DeleteIcon from '@mui/icons-material/Delete';
// import Checkbox from '@mui/material/Checkbox';
// import {AddItemForm} from "./components/Input";
//
// type TaskType = {
//     id: string
//     title: string
//     isDone: boolean
// }
//
// type PropsType = {
//     todolistID: string
//     title: string
//     tasks: Array<TaskType>
//     removeTask: (todolistID: string, taskID: string) => void
//     changeFilter: (todolistID: string, value: FilterValuesType) => void
//     addTask: (todolistID: string, title: string) => void
//     changeTaskStatus: (todolistID: string, taskId: string, isDone: boolean) => void
//     filter: FilterValuesType
//     removeTodolist: (todolistID: string) => void
//     updateTask: (todolistID: string, taskID: string, updateTitle: string) => void
//     updateTodolist: (todolistID: string, updateTitle: string) => void
// }
//
// export function Todolist(props: PropsType) {
//
//     let [title, setTitle] = useState("")
//     let [error, setError] = useState<string | null>(null)
//
//     const addTask = () => {
//         if (title.trim() !== "") {
//             props.addTask(props.todolistID, title.trim());
//             setTitle("");
//         } else {
//             setError("Title is required");
//         }
//     }
//
//     const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
//         setTitle(e.currentTarget.value)
//     }
//
//     const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
//         setError(null);
//         if (e.charCode === 13) {
//             addTask();
//         }
//     }
//
//     const onAllClickHandler = () => props.changeFilter(props.todolistID, "all");
//     const onActiveClickHandler = () => props.changeFilter(props.todolistID, "active");
//     const onCompletedClickHandler = () => props.changeFilter(props.todolistID, "completed");
//     const removeTodolistHandler = () => {
//         props.removeTodolist(props.todolistID)
//     }
//     const addTaskHandler = (newTitle: string) => {
//         props.addTask(newTitle, props.todolistID)
//     }
//     const updateTodolistHandler = (updateTitle: string) => {
//         props.updateTodolist(props.todolistID, updateTitle)
//     }
//     const updateTaskHandler = (updateTitle: string, taskID:string) => {
//         props.updateTask(props.todolistID, taskID, updateTitle)
//     }
//
//     return <div>
//         <h3>
//             {/*{props.title}*/}
//             <EditableSpan callBack={updateTodolistHandler} oldtitle={props.title}/>
//             {/*<Button onClick={removeTodolistHandler}>X</Button>*/}
//             <IconButton aria-label="delete" onClick={removeTodolistHandler}>
//                 <DeleteIcon />
//             </IconButton>
//         </h3>
//         <AddItemForm addItem={addTaskHandler}/>
//         {/*<div>*/}
//         {/*    <input value={title}*/}
//         {/*           onChange={onChangeHandler}*/}
//         {/*           onKeyPress={onKeyPressHandler}*/}
//         {/*           className={error ? "error" : ""}*/}
//         {/*    />*/}
//         {/*    <button onClick={addTask}>+</button>*/}
//         {/*    {error && <div className="error-message">{error}</div>}*/}
//         {/*</div>*/}
//         <ul>
//             {
//                 props.tasks.map(t => {
//                     const onClickHandler = () => props.removeTask(props.todolistID, t.id)
//                     const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
//                         props.changeTaskStatus(props.todolistID, t.id, e.currentTarget.checked);
//                     }
//
//                     // const updateTaskHandler = (updateTitle: string, ) => {
//                     //     props.updateTask(props.todolistID, t.id, updateTitle)
//                     // }
//                     //-------------?????????????? updateTaskHandler ???? ?????????????? map-------
//
//                     return <li key={t.id} className={t.isDone ? "is-done" : ""}>
//                         {/*<input type="checkbox"*/}
//                         {/*       onChange={onChangeHandler}*/}
//                         {/*       checked={t.isDone}/>*/}
//                         <Checkbox onChange={onChangeHandler} checked={t.isDone}  />
//                         {/*<span>{t.title}</span>*/}
//                         {/*<EditableSpan callBack={updateTaskHandler} oldtitle={t.title}/>*/}
//                         <EditableSpan callBack={(updateTitle)=>updateTaskHandler(updateTitle,t.id)} oldtitle={t.title}/>
//                         <IconButton aria-label="delete" onClick={onClickHandler}>
//                             <DeleteIcon />
//                         </IconButton>
//                     </li>
//                 })
//             }
//         </ul>
//         <div>
//             <Button variant={props.filter === 'all' ? "outlined" : "contained"} color="success" onClick={onAllClickHandler}>All</Button>
//             <Button variant={props.filter === 'active' ? "outlined" : "contained"} color="error" onClick={onActiveClickHandler}>Active</Button>
//             <Button variant={props.filter === 'completed' ? "outlined" : "contained"}color="secondary" onClick={onCompletedClickHandler}>Completed</Button>
//             {/*<button className={props.filter === 'all' ? "active-filter" : ""}*/}
//             {/*        onClick={onAllClickHandler}>All*/}
//             {/*</button>*/}
//             {/*<button className={props.filter === 'active' ? "active-filter" : ""}*/}
//             {/*        onClick={onActiveClickHandler}>Active*/}
//             {/*</button>*/}
//             {/*<button className={props.filter === 'completed' ? "active-filter" : ""}*/}
//             {/*        onClick={onCompletedClickHandler}>Completed*/}
//             {/*</button>*/}
//         </div>
//     </div>
// }
//

// -------------------------after 4 lesson-------------------------
// -------------------------after 4 lesson-------------------------
// -------------------------after 4 lesson-------------------------
// import React, {useState, KeyboardEvent, ChangeEvent} from 'react';
// import {FilterValueType} from "./App";
// import {Button} from "./components/Button";
// import styles from "./Todolist.module.css"
//
// type TaskType = {
//     id: string
//     title: string
//     isDone: boolean
// }
//
// type PropsType = {
//     title: string
//     tasks: Array<TaskType>
//     removeTask:(taskID:string)=>void
//     qqqq:(filterValue:FilterValueType)=>void //???????????????????????? ??????????????, ?????????????? ???????????????? ???? ?????????????? App ??????????
//     rrrr:(newTitle:string)=>void
//     wwww:(taskID:string,eventValue:boolean)=>void
//     filter:FilterValueType
// }
//
// export function Todolist(props: PropsType ) {//props: PropsType ??????????????????, ???????????????? ??????.. ?? ?????? ?????????? ??????????????, ?????????????? ???? App
//     const [newTitle, setNewTitle]=useState("")
//     const [error, setError]=useState<string|null>("")
//     const [activeButton, setActiveButton]=useState<FilterValueType>("All")
//
//     const addTaskHandler=()=>{
//         if(newTitle.trim()!=="") {
//             props.rrrr(newTitle.trim())
//             setNewTitle("")
//         }else{
//             setError("Titile is required")
//         }
//     }//?????????????? ???????????? ???? ???????????? ????????????
//
// const onKeyPressHandler=(event:KeyboardEvent<HTMLInputElement>)=>{
//         if(event.key==="Enter"){
//             addTaskHandler()
//         }
//     //???????? ?????????? ?????????? ???????? ??????????????????
// }
// const onChangeHandler=(event:ChangeEvent<HTMLInputElement>)=>{
//         setError(null)
//     setNewTitle(event.currentTarget.value.trim())
// }
//
//     let [filter, setFilter] = useState<FilterValueType>("All")//?????????? ?????????? ????????, ?????????? ?????? ???????????? ???? ?????????????? filterTasks
// //???????????????????? useState, ?????????? ?????????? ?????????????????? ??????????, ?????? ???????? ???????????????? ???? ?????????????????? ?? ??????????????. setFilter ???????????????? ????????????????
// //?? ?????????????????????? ?? filter
//     let filterTasksDone = props.tasks
//     if (filter === "Active") { //???????????? ?????? ??????????????, ???? ?????????? ?????????? ???????????????? ???????????? ?? ???????????? ?? ?????????? ?????????????????? ????????????
//         filterTasksDone = props.tasks.filter(el => !el.isDone)
//     }
//     if (filter === "Completed") {
//         filterTasksDone = props.tasks.filter(el => el.isDone)
//     }
//
//     const filterTasks = (filterValue: FilterValueType) => { //?????????????? ?????? ?????????????????????? ?? ?????????????? ?? ???????????? ??????????, ?????? ??????????
//         // ???????????????? ???? ?? App return......?????????? ?????????? ??????, ?????????????? ???????????? ???? ??????????????????....???? ???????????? ?????????? ???????????????? ????????
//         //?????????? ?????? ????????????, ?????????????????? ?????? ?????????? ???? ??????????...????-???? ?????????? ???????????? ???????????????????? filterValue - ????????????????????, ??????????????????
//         //???????? setFilter
//         setFilter(filterValue)
//         /*???????????????? filterValue ?? ?????????? ?????????? ??.....???????????????? ???? 26 ?? 30 ????????????...*/}
//
//     // const changeFilterAllHandler=()=>{
//     //     props.qqqq("All")
//     // }
//     const changeFilterTsarHandler=(filterValue:FilterValueType)=>{
//         props.qqqq(filterValue);
//         setActiveButton("All")
//     }
//     // const onAllClickHandler = () => {
//     //     props.qqqq("All");
//     //     setActiveButton("All")
//     // }
//     // const onActiveClickHandler = () => {
//     //     props.qqqq("Active")
//     //     setActiveButton("Active")
//     // }
//     // const onCompletedClickHandler = () => {
//     //     props.qqqq("Completed")
//     //     setActiveButton("Completed")
//     // }
//     const onChangeCheckbox = (qID:string,eventValue:boolean)=>{
//         props.wwww(qID,eventValue)
//         // console.log(event.currentTarget.checked)
//     }
//     const removeTaskHandler=(elID:string)=>{
//         props.removeTask(elID)
//     } //2 ?????????????? ??????????????????????????, ???? ???????????????????? ???????????? ??????????????????, ???????????? ?????? ?? ?????????????? ???????????????? ??-???? 2 ????????, ???? ????????
//     //?????????????????? ??????????, ?? ?????????????????? ?? 1 ??????????????????
//
//     return <div>
//         <h3>{props.title}</h3>
//         <div>
//             <input className={error ? styles.error : " "} value={newTitle}
//                    onKeyDown={onKeyPressHandler}
//                    onChange={onChangeHandler} />
//             {/*<input value={newTitle} onKeyDown={onKeyPressHandler}  onChange={(event)=> setNewTitle(event.currentTarget.value)} />*/}
//            {/*???????????? ?????? ?????????????? ?????????? ?? ????????????????--???????? ????????????, ???? ???????? ???????????? ?????? ?? ?????????? ?????? ????????????????????*/}
//            {/* <button onClick={addTaskHandler}>+</button>*/}
//             {/*<button onClick={() => props.rrrr(newTitle)}>+</button>*/}
//             <Button name={"+"} callBack={addTaskHandler}/>
//             {/*???????????????? ???????????????????? button, ?????? ???????????????? ???????????? onClickHandler,*/}
//             {/*onClickHandler ???????????????? ?????????????? , ?? ?????????????? ???????????????? addTaskHandler}*/}
//             {error && <div className={styles.errorMessage}>{error}</div>}
//         </div>
//         <ul>
//             {
//                 filterTasksDone.map(el =>{
//                     // const onChangeCheckbox = (event:ChangeEvent<HTMLInputElement>)=>{
//                     //     props.wwww(el.id,event.currentTarget.checked)
//                     //     // console.log(event.currentTarget.checked)
//                     // } **1
//                     //  const removeTaskHandler=()=>{
//                     //      props.removeTask(el.id)
//                     // }//1 ?????????????? ??????????????????????????, ???? ?????? ???? ???? ??????, ?????? ???????????? ????????, ?????? ??-???? ???? ?????????? ????????, ?????? ????????????
//                     //???? ???????? ???????????????????? 1 ?????? ??????????????, ???? ???????????? ?? ??????
//                     return(
//                         <li key={el.id} className={el.isDone? styles.isDone : " "}>
//                             <input type="checkbox" checked={el.isDone} onChange={(event)=>onChangeCheckbox(el.id, event.currentTarget.checked)}/>
//                             {/*<input type="checkbox" checked={el.isDone} onChange={onChangeCheckbox}/>*/}
//                             {/*?????? ???????? ???????????? **1*/}
//                             <span>{el.title}</span>
//                             {/*<button onClick={()=>removeTaskHandler(el.id)}>X*/}
//                             {/*</button>*/}
//                             <Button name={"X"} callBack={()=>removeTaskHandler(el.id)}/>
//                         </li>
//                     )
//                 } )
//             } {/*{(el=>)}*/}
//             {/*<li><input type="checkbox" checked={props.tasks[0].isDone}/> <span>{props.tasks[0].title}</span></li>*/}
//             {/*<li><input type="checkbox" checked={props.tasks[1].isDone}/> <span>{props.tasks[1].title}</span></li>*/}
//             {/*<li><input type="checkbox" checked={props.tasks[2].isDone}/> <span>{props.tasks[2].title}</span></li>*/}
//         </ul>
//         <div>
//             {/*<button className={activeButton==="All" ?styles.activeFilter:""} onClick={()=>changeFilterTsarHandler("All")}>All</button>*/}
//             {/*<button className={activeButton==="Active" ?styles.activeFilter:""} onClick={()=>changeFilterTsarHandler("Active")}>Active</button>*/}
//             {/*<button className={activeButton==="Completed" ?styles.activeFilter:""} onClick={() =>changeFilterTsarHandler("Completed")}>Completed</button>*/}
//             {/*???? ?????????????????? ???????????? ?????? ?????????? ???????? ???????????? ???????? ?? ????????????????????, ?? ???? ?? ??????????????*/}
//
//             <Button name={"All"}  callBack={()=>changeFilterTsarHandler("All")} Filter={props.filter}/>
//             <Button name={"Active"} callBack={()=>changeFilterTsarHandler("Active")} Filter={props.filter}/>
//             <Button name={"Completed"} callBack={()=>changeFilterTsarHandler("Completed")} Filter={props.filter}/>
//             {/*?????????? ???????????? ???????????????? ?? ???????????????? ??????????, ???? ?????????? 3 ?????????? ????????????????..... ???????????????? ?? ???????????? ?????? ?? ??????????*/}
//
//             {/*<button onClick={() => filterTasks("All")}>All</button>*/}
//
//             {/*<button className={activeButton==="All" ?styles.activeFilter :" "} onClick={onAllClickHandler}>All</button>*/}
//             {/*<button className={activeButton==="Active" ?styles.activeFilter :" "} onClick={onActiveClickHandler}>Active</button>*/}
//             {/*<button className={activeButton==="Completed" ?styles.activeFilter :" "} onClick={onCompletedClickHandler}>Completed</button>*/}
//             {/*???????????? ????????????*/}
//         </div>
//     </div>
// }
