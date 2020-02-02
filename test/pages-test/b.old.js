import { useState, useEffect, useReducer, useLayoutEffect, useContext, useRef } from 'react'
import myContext from '../lib/my-context'
function countReducer(state, action) {
  switch (action.type) {
    case 'add':
      return state + 1
    case 'minus':
      return state - 1
    default:
      return state
  }
}

function myCount() {
  // const [count, setCount] = useState(0)
  const [count, dispatchCount] = useReducer(countReducer, 0)
  const [name, setName] = useState('jack')

  const context =useContext(myContext)
  
  const ipt = useRef()

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     // setCount(count+1) // []里需要放count才能一直加1
  //     // setCount(count => count+1)
  //     dispatchCount({ type: 'add' })
  //   }, 1000)
  //   return () => clearInterval(interval)
  // }, [])

  // 不传[]的话,每次渲染都会执行
  // 依赖什么变量更新,[]就放什么
  // 在html更新之后执行
  useEffect(() => {
    console.log("TCL: ipt", ipt)
    console.log("TCL: useEffect invoked")
    return () => console.log("TCL: useEffect deteched")
  },[name])

  // 在useEffect之前执行
  // 在html更新之前执行
  useLayoutEffect(() => {
    console.log("TCL: useLayoutEffect invoked")
    return () => console.log("TCL: useLayoutEffect deteched")
  },[])

  return (
    <>
      <span ref={ipt}>{count}</span>
      <button onClick={() => dispatchCount({type: 'add'})}>加</button>
      <input type="text" value={name} onChange={(e)=>setName(e.target.value)} />
      {context}
    </>
  )
}

export default myCount
