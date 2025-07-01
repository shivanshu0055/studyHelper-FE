import React, { useEffect, useRef, useState } from 'react'
import { RxCross1 } from "react-icons/rx";
import { motion, AnimatePresence } from 'framer-motion'
import { useEditorStore } from '../store/useEditorStore';
import axios from 'axios';
import { useAuthStore } from '../store/useAuthStore';
import { Bounce, toast, ToastContainer } from 'react-toastify';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { ScaleLoader } from 'react-spinners';
import { useNoteStore } from '../store/useNoteStore';
import dayjs from 'dayjs';

const ModalSave = ({ isOpen, setIsOpen }) => {
  const [color, setColor] = useState("blue");

  const editorText = useEditorStore((state) => state.editorText);
  const editorJSON = useEditorStore((state) => state.editorJSON);

  const setEditorText=useEditorStore((state)=>state.setEditorText)
  const setEditorJSON=useEditorStore((state)=>state.setEditorJSON)

  const setTitle=useEditorStore((state)=>state.setTitle)
  const setSubject=useEditorStore((state)=>state.setSubject)

  const title=useEditorStore((state)=>state.title)
  const subject=useEditorStore((state)=>state.subject)
  const fetchNote=useNoteStore((state)=>state.fetchNote)

  const token = useAuthStore((state) => state.token);

  const titleRef = useRef();
  const subjectRef = useRef();
  const navigate=useNavigate()

  const [searchParams]=useSearchParams()
  const noteID=searchParams.get('noteID')

  const [isLoading,setIsLoading]=useState(false)

  async function handleSave() {
    try {
      setIsLoading(true)
      if(!noteID){
        // console.log("Hello");
        
        // console.log(editorText);
        
          const res = await axios.post(
          import.meta.env.VITE_BACKEND_URL + "/user/createNote",
          {
            title: titleRef.current.value,
            content: editorText,
            subject: subjectRef.current.value,
            color: color,
            contentJSON: editorJSON,
          },
          {
            headers: {
              Authorization: `<Bearer> ${token}`,
            },
          }
        );
      }
      else{
        const res=await axios.post(
          import.meta.env.VITE_BACKEND_URL+"/user/editNote",{
            noteID:noteID,
            title:titleRef.current.value,
            content:editorText,
            subject:subjectRef.current.value,
            color:color,
            contentJSON:editorJSON
          },{
            headers: {
              Authorization: `<Bearer> ${token}`,
            },
          }
        )
      }
      await fetchNote(dayjs())
      // console.log("Hello");
      setIsLoading(false)
      setIsOpen(false)
      
      navigate("/home")

    } catch (error) {
      setIsOpen(false)
      if (error.status == 400) {
        toast.warn("Please fill all the fields correctly ...", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          theme: "light",
          transition: Bounce,
        });
        return;
      }
      console.log(error);
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick={false}
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
            transition={Bounce}
          />
          {/* Backdrop */}
          <motion.div
            className="fixed top-0 left-0 h-screen w-full bg-black/50 z-10 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7 }}
            exit={{ opacity: 0 }}
          />

          {/* Modal content */}
          <motion.div
            className="bg-white h-fit w-[80%] sm:w-[60%] md:w-[50%] lg:w-[45%] xl:w-[40%] fixed z-10 top-1/2 left-1/2
              -translate-x-1/2 -translate-y-1/2 rounded-lg py-4 px-4 font-poppins"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
          >
            {/* Close button */}
            <div
              onClick={() => setIsOpen(false)}
              className="absolute right-3 top-3 text-black/70 cursor-pointer"
            >
              <RxCross1 />
            </div>

            {/* Title */}
            <div className="text-black text-center text-lg ">
              Save you note ✦
            </div>

            {/* Input */}
            <div className="my-3">
              <div className="text-black/70 text-sm mb-1">Note's Title</div>
              <input
                defaultValue={title}
                ref={titleRef}
                type="text"
                placeholder="eg. Lecture 1 OS"
                className="text-black text-xs outline-1 outline-black/30 bg-gray-100/50 w-full rounded-sm px-2 py-1 md:py-2"
              />
            </div>

            {/* Generated Text Area */}
            <div className="my-3">
              <div className="text-black/70 text-sm mb-1">Subject's Name</div>
              <input
                defaultValue={subject}
                ref={subjectRef}
                type="text"
                placeholder="eg. Operating System"
                className="text-black text-xs outline-1 outline-black/30 bg-gray-100/50 w-full rounded-sm px-2 py-1 md:py-2"
              />
            </div>

            <div className="my-3">
              <div className="text-black/70 text-sm mb-1">Note's Color</div>
              <div className="gap-3 flex mt-2">
                <div
                  onClick={() => setColor("blue")}
                  className={`cursor-pointer h-4 w-4 bg-[#04d9ff] rounded-lg ${
                    color == "blue" ? `outline-2 outline-black` : null
                  }`}
                ></div>
                <div
                  onClick={() => setColor("yellow")}
                  className={`cursor-pointer h-4 w-4 bg-[#fec971] rounded-lg ${
                    color == "yellow" ? `outline-2 outline-black` : null
                  }`}
                ></div>
                <div
                  onClick={() => setColor("green")}
                  className={`cursor-pointer h-4 w-4 bg-[#e3ef8f] rounded-lg ${
                    color == "green" ? `outline-2 outline-black` : null
                  }`}
                ></div>
                <div
                  onClick={() => setColor("orange")}
                  className={`cursor-pointer h-4 w-4 bg-[#fe9b72] rounded-lg ${
                    color == "orange" ? `outline-2 outline-black` : null
                  }`}
                ></div>
                <div
                  onClick={() => setColor("purple")}
                  className={`cursor-pointer h-4 w-4 bg-[#b692fc] rounded-lg ${
                    color == "purple" ? `outline-2 outline-black` : null
                  }`}
                ></div>
              </div>
            </div>

            {/* Generate Button */}
            <div className='flex justify-center items-center'>
              <div
                onClick={handleSave}
                className="cursor-pointer text-center text-white bg-black px-2 py-1 md:py-2 md:px-4 w-fit rounded-md mt-4 h-fit"
              >
                Save
              </div>
            {isLoading &&  <div className='px-2 py-1 md:py-2 md:px-4 w-fit rounded-md mt-4'>
              <ScaleLoader height={24} width={3} margin={1} />
              </div>
            }
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

export default ModalSave
