"use client";
import { Box, Stack, Typography, Button, Modal, TextField } from "@mui/material";
import { firestore } from "./firebase.js";
import { collection, getDocs, query, doc, setDoc, deleteDoc, getDoc} from "@firebase/firestore";
import { useEffect, useState } from "react";
// const items = ["tomato","Potato","Garlic","Ginger","lettuce"]



export default function Home() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [itemName, setItemName] = useState('  ')


  const [pantry, setPantry] = useState([]);


  const updatePantry = async () => {
    {
      const snapshot = query(collection(firestore, "pantry"));
      const docs = await getDocs(snapshot);
      const pantryList = [];
      docs.forEach((doc) => {
        pantryList.push(doc.id);
      });   
      console.log(pantryList);
      setPantry(pantryList);
    }
  };
  useEffect(() => {
    updatePantry();
  }, []);


  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

  const addItem = async(item) => {
    const docRef = doc(collection(firestore,'pantry'), item)
    // const docSnap = await getDoc(docRef)
    //console.log(docSnap.data())
    await setDoc(docRef,{})
    await updatePantry()
  }

  const removeItem = async(item) => {
    const docRef = doc(collection(firestore,'pantry'), item)
    await deleteDoc(docRef)
    updatePantry()
  }
  return (
    <>
      <Box
        width="100vw"
        height="100vh"
        display={"flex"}
        justifyContent={"center"}
        flexDirection={"column"}
        alignItems={"center"}
        gap={2}
      >
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Add an Item.
            </Typography>
            <Stack width={'100%'} direction={'row'} spacing={2}>
               <TextField id="outlined-basic" label="Outlined" variant="outlined" value={itemName}  
               onChange={(e) => setItemName(e.target.value)}
               />
               <Button variant="contained" onClick={()=> 
                {
                  addItem(itemName)
                  setItemName('')
                  handleClose()
                }
               }>Add</Button>  
            </Stack>
          </Box>
        </Modal>
        <Button variant="contained" onClick={handleOpen}>Add</Button>
        <Box
          width={"800px"}
          height={"100px"}
          bgcolor={"#ADD8E6"}
          marginBottom={"30px"}
        >
          <Typography
            varient={"h2"}
            color={"#333"}
            textAlign={"center"}
            marginTop={"30px"}
            fontSize={"30px"}
          >
            Pantry Items
          </Typography>
        </Box>
        <Stack
          width="70%"
          height="60%"
          spacing={2}
          overflow={"scroll"}
          border={"1px solid black"}
        >
          {pantry.map((i) => ( 
            <Box
              key={i}
              width="100%"
              minHeight={'150px'}
              display={"flex"}
              justifyContent={"space-between"}
              alignItems={"center"}
              paddingX={2}  
              bgcolor={"#f0f0f0"}
            >
              <Typography variant={"h4"} color={"#333"} textAlign={"center"}>
                {i.charAt(0).toUpperCase() + i.slice(1)}
              </Typography>

              <Button variant="contained" onClick={() => removeItem(i)}>Remove</Button>

            </Box>
          ))}
        </Stack>
      </Box>
    </>
  );
}
