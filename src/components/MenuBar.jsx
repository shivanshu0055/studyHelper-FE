import { Color } from '@tiptap/extension-color'
import ListItem from '@tiptap/extension-list-item'
import TextStyle from '@tiptap/extension-text-style'
import { EditorProvider, useCurrentEditor, useEditorState } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { FaBold } from "react-icons/fa";
import { FaItalic } from "react-icons/fa";
import { FaStrikethrough } from "react-icons/fa";
import { FaCode } from "react-icons/fa";
import { FaParagraph } from "react-icons/fa";
import { GoListUnordered } from "react-icons/go";
import { GoListOrdered } from "react-icons/go";
import { MdHorizontalRule } from "react-icons/md";
import { FaUndo } from "react-icons/fa";
import { FaRedo } from "react-icons/fa";
import { FaHeading } from "react-icons/fa";
import { FaQuoteLeft } from "react-icons/fa";
import { FaHighlighter } from "react-icons/fa";
import { IoSave } from "react-icons/io5";
import { GiStarSwirl } from "react-icons/gi";
import { useEffect, useState } from 'react'
import { useParams, useSearchParams } from 'react-router-dom'
import { useEditorStore } from '../store/useEditorStore'
import { useNoteStore } from '../store/useNoteStore'
import { useAuthStore } from '../store/useAuthStore'
import axios from 'axios'

const MenuBar = ({isOpenAI,setIsOpenAI,isOpenSave,setIsOpenSave}) => {

  const { editor } = useCurrentEditor()

  if (!editor) {
    return null
  }

  const editorJSON=useEditorStore((state)=>state.editorJSON)
  const editorHTML=useEditorStore((state)=>state.editorHTML)
  const setEditorText=useEditorStore((state)=>state.setEditorText)
  const setEditorJSON=useEditorStore((state)=>state.setEditorJSON)
  const setTitle=useEditorStore((state)=>state.setTitle)
  const setSubject=useEditorStore((state)=>state.setSubject)

  const notes=useNoteStore((state)=>state.notes)
  const token=useAuthStore((state)=>state.token)

  const [searchParams]=useSearchParams()
  const noteID=searchParams.get('noteID')
  
  useEffect(()=>{

    if (editor && editorJSON?.type === 'doc') {
      editor.commands.setContent(editorJSON)
    }

  },[editorJSON])

  useEffect(()=>{
    
    if(!noteID) return
    
    const fetchNoteInfo=async ()=>{
      try{
        const res=await axios.post(import.meta.env.VITE_BACKEND_URL+"/user/getNote",{
        noteID:noteID
      },{
        headers:{
          "authorization":`<Bearer> ${token}`
        }
      })

      setEditorJSON(res.data.note.contentJSON)
      setEditorText(res.data.note.content)
      setTitle(res.data.note.title)
      setSubject(res.data.note.subject)

    }
    catch(error){
      console.log(error);
    }

  }
  fetchNoteInfo()
  },[ noteID,notes ])

  return (
    <div className="control-group mb-4 border-[3px] p-1 rounded-2xl border-editorButton " >

      <div className="button-group flex flex-wrap justify-center ">
        <button
          onClick={() => editor.chain().focus().toggleBold().run()}
          disabled={
            !editor.can()
              .chain()
              .focus()
              .toggleBold()
              .run()
          }
          className={editor.isActive('bold') ? 'is-active bg-gray-300 text-black' : ''}
        >
          <FaBold />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          disabled={
            !editor.can()
              .chain()
              .focus()
              .toggleItalic()
              .run()
          }
          className={editor.isActive('italic') ? 'is-active bg-gray-300 text-black' : ''}
        >
          <FaItalic />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleStrike().run()}
          disabled={
            !editor.can()
              .chain()
              .focus()
              .toggleStrike()
              .run()
          }
          className={editor.isActive('strike') ? 'is-active bg-gray-300 text-black' : ''}
        >
          <FaStrikethrough />

        </button>
        
        <button
          onClick={() => editor.chain().focus().setParagraph().run()}
          className={editor.isActive('paragraph') ? 'is-active bg-gray-300 text-black' : ''}
        >
          <FaParagraph />

        </button>
        
        <button
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          className={editor.isActive('heading', { level: 2 }) ? 'is-active bg-gray-300 text-black' : ''}
        >
          <FaHeading />

        </button>
        <button
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={editor.isActive('bulletList') ? 'is-active bg-gray-300 text-black' : ''}
        >
          <GoListUnordered />

        </button>
        <button
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={editor.isActive('orderedList') ? 'is-active bg-gray-300 text-black' : ''}
        >
          <GoListOrdered />

        </button>
        <button
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
          className={editor.isActive('codeBlock') ? 'is-active bg-gray-300 text-black' : ''}
        >
          <FaCode />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          className={editor.isActive('blockquote') ? 'is-active bg-gray-300 text-black' : ''}
        >
          <FaQuoteLeft />

        </button>
        <button onClick={() => editor.chain().focus().setHorizontalRule().run()}>
          <MdHorizontalRule />
        </button>
    
        <button
          onClick={() => editor.chain().focus().undo().run()}
          disabled={
            !editor.can()
              .chain()
              .focus()
              .undo()
              .run()
          }
        >
          <FaUndo />

        </button>
        <button
          onClick={() => editor.chain().focus().redo().run()}
          disabled={
            !editor.can()
              .chain()
              .focus()
              .redo()
              .run()
          }
        >
          <FaRedo />

        </button>
        <button
          onClick={() => editor.chain().focus().setColor('#958DF1').run()}
          className={editor.isActive('textStyle', { color: '#958DF1' }) ? 'is-active' : ''}
        >
          <FaHighlighter />
        </button>
        <button onClick={()=>{
          // console.log("Hello");
          setEditorJSON(editor.getJSON())
          setEditorText(editor.getText())
          
          setIsOpenSave(!isOpenSave)}} className='flex gap-1 justify-center items-center'>
          <IoSave />
          <div  className='font-semibold text-sm'>
            SAVE
          </div>
        </button>
        <button className='flex gap-1 justify-center items-center' onClick={()=>{
          setIsOpenAI(!isOpenAI)
        }}>
          <GiStarSwirl />
          <div className='font-semibold text-sm'>
            AI
          </div>
        </button>
      </div>
    </div>
  )
}

const extensions = [
  Color.configure({ types: [TextStyle.name, ListItem.name] }),
  TextStyle.configure({ types: [ListItem.name] }),
  StarterKit.configure({
    bulletList: {
      keepMarks: true,
      keepAttributes: false, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
    },
    orderedList: {
      keepMarks: true,
      keepAttributes: false, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
    },
  }),
]

const content = {

    "type": "doc",

    "content": [

      {

        "type": "heading",

        "attrs": {

          "level": 2

        },

        "content": [

          {

            "type": "text",

            "text": "Hi there,"

          }

        ]

      },

      {

        "type": "paragraph",

        "content": [

          {

            "type": "text",

            "text": "this is a "

          },

          {

            "type": "text",

            "marks": [

              {

                "type": "italic"

              }

            ],

            "text": "basic"

          },

          {

            "type": "text",

            "text": " example of "

          },

          {

            "type": "text",

            "marks": [

              {

                "type": "bold"

              }

            ],

            "text": "Tiptap"

          },

          {

            "type": "text",

            "text": ". Sure, there are all kind of basic text styles you’d probably expect from a text editor. But wait until you see the lists:"

          }

        ]

      },

      {

        "type": "bulletList",

        "content": [

          {

            "type": "listItem",

            "attrs": {

              "color": ""

            },

            "content": [

              {

                "type": "paragraph",

                "content": [

                  {

                    "type": "text",

                    "text": "That’s a bullet list with one …"

                  }

                ]

              }

            ]

          },

          {

            "type": "listItem",

            "attrs": {

              "color": ""

            },

            "content": [

              {

                "type": "paragraph",

                "content": [

                  {

                    "type": "text",

                    "text": "… or two list items."

                  }

                ]

              }

            ]

          }

        ]

      },

      {

        "type": "paragraph",

        "content": [

          {

            "type": "text",

            "text": "Isn’t that great? And all of that is editable. But wait, there’s more. Let’s try a code block:"

          }

        ]

      },

      {

        "type": "codeBlock",

        "attrs": {

          "language": "css"

        },

        "content": [

          {

            "type": "text",

            "text": "body {\n  display: none;\n}"

          }

        ]

      },

      {

        "type": "paragraph",

        "content": [

          {

            "type": "text",

            "text": "I know, I know, this is impressive. It’s only the tip of the iceberg though. Give it a try and click a little bit around. Don’t forget to check the other examples too."

          }

        ]

      },

      {

        "type": "blockquote",

        "content": [

          {

            "type": "paragraph",

            "content": [

              {

                "type": "text",

                "text": "Wow, that’s amazing. Good work, boy! 👏 "

              },

              {

                "type": "hardBreak"

              },

              {

                "type": "text",

                "text": "— Mom"

              }

            ]

          }

        ]

      }

    ]

  }

export default ({isOpenSave,setIsOpenSave,isOpenAI,setIsOpenAI}) => {
  const editorJSON=useEditorStore((state)=>state.editorJSON)
  // console.log(editorJSON);
  // console.log("hloo");
  
  return (
    <div className='p-3 editor-content sm:w-[97%] md:w-[91%] lg:w-[75%] xl:w-[65%] rounded-lg mt-10 mb-6'>
    <EditorProvider slotBefore={<MenuBar isOpenSave={isOpenSave} setIsOpenSave={setIsOpenSave} isOpenAI={isOpenAI} setIsOpenAI={setIsOpenAI}/>} extensions={extensions} content={editorJSON}></EditorProvider>
    </div>
  )
}