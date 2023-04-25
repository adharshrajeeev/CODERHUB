import React from 'react'
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import Slide from '@mui/material/Slide';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });
  

function BlockPostModal({isBlocked,handleBlockAndUnBlock,postId,data}) {

    const [open, setOpen] = React.useState(false);
    const [blockOpen,setBlockOpen]=React.useState(false);


    const handleBlockOpen = ()=>{
        setBlockOpen(true)
    };


    const handleBlockClose = ()=>{
        setBlockOpen(false)
    }

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleBlockAgree = ()=>{
    handleBlockAndUnBlock(postId,isBlocked);
    handleBlockClose();
  }

  const handleUnBlockAgree = ()=>{
    handleBlockAndUnBlock(postId,isBlocked);
    handleClose();
  }

  return (
    <div>
        {
            isBlocked ? 
      <Button variant="outlined" onClick={handleClickOpen}>
       UnBlock
      </Button> :
       <Button variant="outlined" onClick={handleBlockOpen}>
         Block
     </Button>
        }
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
           Are You Sure to UnBlock {data} ?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleUnBlockAgree}>Agree</Button>
        </DialogActions>
      </Dialog>


      <Dialog
        open={blockOpen}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleBlockClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Are you Sure to Block {data}?.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleBlockClose}>Cancel</Button>
          <Button onClick={handleBlockAgree}>Agree</Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default BlockPostModal