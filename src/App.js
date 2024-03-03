import { useState } from 'react';
import './App.css';

function Header() {
  return(<div className='header'>
    <h1>Memo</h1>
  </div>
  )
}

function MemoList(props) {
  return(<div className='memo-card'>
    <h4 className='memo-title'>{props.memo.title}</h4>
    <p className='memo-body'>{props.memo.body}</p>
    <p className='memo-date'>{props.memo.createdAt}</p>
    <button className='memo-delete-btn' onClick={()=>props.onDelete(props.memo.id)}>Delete</button>
  </div>
  )
}

function Create(props) {
  const [inputTitle, setInputTitle] = useState("");
  const [inputBody, setInputBody] = useState("");
  return(<>
    <form className='create-form' onSubmit={(e)=>{
      e.preventDefault();
      const currentDate = new Date();
      const year = currentDate.getFullYear();
      const month = currentDate.getMonth() + 1;
      const day = currentDate.getDate();
      const hour = currentDate.getHours();
      const minute = currentDate.getMinutes();
      const timestamp = currentDate.getTime();
      props.onCreate(timestamp, inputTitle, inputBody, `${month}/${day}/${year} ${hour}:${minute}`);
      setInputTitle("");
      setInputBody("");
    }}>
      <input type="text" name="title" placeholder='Title' value={inputTitle} onChange={(e) => setInputTitle(e.target.value)}></input>
      <textarea type="text" name="body" placeholder='Take a memo' value={inputBody} onChange={(e) => setInputBody(e.target.value)}></textarea>
      <input type="submit"></input>
    </form>
  </>
  )
}

function App() {
  const [memos, setMemos] = useState([{id: 1, title: 'memo app', body: 'take a memo here', createdAt:'3/1/2024 14:40'}]);
  console.log(memos)
  return (
    <div className="App">
      <Header></Header>
      <Create onCreate={(_id, _title, _body, _date) => {
        const newMemo = {id:_id, title: _title, body: _body, createdAt:_date};
        const newMemos = [...memos];
        newMemos.push(newMemo);
        setMemos(newMemos);
        console.log(newMemos)
      }}></Create>
      <div className='memo-list'>
        {memos.map(memo => <MemoList key={memo.createdAt} memo={memo} onDelete={(_id) => {
          const newMomo = memos.filter(memo => memo.id !== _id)
          setMemos(newMomo);
        }}></MemoList>)}
      </div>
      
    </div>
  );
}

export default App;
