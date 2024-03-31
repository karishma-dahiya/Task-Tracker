
import React, { useEffect, useState } from 'react';
import './App.css';
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import Modal from './components/Modal';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import CancelIcon from '@mui/icons-material/Cancel';

import { Data } from './data';
import MoreVertIcon from '@mui/icons-material/MoreVert';

function App() {
  const[showFormModal,setshowFormModal]=useState(false)
  //console.log(Data);
  const[data,setData]=useState([]);
  
  const[delModal,setDelModal]=useState(false)
  const [taskContainers,setContainers]=useState([
    {name:'Pending',bg:'bg-[#8c8b90]'},
    {name:'In Progress',bg:'bg-[#e69924]'},
    {name:'Completed',bg:'bg-[#42a821]'},
    {name:'Deployed',bg:'bg-[#353976]'},
    {name:'Deffered',bg:'bg-[#f68871]'},
  ])
  const [selected,setSelected]=useState('');
  const [anchorEl, setAnchorEl] = useState();
 const[open,setOpen]=useState(false);
 const[edit,setEdit]=useState(false)
 
  const handleClick = (event,id) => {
    setOpen(true)
    setAnchorEl(event.currentTarget);
    const task = data.find((a)=>a.id===id);
    setSelected(task)
  };
  const handleClose = () => {
    setDelModal(false)
    setSelected('')
    setEdit(false)
  };

  const handleMenu = (id)=>{
    setAnchorEl(null);
    setOpen(false)
    setDelModal(true)
    
  }

 const handleSubmit = (task)=>{
  let tasks = [...data];
  let index = tasks.findIndex((a)=>a.id===task.id);
  if(index>=0){
    tasks[index]=task;
  }else{
    tasks.push(task)
  }
 setData(tasks);
  console.log(task)
 }
 const handleDelete = ()=>{
  const index = data.findIndex((a)=>a.id===selected.id);
  if(index>=0){
    let tasks = [...data];
    tasks.splice(index,1);
    setData(tasks)
  }
  handleClose()
 }
 const handleEdit = ()=>{
    setshowFormModal(true)
    setEdit(true)
 }
 const handleFormClose = ()=>{
  setshowFormModal(false)
  setEdit(false)
  setSelected('')
  setOpen(false)
 }

 const handleFilter = (e) => {
  let {name,value}=e.target;
  const inputValue = value.trim().toLowerCase(); 
  let filteredData = [...Data];
  if (inputValue === '') {
    setData(Data);
    return;
  }
  if (name === 'assignee') {
    filteredData = filteredData.filter((item) =>
      item[name].toLowerCase().includes(inputValue)
    );
  } else if (name === 'priority') {
    filteredData = filteredData.filter((item) =>
      item[name].toLowerCase() === inputValue
    );
  } else if (name === 'startDate') {
    filteredData = filteredData.filter((item) =>
      item.startDate.toLowerCase() >= inputValue
    );
  } else if (name === 'endDate') {
    filteredData = filteredData.filter((item) =>
      item.endDate.toLowerCase() <= inputValue
    );
  }
  setData(filteredData);
}
const handleSort =(e)=>{
  const inputValue = e.target.value; 
  //console.log(inputValue)
  let sorted = [...data];
  sorted.sort((a,b)=>a[inputValue].localeCompare(b[inputValue]))
  setData(sorted)
}
  useEffect(()=>{
  
    setData(Data);
    //console.log(data);
    
  },[])

  const priorities = ['P0','P1','P2'];
  const sortArr = [
    {name:'Priority',value:'priority'},
    {name:'Start Date',value:'startDate'},{name:'End Date',value:'endDate'}
  ];
  return (
    <div className="  w-screen bg-primary p-6 lg:px-12 flex flex-col items-center ">
      {/* Header */}
      <div className='flex justify-between w-full px-8'>
        <h5 className='font-bold text-xl'>Task Board</h5>
        <div>
          <AccountCircleRoundedIcon className='h-12' fontSize='large'/>
        </div>
      </div>
      <div className='w-full min-h-screen border-2 p-2 my-6 h-full border-white rounded-lg shadow-md'>
        {/* Filter */}
        <div className='flex justify-between lg:px-6 pt-4 '>
          <div className='flex  gap-4'>
            <div>Filter By:</div>
            <div className='flex   flex-wrap gap-2'>

              <input 
                placeholder='Assignee Name'
                type='text'
                name='assignee'
                className='text-center p-px rounded-sm'
                onChange={handleFilter}
              />
              <select
              
                name='priority'
              onChange={handleFilter}
              className='text-center p-px px-6 text-gray-400 rounded-sm'
              >
                <option value=''> Priority</option>
                {priorities.map((a)=>(
                  <option value={a} key={a}>{a}</option>
                ))}
              </select>
              <input 
               
                type='date'
                name='startDate'
                onChange={handleFilter}
                className='text-center p-px rounded-sm text-gray-400'
              />
              <input 
                
                type='date'
                name='endDate'
                onChange={handleFilter}
                className='text-center p-px rounded-sm text-gray-400'
              />
            </div>
          </div>
          <button
            onClick={()=>setshowFormModal(true)}
           className='bg-[#25589a] px-4 max-h-12 lg:py-2 text-sm p-1 rounded-sm text-white text-center whitespace-nowrap'>Add New Task</button>
        </div>
        <div className='lg:px-6  my-2'>
          <div className='flex gap-2'>

            <div>Sort By:</div>
            <select
              className='text-center lg:mx-4 p-px px-6 text-gray-400 rounded-sm'
              onChange={handleSort}
            >
              {sortArr.map((a)=>(
                <option key={a.name} value={a.value}>{a.name}</option>
              ))}
            </select>
          </div>
        </div>
        {/* Task Cards */}
        <div className='flex flex-wrap my-8 gap-3 justify-center  '>
          {taskContainers.map((a,ind)=>(
            <div key={ind} className='min-h-96 min-w-52 max-w-60 shadow-lg rounded-lg bg-white'>
              <div className={` ${a.bg}  text-center text-white rounded-t-md text-lg py-1  font-semibold `}>{a.name}</div>
              <div className='p-3'>
                {data
                .filter((task)=>task.status==a.name)
                .map((task)=>(
                  <div key={task.id} className='relative p-2 my-2 rounded-md bg-slate-200'>
                    <div className='flex justify-between mb-3'>
                      <span className='font-semibold'>{task.title}</span>
                      <div className='text-white text-xs font-semibold rounded-sm bg-secondary p-1'>{task.priority}</div>
                    </div>
                    <hr className='border-px border-gray-400 w-full'/>
                    <p className='text-xs my-2'>{task.description}</p>
                    <div className='flex justify-between '>
                      <span className='font-medium text-sm'>{task.assignee}</span>
                      <Button
                        id="basic-button"
                        aria-controls={open ? 'basic-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                        onClick={(e)=>handleClick(e,task.id)}
                      >
                        <div    className='bg-secondary  ms-10 p-px rounded-sm text-white'>
                        <MoreVertIcon fontSize='small'/>
                        </div>
                      </Button>
                      <Menu
                        id="basic-menu"
                        anchorEl={anchorEl}
                        open={open}
                        onClose={()=>setOpen(false)}
                        MenuListProps={{
                          'aria-labelledby': 'basic-button',
                        }}
                      >
                        <MenuItem onClick={handleEdit}>
                         Edit
                        </MenuItem>
                        <MenuItem onClick={()=>handleMenu(task.id)}>Delete</MenuItem>
                        
                      </Menu>
                    </div> 
                    <div className='bg-secondary text-white text-sm font-medium w-1/2 text-center p-1 rounded-sm'>{task.status}</div>  
                  </div>
                ))
                }
                    
              </div>
            </div>
          ))}
        </div>
        <Modal
          open={showFormModal}
          close={handleFormClose}
          edit={edit}
          task={selected}
          onSubmit={handleSubmit}
        />
        <Dialog
         open={delModal}
        onClose={handleClose}
        >
          <div className='bg-white flex  p-4 justify-between   content-center'>
            <h5 className='uppercase font-bold me-24'>Delete Task</h5>
            <button onClick={handleClose} className=''>
                <CancelIcon />
            </button>
        </div>
        <div className='bg-primary p-2 px-4'>
                <h5 className='text-center'>Do You Wish to Delete Task</h5>
                <div className='flex my-4 gap-24 justify-between'>
                  <span className=' font-semibold '>{selected?.title}</span>
                  <div>
                    <button onClick={handleDelete} className='mx-2 px-4 p-px text-sm bg-secondary text-white font-medium'>Yes</button>
                    <button onClick={handleClose} className='mx-2 px-4 p-px text-sm bg-secondary text-white font-medium'>No</button>
                  </div>
                </div>
        </div>
        </Dialog>
      </div>
    </div>
  );
}

export default App;
