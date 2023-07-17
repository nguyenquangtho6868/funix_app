import Modal from '@mui/material/Modal';
import { Box } from '@mui/material';
import { useEffect, useState } from 'react';
import { TransformComponent, TransformWrapper } from 'react-zoom-pan-pinch'


function ModalZoomImage(props) {
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    border: 'none',
    outline: 'none',
  };

  const closeDialog = () => {
    props.handleCloseModal();
  };

  return (
    <div className="check-modal">
      <Modal
        open={props.open}
        onClose={props.handleCloseModal}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
        sx={{backgroundColor: 'rgba(0,0,0,0.8)'}}
      >
        <Box sx={{ ...style }}>
          <TransformWrapper defaultScale={1} >
            <TransformComponent>
              <img className='image-zoom' style={{ maxWidth: '70vw', minWidth: '30vw', maxHeight: '80vh', borderRadius: '.5rem', cursor: 'pointer' }} src={props.srcImage} alt="" />
            </TransformComponent>
          </TransformWrapper>
        </Box>
      </Modal>
    </div>
  );
}

export default ModalZoomImage;