import React from 'react'
import bgImage from '../assets/bgleft1.png';
import image from '../assets/image.jpg'

const Resume1 = () => {
  return (
    <div style={{flex:1,display:"flex",margin:0,padding:0,height:'100vh',flexDirection:'row',justifyContent:'center'}}>
        <div style={{backgroundImage: `url(${bgImage})`,height:'100%',flex:0.35,maxWidth:200,padding:8,display:'flex',flexDirection:'column',backgroundPosition: 'center',backgroundRepeat: 'no-repeat',backgroundSize: 'cover'}}>
            <div style={{flex:1.5,display:'flex',justifyContent:'center',alignItems:'center',flexDirection:'column',}}>
                <div style={{flex:0.1,width:'100%'}}>
                    <p style={{color:'white',fontWeight:'bold',textAlign:'center'}}>Mika MBA</p>
                </div>
                <div
                    style={{
                        width: 150,
                        height: 150,
                        borderRadius: 75,
                        backgroundColor: 'white',
                        marginTop: 8,
                        aspectRatio: 1, 
                        backgroundImage: `url(${image})`,
                        backgroundSize: 'cover'
                        
                    }}
                >

                </div>
            </div>
            <div style={{marginTop:8,flex:1,display:'flex',justifyContent:'center',alignItems:'center',flexDirection:'column',}}>
                <div style={{flex:0.2,width:'100%',borderBottomWidth:1,borderBottomColor:'#c0c0c0',marginBottom:4}}>
                    <p style={{color:'#31b0b8'}}>Informations Personnelles</p>
                </div>
                <div style={{flex:0.8,width:'100%', overflow: 'hidden',display:'flex',flexDirection:'column'}}>
                    <p style={{fontSize:'0.6rem',whiteSpace: 'normal',wordWrap: 'break-word'}}>Mika MBA</p>
                    <p style={{fontSize:'0.6rem',whiteSpace: 'normal',wordWrap: 'break-word'}}>mbachristian58@gmail.com</p>
                    <p style={{fontSize:'0.6rem',whiteSpace: 'normal',wordWrap: 'break-word'}}>Rond-point damas</p>
                </div>
            </div>
            <div style={{marginTop:8,flex:1,display:'flex',justifyContent:'center',alignItems:'center',flexDirection:'column',}}>
                <div style={{flex:0.2,width:'100%',borderBottomWidth:1,borderBottomColor:'#c0c0c0',marginBottom:4}}>
                    <p style={{color:'#31b0b8'}}>Competences</p>
                </div>
                <div style={{flex:0.8,width:'100%', overflow: 'hidden',display:'flex',flexDirection:'column'}}>
                    <p style={{fontSize:'0.6rem',whiteSpace: 'normal',wordWrap: 'break-word'}}>Mika MBA</p>
                    <p style={{fontSize:'0.6rem',whiteSpace: 'normal',wordWrap: 'break-word'}}>mbachristian58@gmail.com</p>
                    <p style={{fontSize:'0.6rem',whiteSpace: 'normal',wordWrap: 'break-word'}}>Rond-point damas</p>
                </div>
            </div>
            <div style={{marginTop:8,flex:1,display:'flex',justifyContent:'center',alignItems:'center',flexDirection:'column',}}>
                <div style={{flex:0.2,width:'100%',borderBottomWidth:1,borderBottomColor:'#c0c0c0',marginBottom:4}}>
                    <p style={{color:'#31b0b8'}}>Centre d'intérêt</p>
                </div>
                <div style={{flex:0.8,width:'100%', overflow: 'hidden',display:'flex',flexDirection:'column'}}>
                    <p style={{fontSize:'0.6rem',whiteSpace: 'normal',wordWrap: 'break-word'}}>Yoga</p>
                    <p style={{fontSize:'0.6rem',whiteSpace: 'normal',wordWrap: 'break-word'}}>Basket</p>
                </div>
            </div>
        </div>
        <div style={{height:'100%',flex:0.65,padding:8,display:'flex',flexDirection:'column',maxWidth:500}}>
            <div style={{flex:0.2}}>
                <div style={{marginTop:8,flex:1,display:'flex',justifyContent:'center',alignItems:'center',flexDirection:'column',}}>
                    <div style={{flex:0.2,width:'100%',borderBottomWidth:1,borderBottomColor:'#c0c0c0',marginBottom:4}}>
                        <p style={{color:'#31b0b8'}}>Profile</p>
                    </div>
                    <div style={{flex:0.8,width:'100%', overflow: 'hidden',display:'flex',flexDirection:'column'}}>
                        <p style={{
                        fontSize: '0.6rem',
                        whiteSpace: 'normal',
                        wordWrap: 'break-word'
                        }}>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit.  
                            Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.  
                        </p>
                    </div>
                </div>
            </div>
            <div style={{marginTop:8,flex:1}}>
            <div style={{flex:0.2,width:'100%',borderBottomWidth:1,borderBottomColor:'#c0c0c0',marginBottom:4}}>
                <p style={{color:'#31b0b8'}}>Experience professionnelle</p>
                </div>
                <div style={{flex:0.8,width:'100%', overflow: 'hidden',display:'flex',flexDirection:'column'}}>
                    <p style={{
                    fontSize: '0.6rem',
                    whiteSpace: 'normal',
                    wordWrap: 'break-word'
                    }}>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.  
                        Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.  
                    </p> <br/>
                    <p style={{
                    fontSize: '0.6rem',
                    whiteSpace: 'normal',
                    wordWrap: 'break-word'
                    }}>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.  
                        Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.  
                    </p> <br/>
                    <p style={{
                    fontSize: '0.6rem',
                    whiteSpace: 'normal',
                    wordWrap: 'break-word'
                    }}>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.  
                        Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.  
                    </p> <br/>
                    <p style={{
                    fontSize: '0.6rem',
                    whiteSpace: 'normal',
                    wordWrap: 'break-word'
                    }}>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.  
                        Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.  
                    </p> 
                </div>
            </div>
            <div style={{marginTop:8,flex:0.5}}>
            <div style={{flex:0.2,width:'100%',borderBottomWidth:1,borderBottomColor:'#c0c0c0',marginBottom:4}}>
                <p style={{color:'#31b0b8'}}>Formation</p>
                </div>
                <div style={{flex:0.8,width:'100%', overflow: 'hidden',display:'flex',flexDirection:'column'}}>
                    <p style={{
                    fontSize: '0.6rem',
                    whiteSpace: 'normal',
                    wordWrap: 'break-word'
                    }}>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.  
                        Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.  
                    </p>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Resume1;