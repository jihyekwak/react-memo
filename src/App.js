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
    <div className='memo-btns'>
    <button className='memo-btn' onClick={()=>props.onEditHandler(props.memo)}>Edit</button>
    <button className='memo-btn' onClick={()=>props.onDelete()}>Delete</button>
    </div>
    
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

function Edit(props) {
  const [inputTitle, setInputTitle] = useState(props.memo.title);
  const [inputBody, setInputBody] = useState(props.memo.body);
  return (<div>
    <form className='edit-form' onSubmit={(e)=> {
      e.preventDefault();
      props.onEdit(inputTitle, inputBody);
      setInputTitle("");
      setInputBody("");
    }}>
      <input type="text" name="title" placeholder='Title' value={inputTitle} onChange={(e) => setInputTitle(e.target.value)}></input>
      <textarea type="text" name="body" placeholder='Take a memo' value={inputBody} onChange={(e) => setInputBody(e.target.value)}></textarea>
      <input type="submit"></input>
    </form>
  </div>)
}

function App() {
  const [memos, setMemos] = useState([{id: 1, title: 'memo app', body: 'take a memo here', createdAt:'3/1/2024 14:40'}]);
  const [mode, setMode] = useState(null);
  const [editMemo, setEditMemo] = useState();
  
  return (
    <div className="App">
      <Header></Header>

      <Create onCreate={(_id, _title, _body, _date) => {
        const newMemo = {id:_id, title: _title, body: _body, createdAt:_date};
        const newMemos = [...memos];
        newMemos.push(newMemo);
        setMemos(newMemos);
      }}></Create>

      <div className='memo-list'>
        {memos.map(memo => <>
          <MemoList key={memo.createdAt} memo={memo} 
          onDelete={() => {
            const newMemos = memos.filter(m => m !== memo)
            setMemos(newMemos);
          }}
          onEditHandler={(memo) => {
            setMode('EDIT');
            setEditMemo(memo);
          }}
          ></MemoList>
        </>)}
      </div>

      {mode === 'EDIT' ? <Edit memo={editMemo} onEdit={(_title, _body)=>{
          const newMemos = memos.map(m => m === editMemo? Object.assign(m, {title:_title, body:_body}):m)
          setMemos(newMemos);
          setMode(null)
        }}></Edit>:null}
      
    </div>
  );
}

export default App;
