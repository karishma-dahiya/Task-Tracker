import React, { useEffect, useState } from 'react'
import Dialog from '@mui/material/Dialog';
import CancelIcon from '@mui/icons-material/Cancel';
import { v4 as uuid } from 'uuid';

const Modal = ({open,close,edit,onSubmit,task}) => {

    
    const[form,setForm]=useState({})
    const[errors,setErrors]=useState({});
    const priorities = ['P0','P1','P2'];
    const statusArr = ['Pending','In Progress','Completed','Deployed','Deffered']
    const[resetForm,setResetForm]=useState(false);
    const handleChange = (e)=>{
        let f1 = {...form};
        let{name,value}=e.target;
        f1[name]=value;
        setForm(f1);
    }
    const validate = ()=>{
        let err = {...errors};
        err.title = !form.title ? 'Title is Required':'';
        err.description = !form.description ? 'Description is Required':'';
        err.team = !form.team ? 'Team is Required':'';
        err.assignee = !form.assignee ? 'Assignee is Required':'';
        return err;
    
    }
    const isValid =(errors)=>{
      let keys = Object.keys(errors);
      let count =keys.reduce((acc,curr)=>errors[curr] ?acc+1:acc,0);
      return count===0;
    }
    const handleSubmit = ()=>{
        let errors = validate();
        if(isValid(errors)){
            let newForm = {...form};
            if(edit){
                if(form.status==='Completed'){
                    const currentDate = new Date();
                    newForm = {...form,endDate:currentDate.toISOString().split('T')[0]};
                }
            }else{
                const currentDate = new Date();
                const newid =uuid()
                newForm = {...form,id:newid,startDate:currentDate.toISOString().split('T')[0]};
            }
            onSubmit(newForm);
            close()
        }else{
            setErrors(errors);
        }
        
    }
    useEffect(() => {
        if(edit){
            setForm(task)
        }else{
            setForm({
                id:'',
                title:'',
                description:'',
                team:'',
                startDate:'',
                endDate:'',
                assignee:'',
                priority:'P0',
                status:'Pending'
            })
        }
        setErrors({})
      }, [edit,resetForm,close]); 
  return (
    <Dialog
        open={open}
        onClose={close}
        className=''
    >
        <div className='bg-white flex  p-4 justify-between   content-center'>
            <h5 className='uppercase font-bold text-lg'>{edit ? 'Edit Task':'Create a Task'}</h5>
            <button onClick={close} className=''>
                <CancelIcon />
            </button>
        </div>
        <div className={`bg-primary p-4 ${edit ? ' px-8':''}`}>
            <div className={` my-4 ${edit ? 'flex flex-col w-96':'grid grid-flow-col grid-cols-10 '}`}>
                <label className={`${edit ? '':'col-span-2'}`}>Title:</label>
                <div className={`w-full ${edit ? '':' col-span-8'}`}>
                    <input
                        readOnly={edit}
                        name='title'
                        value={form.title}
                        type='text'
                        onChange={handleChange}
                        className={`bg-primary border rounded-sm p-1 border-gray-400 w-full ${edit ? '':' col-span-8'}`}
                    />
                    {errors.title && (<div className='text-xs text-red-400'>{errors.title}</div>)}
                </div>
            </div>
            <div className={` my-4 ${edit ? ' flex flex-col':' grid grid-flow-col grid-cols-10'}`}>
                <label className={`${edit ? '':'col-span-2'}`}>Description:</label>
                <div className={`w-full ${edit ? '':' col-span-8'}`}>
                    <textarea
                    readOnly={edit}
                        name='description'
                        value={form.description}
                        type='text'
                        onChange={handleChange}
                        className={`bg-primary border rounded-sm p-1 border-gray-400 w-full ${edit ? '':' col-span-8'}`}
                    ></textarea>
                      {errors.description && (<div className='text-xs text-red-400'>{errors.description}</div>)}
                </div>
            </div>
            <div className={` my-4 ${edit ? 'flex flex-col':'grid grid-flow-col grid-cols-10'}`}>
                <label className={`${edit ? '':'col-span-2'}`}>Team:</label>
                <div className={`w-full ${edit ? '':' col-span-8'}`}>
                    <input
                    readOnly={edit}
                        name='team'
                        value={form.team}
                        type='text'
                        onChange={handleChange}
                        className={`bg-primary border rounded-sm p-1 border-gray-400 w-full ${edit ? '':' col-span-8'}`}  
                    />
                     {errors.team && (<div className='text-xs text-red-400'>{errors.team}</div>)}
                </div>
            </div>
            <div className={` my-4 ${edit ? 'flex flex-col':'grid grid-flow-col grid-cols-10'}`}>
                <label className={`${edit ? '':'col-span-2'}`}>Assignee:</label>
                <div className={`w-full ${edit ? '':' col-span-8'}`}>
                    <input
                    readOnly={edit}
                        name='assignee'
                        value={form.assignee}
                        type='text'
                        onChange={handleChange}
                        className={`bg-primary border rounded-sm p-1 border-gray-400 w-full ${edit ? '':' col-span-8'}`}
                    />
                     {errors.assignee && (<div className='text-xs text-red-400'>{errors.assignee}</div>)}
                </div>
            </div>
            <div className={` my-4 ${edit ? 'flex justify-between':''}`}>
                <div className={`  ${edit ? 'flex gap-3':'grid grid-flow-col  grid-cols-10'}`}>
                    <label className={`${edit ? '':'col-span-2'}`}>Priority:</label>
                
                    <select
                        name='priority'
                        value={form.priority}
                        type='text'
                        onChange={handleChange}
                        className={`bg-primary border rounded-sm p-1 border-gray-400 w-full ${edit ? '':' col-span-2'}`}
                    >
                        {priorities.map((a,ind)=>(
                            <option key={ind} value={a}>{a}</option>
                        ))}
                    </select>
                </div>
                {edit && (
                    <div className='flex gap-3'>
                        <label >Status:</label>
                        <select
                            name='status'
                            value={form.status}
                            type='text'
                            onChange={handleChange}
                            className={`bg-primary border rounded-sm p-1 border-gray-400 w-full ${edit ? '':' col-span-2'}`}
                        >
                            {statusArr.map((a,ind)=>(
                                <option key={ind} value={a}>{a}</option>
                            ))}
                        </select>
                    </div>
                )}
            </div>
        </div>
        <div className='bg-white flex justify-end p-3 gap-3'>
            <button 
                onClick={()=>handleSubmit()}
                className='text-white p-1 text-sm rounded-sm bg-[#25689c]'>
                Submit
            </button>
            <button onClick={()=>setResetForm(!resetForm)} className='text-white p-1 text-sm rounded-sm bg-[#25689c]'>Reset</button>
        </div>
    </Dialog>
  )
}

export default Modal
