import { create } from "zustand";

export const useEditorStore=create((set)=>({

    editorText:"",
    editorJSON:{
  type: 'doc',
  content: [
    {
      type: 'heading',
      attrs: { level: 2 },
      content: [
        {
          type: 'text',
          text: 'Welcome to your new note!',
        },
      ],
    },
    {
      type: 'paragraph',
      content: [
        {
          type: 'text',
          text: 'This editor is powered by ',
        },
        {
          type: 'text',
          marks: [{ type: 'bold' }],
          text: 'Tiptap',
        },
        {
          type: 'text',
          text: ' and supports various rich text features like formatting, lists, and code blocks.',
        },
      ],
    },
    {
      type: 'paragraph',
      content: [
        {
          type: 'text',
          text: 'Here’s what you can try:',
        },
      ],
    },
    {
      type: 'bulletList',
      content: [
        {
          type: 'listItem',
          content: [
            {
              type: 'paragraph',
              content: [
                { type: 'text', text: 'Use ' },
                { type: 'text', marks: [{ type: 'bold' }], text: 'Undo' },
                { type: 'text', text: ' and ' },
                { type: 'text', marks: [{ type: 'bold' }], text: 'Redo' },
                { type: 'text', text: ' buttons to navigate changes' },
              ],
            },
          ],
        },
        {
          type: 'listItem',
          content: [
            {
              type: 'paragraph',
              content: [
                { type: 'text', text: 'Create bullet or numbered lists easily' },
              ],
            },
          ],
        },
        {
          type: 'listItem',
          content: [
            {
              type: 'paragraph',
              content: [
                { type: 'text', text: 'Insert headings, quotes, and dividers' },
              ],
            },
          ],
        },
        {
          type: 'listItem',
          content: [
            {
              type: 'paragraph',
              content: [
                { type: 'text', text: 'Write code using code blocks' },
              ],
            },
          ],
        },
      ],
    },
    {
      type: 'blockquote',
      content: [
        {
          type: 'paragraph',
          content: [
            {
              type: 'text',
              text: 'This is a blockquote — perfect for highlighting important ideas or quotes!',
            },
          ],
        },
      ],
    },
    {
      type: 'codeBlock',
      attrs: { language: 'js' },
      content: [
        {
          type: 'text',
          text: '// Example code block\nconst greet = () => {\n  console.log("Hello, world!");\n};',
        },
      ],
    },
    {
      type: 'paragraph',
      content: [
        {
          type: 'text',
          text: 'Now that you’ve seen the features, go ahead and make this note your own! 🚀',
        },
      ],
    },
  ],
},
    title:"",
    subject:"",
    
    setEditorText:(editorText)=>{
        set({editorText:editorText})
    },

    setEditorJSON:(editorJSON)=>{
        set({editorJSON:editorJSON})
    },

    setTitle:(title)=>{
        set({title:title})
    },

    setSubject:(subject)=>{
        set({subject:subject})
    }

}))
