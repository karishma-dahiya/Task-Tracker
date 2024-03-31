import { View,Modal, Text,StyleSheet,StatusBar,TouchableOpacity, Pressable,Image, TextInput } from 'react-native'
import React, { useState,useEffect } from 'react'
import 'react-native-get-random-values';
import { v4 as uuid } from 'uuid';
import {Picker} from '@react-native-picker/picker';

const TaskForm = ({closeModal,edit,onSubmit,task,onSelect}) => {
   
    const[form,setForm]=useState({
      id:'',
      title:'',
      description:'',
      team:'',
      assignees:'',
      priority:'P1',
      startDate:'',
      endDate:'',
      status:'Pending'
    })
    const[errors,setErrors]=useState({});


    const handleChange = (e,name)=>{
      let f1 = {...form};
      f1[name]=e;
      setForm(f1);
      //console.log(form)
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
        //console.log(newForm)
         onSubmit(newForm);
         closeModal()
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
}, [edit,closeModal]); 
  return (
    
        <View style={styles.container}>

          
                 <View style={{
                  display:'flex',
                  flexDirection:'row',
                  justifyContent:'space-between',
                  paddingHorizontal:15,
                  paddingVertical:10
                  }}>
                    <Text
                    style={{
                        fontSize:18,
                        fontWeight:'bold',
                        textAlign:'center',
                    
                        textTransform:'uppercase'
                    }}
                    >{edit ? 'Edit Task':'Create a Task'}</Text>
                    <TouchableOpacity>
                      <Pressable onPress={closeModal}>
                        <Text style={{fontWeight:900,fontSize:18}}>X</Text>
                      </Pressable>
                    </TouchableOpacity>
                </View>
                <View style={styles.form}>
                <View style={{marginVertical:5}}>
                    <Text style={styles.text}>Title</Text>
                    <View>
                      <TextInput 
                          name='title'
                          value={form.title}
                          readOnly={edit}
                          inputMode='text'
                          style={styles.input}
                          onChangeText={(e)=>handleChange(e,"title")}
                      />
                      {errors.title && (<Text style={styles.errorText}>{errors.title}</Text>)}
                    </View>
                </View>
                <View style={{marginVertical:5}}>
                    <Text style={styles.text}>Description</Text>
                    <TextInput 
                    name='description'
                    value={form.description}
                    readOnly={edit}
                    style={[styles.input]}
                    multiline={true}
                    numberOfLines={4}
                    onChangeText={(e)=>handleChange(e,"description")}
                    />
                      {errors.description && (<Text style={styles.errorText}>{errors.description}</Text>)}
                </View>
                <View style={{marginVertical:5}}>
                    <Text style={styles.text}>Team</Text>
                    <TextInput 
                    readOnly={edit}
                    name='team'
                    value={form.team}
                        inputMode='text'
                        style={styles.input}
                        onChangeText={(e)=>handleChange(e,"team")}
                    />
                      {errors.team && (<Text style={styles.errorText}>{errors.team}</Text>)}
                </View>
                <View style={{marginVertical:5}}>
                    <Text style={styles.text}>Assignee</Text>
                    <TextInput 
                    name='assignee'
                    value={form.assignee}
                    readOnly={edit}
                    inputMode='text'
                        style={styles.input}
                        onChangeText={(e)=>handleChange(e,"assignee")}
                    />
                      {errors.assignee && (<Text style={styles.errorText}>{errors.assignee}</Text>)}
                </View>
                <View style={{flexDirection:'row'}}>
                  <View style={{marginVertical:5}}>
                      <Text style={styles.text}>Priority</Text>
                      <Picker
                      name='priority'
                          selectedValue={form.priority}
                          onValueChange={(e) => handleChange(e,'priority')}
                          style={styles.picker}
                      >
                      
                      
                      <Picker.Item label="P1" value="P1" />
                      <Picker.Item label="P2" value="P2" />
                      <Picker.Item label="P0" value="P0" />
                      
                      </Picker>
                      {errors.priority && (<Text style={styles.errorText}>{errors.priority}</Text>)}
                  </View>
                  {edit && (
                    <View style={{marginVertical:5,marginHorizontal:10}}>
                    <Text style={styles.text}>Status</Text>
                    <Picker
                    name='status'
                        selectedValue={form.status}
                        onValueChange={(e) => handleChange(e,'status')}
                        style={styles.picker}
                    >
                    
                    
                    <Picker.Item label="Pending" value="Pending" />
                    <Picker.Item label="In Progress" value="In Progress" />
                    <Picker.Item label="Completed" value="Completed" />
                    <Picker.Item label="Deployed" value="Deployed" />
                    <Picker.Item label="Deffered" value="Deffered" />
                    
                    </Picker>
                    </View>
                  )}
                </View>
                <View>
                  <Pressable
                    onPress={handleSubmit}
                    style={{
                      backgroundColor:'#25689c',
                      marginVertical:30,
                      padding:8,
                      alignSelf:'center',
                      width:'90%',
                      borderRadius:5
                    }}
                  >
                    <Text style={{
                      fontSize:18,
                      fontWeight:'800',
                      color:'white',
                      textAlign:'center'
                    }}>Submit</Text>
                  </Pressable>
                </View>
                </View> 
        </View>
              
    
  )
}

export default TaskForm
const styles = StyleSheet.create({
    container:{
      backgroundColor:'white',
      flex:1,
      
      width:'100%'
      
    },
    
    navarea:{
      display:'flex',
      flexDirection:'row',
      width:'100%',
      paddingHorizontal:10,
      textAlign:'center',
      marginVertical:10
    },
    form:{
      backgroundColor:'#f0f0f0',
      flex:1,
      height:'100%',
      width:'100%',
      marginTop:10,
      paddingHorizontal:30,
      paddingVertical:10

    },
    input:{
      width:'100%',
      backgroundColor:'lightgray',
      padding:3,
      borderWidth:1,
      borderRadius:5
     
    },
    text:{
      fontSize:16,
      fontWeight:'400',
      marginVertical:5
    },
    picker:{
      width:100,
      backgroundColor:'lightgray',
      padding:3,
      borderWidth:1,
      borderRadius:5,
      fontSize:10
    },
    errorText:{
      fontSize:11,
      color:'red'
    }
  })