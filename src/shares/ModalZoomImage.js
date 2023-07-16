import Modal from '@mui/material/Modal';
import { Box } from '@mui/material';
import { useEffect, useState } from 'react';


function ModalZoomImage(props) {
  console.log(props.srcImage);
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    border: 'none',
    outline: 'none'
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
      >
        <Box sx={{ ...style}}>
          <img style={{ maxWidth: '70vw',maxHeight: '50vh', borderRadius: '.5rem', cursor: 'pointer' }} src={props.srcImage} alt="" />
        </Box>
      </Modal>
    </div>
  );
}

export default ModalZoomImage;