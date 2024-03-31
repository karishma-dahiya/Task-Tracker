import React,{useRef,useState,useEffect} from 'react'
import { Text,Alert, View,StyleSheet,TouchableOpacity, ImageBackground,useWindowDimensions,Image, Pressable, Modal, ScrollView } from 'react-native'
import Animated, {
    useSharedValue,
    useAnimatedScrollHandler,
    useAnimatedStyle,
    interpolate,
    useAnimatedRef,
  } from "react-native-reanimated";



const Categories = ({data,autoPlay,pagination,tasks,onEdit,onDelete}) => {
    const scrollViewRef = useAnimatedRef(null);
    const interval = useRef();
    const [isAutoPlay, setIsAutoPlay] = useState(autoPlay);
    const[showModal,setShowModal]=useState(false)
    const[selectedId,setSelectedId]=useState('')
    const [newData] = useState([
      { key: "spacer-left" },
      ...data,
      { key: "spacer-right" },
    ]);
    const { width, height } = useWindowDimensions();
    const SIZE = width * 0.65;
    const SPACER = (width - SIZE) / 2;
    const x = useSharedValue(0);
    const offSet = useSharedValue(0);
    const onScroll = useAnimatedScrollHandler({
      onScroll: (event) => {
        x.value = event.contentOffset.x;
      },
    });
    const createAlert = () =>
    Alert.alert('Delete Task', 'Do you want to delete this task?', [
      {
        text: 'Cancel',
        onPress: () => setShowModal(!showModal),
        style: 'cancel',
      },
      {text: 'OK', onPress: () => {
        onDelete(selectedId)
        setShowModal(!showModal)
      }},
    ]);
    useEffect(() => {
      if (isAutoPlay === true) {
        let _offSet = offSet.value;
        interval.current = setInterval(() => {
          if (_offSet >= Math.floor(SIZE * (data.length - 1) - 10)) {
            _offSet = 0;
          } else {
            _offSet = Math.floor(_offSet + SIZE);
          }
          scrollViewRef.current.scrollTo({ x: _offSet, y: 0 });
        }, 2000);
      } else {
        clearInterval(interval.current);
      }
    }, [SIZE, SPACER, isAutoPlay, data.length, offSet.value, scrollViewRef]);
  
  return (
    <View >
   
    <Animated.ScrollView
      ref={scrollViewRef}
      onScroll={onScroll}
      onScrollBeginDrag={() => {
        setIsAutoPlay(false);
      }}
      onMomentumScrollEnd={(e) => {
        offSet.value = e.nativeEvent.contentOffset.x;
        setIsAutoPlay(autoPlay);
      }}
      scrollEventThrottle={16}
      decelerationRate="fast"
      snapToInterval={SIZE}
      horizontal
      bounces={false}
      showsHorizontalScrollIndicator={false}
    >
       
      {newData.map((item, index) => {
       
        const style = useAnimatedStyle(() => {
          // console.log((index - 2))
          const scale = interpolate(
            x.value,
            [(index - 2) * SIZE, (index - 1) * SIZE, index * SIZE],
            [0.7, 1.35, 0.7]
          );
          // console.log(scale)
          return {
            transform: [{ scale }],
          };
        });
        if (!item.name) {
          return <View style={{ width: SPACER }} key={index} />;
        }
        return (
          <View
            style={{
              width: SIZE,
              height:height*0.7,
              display:'flex',
              flexDirection:'row',
              //flex: 1,
              alignItems: "center",
              justifyContent: "center",
              //borderWidth:2
              
            }}
            key={index}
            
          >
            
            <Animated.View
              style={[styles.imageContainer, style,
              {
                backgroundColor:'white',
                height:'70%',
                width:'100%',
                borderCurve:'continuous',
              
                }]}
              className=""
            >
              <View style={
              {
                backgroundColor:item.backgroundColor,
                textAlign:'center',
                padding:5
              
                }}>

              <Text 
              style={{
                textAlign:'center',
                color:'white',
                fontWeight:'800'

              }}
              >{item?.name}</Text>
              </View>
              <ScrollView>

                <View
                  style={{
                    padding:10,
                  }}
                >
                  {tasks
                  .filter((task)=>task.status===item.name)
                  .map((task)=>(
                    <View key={task?.id} style={{
                      backgroundColor:'#f3f1f2',
                      padding:5,
                      marginVertical:5,
                      borderCurve:'continuous'
                    }}>
                      <View style={{
                        display:'flex',
                        flexDirection:'row',
                        justifyContent:'space-between',
                        paddingHorizontal:10
                      }}>
                        <Text style={{
                          fontSize:13,
                          fontWeight:'bold'
                        }}>{task?.title}</Text>
                        <View
                          style={{
                            width:20,
                            height:20,
                            backgroundColor:'#25689c',
                            borderCurve:'continuous',
                            borderRadius:2,
                            textAlign:'center',
                            padding:1                         
                          }}
                        >
                          <Text
                            style={{
                              fontSize:10,
                              color:'white',
                              textAlign:'center',
                            }}
                          >{task?.priority}</Text>
                        </View>
                      </View>
                      <View style={styles.horizontalLine} />
                      <View style={{ display:'flex'}}>
                        <Text style={{ fontSize: 10, flexWrap: 'wrap' }}>{task?.description}</Text>
                      </View>
                      <View style={{
                        display:'flex',
                        justifyContent:'space-between',
                        flexDirection:'row',
                        marginVertical:4
                      }}>
                        <Text style={{
                          fontSize:12,
                          fontWeight:700
                        }}>{task?.assignee}</Text>
                        <Pressable onPress={()=>{
                          setShowModal(!showModal)
                          setSelectedId(task?.id)
                          }}>
                          <Text>Button</Text>
                        </Pressable>
                      </View>
                      <View
                      style={{
                        backgroundColor:'#25689c',
                        width:'40%',
                        padding:2,
                        borderRadius:2
                      }}
                      >
                        <Text
                        style={{
                          fontSize:11,
                          color:'white',
                          textAlign:'center'
                        }}
                        >{task?.status}</Text>
                      </View>
                        
                        <Modal
                            animationType="fade"
                            transparent={true}
                            visible={showModal}
                            onRequestClose={() => {
                              
                              setShowModal(!showModal);
                            }}>
                          <View style={styles.centeredView}>
                            <View style={styles.modalView}>
                              
                              <Pressable
                                style={{
                                  display:'flex',
                                  flexDirection:'row',
                                  justifyContent:'flex-end',
                                  marginBottom:8,
                                  paddingHorizontal:10,
                                  paddingVertical:10
                                }}
                                onPress={() => setShowModal(!showModal)}>
                                <View
                                style={{
                                  padding:2,
                                  borderRadius:50,
                                  backgroundColor:'#25689c',
                                  paddingHorizontal:6
                                }}>
                                  <Text style={styles.textStyle}>X</Text>
                                </View>
                              </Pressable>
                              <View>
                                <View >
                                  <Pressable
                                    onPress={()=>{
                                      onEdit(selectedId)
                                      setShowModal(!showModal)
                                    }}
                                  >
                                    <Text style={styles.modalText}>Edit</Text>
                                  </Pressable>
                                </View>
                                <Pressable onPress={createAlert}>
                                  <Text style={styles.modalText}>Delete</Text>
                                </Pressable>
                              </View>
                            </View>
                          </View>
                        </Modal>
                    </View>
                  ))
                  }
                </View>
              </ScrollView>
            </Animated.View>
            
          </View>
        );
      })}
    </Animated.ScrollView>
   
  </View>
  )
}

export default Categories;

const styles = StyleSheet.create({
    
    horizontalLine: {
      borderBottomColor: 'lightgray',
      borderBottomWidth: 1,
      marginVertical: 8, 
    },
    centeredView: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 130,
      flexDirection:'row',
      borderWidth:1
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
    },
    button: {
      height:30,
      width:30,
      borderRadius: 20,
      padding: 5,
      elevation: 2,
      borderCurve:'circular'
    },
    buttonOpen: {
      backgroundColor: '#F194FF',
    },
    buttonClose: {
      backgroundColor: '#2196F3',
    },
    textStyle: {
      color:'white',
      fontWeight: '900',
      textAlign: 'right',
      fontSize:16,
      
    },
    modalText: {
      marginVertical:2,
      textAlign: 'center',
      backgroundColor:'#e5dbfd'    ,
        fontSize:16,
        paddingHorizontal:40,
        paddingVertical:5
    },
  
  });
  
