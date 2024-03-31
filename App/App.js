import { View, Text,StyleSheet,StatusBar,Image,Modal,TouchableOpacity ,Pressable, TextInput} from 'react-native'
import React,{useState,useEffect} from 'react'

 import { Data } from './data';
import Categories from './components/Categories';
import TaskForm from './components/TaskForm';
import {Picker} from '@react-native-picker/picker';

const App = () => {
  const arr = [
    {
      name:'Pending',
      backgroundColor:'gray'
    },
    {
      name:'In Progress',
      backgroundColor:'orange'
    },
    {
      name:'Completed',
      backgroundColor:'lightgreen'
    },
    {
      name:'Deployed',
      backgroundColor:'purple'
    },
    {
      name:'Deffered',
      backgroundColor:'lightpink'
    },
  ]
  const[data,setData]=useState([]);
  const[showFormModal,setShowFormModal]=useState(false)
  const [selectedTask,setSelectedTask]=useState('')
  
  const[edit,setEdit]=useState(false)
  const[selectedPriority,setSelectedPriority]=useState("P1")
  

  const handleSubmit = (newTask)=>{
    let tasks =[...data];
    const index = data.findIndex((a)=>a.id===newTask.id);
    if(index>=0){
      tasks[index]=newTask;
    }else{
      tasks.push(newTask);
    }
    setData(tasks)
  }
  const handleEdit = (id)=>{
    const findTask = data.find((a)=>a.id===id);
    if(findTask){
      setEdit(true)
      setSelectedTask(findTask)
      setShowFormModal(true)
    }
    //console.log(id)
   
    
    
  }
  const handleDelete = (id)=>{
    let tasks =[...data];
    const index =data.findIndex((a)=>a.id===id);
    if(index>=0){
      tasks.splice(index,1);
      setData(tasks)
    }
  }
  const handleSelect = ()=>{

  }
  useEffect(()=>{
  
    setData(Data);
    //console.log(data);
    
  },[])
  return (
    <>
      <StatusBar hidden={true}/>
     
      <View style={styles.container}>
        <Modal
        animationType="fade"
        transparent={true}
        visible={showFormModal}
        onRequestClose={() => {
          
          setShowFormModal(!setShowFormModal);
        }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <TaskForm
                closeModal={()=>setShowFormModal(false)}
                edit={edit}
                task={selectedTask}
                onSubmit ={handleSubmit}
              />
            </View>
          </View>
        </Modal>
        <View style={styles.navarea}>
          <Text style={{fontSize:22,fontWeight:'800'}}>Task Board</Text>
          <View>
            <Image 
              alt='user' 
              source={require('./assets/user.png')}
              style={styles.usericon} 

            />
          </View>
        </View>
       
        <View style={styles.cardContainer}>
            
          <View style={{borderWidth:0,maxHeight:'90%',position:'relative',display:'flex'}}>
            <Categories tasks={data} onEdit={handleEdit} onDelete={handleDelete}  data={arr} autoPlay={false} pagination={true}/>
          </View>
            <Pressable 
              
              style={{display:'flex',justifyContent:'center',alignSelf:'center',width:'70%'}}>
              <Pressable  onPress={()=>setShowFormModal(!showFormModal)} style={styles.taskButton}>
                <Text style={{color:'white',fontWeight:'500',fontSize:16,textAlign:'center'}}>Add New Task</Text>
              </Pressable>
            </Pressable>
        </View>
        
      </View>
      
    </>
  )
}

export default App

const styles = StyleSheet.create({
  container:{
    backgroundColor:'#d7d0ff',
    flex:1,
    paddingHorizontal:10,
    // justifyContent:'center',
    alignItems:'center',
    paddingVertical:20
  },
  navarea:{
    display:'flex',
    flexDirection:'row',
    justifyContent:'space-between',
    width:'100%',
    paddingHorizontal:10,
   
    
  },
  cardContainer:{
   display:'flex',
    borderColor:'white',
    borderCurve:'continuous',
    width:'100%',
    minHeight:'83%',
    borderWidth:2,
    marginVertical:25,
    paddingVertical:10,
    paddingHorizontal:10,
    borderRadius:10,
    flexDirection:'column',
    gap:10,
    elevation:2
  },
  usericon:{
    height:40,
    width:40
  },
  taskButton:{
    paddingVertical:6,
    backgroundColor:'#25689c',
    color:'white',
    width:'40%',
    textAlign:'center',
    borderRadius:6,
    width:'90%'
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    flexDirection:'row',
    
  },
  modalView: {
    margin: 10,
    backgroundColor: 'white',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.75,
    shadowRadius: 4,
    elevation: 4,
    width:'90%'
  },
  
})