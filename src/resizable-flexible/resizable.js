import { Resizable } from 're-resizable';
import { useState, useEffect } from 'react';
import '../css/styles.css'
const ResizableFlexible = () => {
  const [bottomSize, setBottomSize] = useState({width:window.innerWidth,height:window.innerHeight/2});
  const [leftSize, setLeftSize] = useState({width:window.innerWidth/2,height: window.innerHeight/2});
  const [rightSize, setRightSize] = useState({width: window.innerWidth/2,height:window.innerHeight/2});

  const [resizing, setResizing] = useState(false);

  useEffect(() => {
    let timeoutId;
    if (resizing) {
      timeoutId = setTimeout(() => {
        setResizing(false);
      }, 100);
    }
    return () => {
      clearTimeout(timeoutId);
    };
  }, [resizing]);

  const resizeStop = (type,e,dir,ref,delta) => {
    setResizing(true);

    if((dir == 'top' || dir == 'bottom') && type == 2 ){
      setBottomSize(prevSize => ({
        ...prevSize,
        height: prevSize.height + delta.height
      }));
      setLeftSize(prevSize => ({
        ...prevSize,
        height: prevSize.height - delta.height
      }));
      setRightSize(prevSize => ({
        ...prevSize,
        height: prevSize.height - delta.height
      }));

    }else{
      setBottomSize(prevSize => ({
        ...prevSize,
        height: prevSize.height - delta.height
      }));
      setLeftSize(prevSize => ({
        ...prevSize,
        height: prevSize.height + delta.height
      }));
      setRightSize(prevSize => ({
        ...prevSize,
        height: prevSize.height + delta.height
      }));

    }


    if((dir == 'left' || dir == 'right') && type == 2 ){
      setBottomSize(prevSize => ({
        ...prevSize,
        width: prevSize.width + delta.width
      }));
      
    }else if( (dir == 'left' || dir == 'right') && type == 1){
     
      setLeftSize(prevSize => ({
        ...prevSize,
        width: prevSize.width - delta.width
      }));
      setRightSize(prevSize => ({
        ...prevSize,
        width: prevSize.width + delta.width
      }));

    }else if((dir == 'left' || dir == 'right') &&  type == 0){
      setLeftSize(prevSize => ({
        ...prevSize,
        width: prevSize.width + delta.width
      }));
      setRightSize(prevSize => ({
        ...prevSize,
        width: prevSize.width - delta.width
      }));

    }
  }

  return (
    <div
      style={{
        width: '100vw',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'row',
        }}
      >
        <Resizable
          className='color-card'
          style={{ overflow: 'hidden', border:'1px solid black', backgroundColor:'lightcyan' }}
          size={{width:leftSize.width, height:leftSize.height}}
          onResizeStop={(e,dir,ref,delta) => resizeStop(0,e,dir,ref,delta)}
        >
          001
        </Resizable>
        <Resizable
          className='color-card'
          style={{  overflow: 'hidden', border:'1px solid black',backgroundColor:'lightblue' }}
          size={{width:rightSize.width, height:rightSize.height}}
          onResizeStop={(e,dir,ref,delta) => resizeStop(1,e,dir,ref,delta)}

        >
          002
        </Resizable>
      </div>
      <Resizable
        className='color-card'
        style={{ overflow: 'hidden', border:'1px solid black', backgroundColor:'lightgoldenrodyellow' }}
        size={{width:bottomSize.width, height:bottomSize.height}}
        onResizeStart={(e,dir)=>{}}
        onResizeStop={(e,dir,ref,delta) => resizeStop(2,e,dir,ref,delta)}
      >
        003
      </Resizable>
    </div>
  );
};

export default ResizableFlexible;
