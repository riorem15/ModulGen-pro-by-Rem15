import React, { useCallback } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { TextStyle } from '@tiptap/extension-text-style';
import { FontFamily } from '@tiptap/extension-font-family';
import { Table } from '@tiptap/extension-table';
import { TableRow } from '@tiptap/extension-table-row';
import { TableCell } from '@tiptap/extension-table-cell';
import { TableHeader } from '@tiptap/extension-table-header';
import ImageResize from 'tiptap-extension-resize-image';
import { TextAlign } from '@tiptap/extension-text-align';
import { Underline } from '@tiptap/extension-underline';
import { ListItem } from '@tiptap/extension-list-item';
import { Color } from '@tiptap/extension-color';
import { 
  Bold, Italic, Underline as UnderlineIcon, 
  List, ListOrdered, AlignLeft, AlignCenter, AlignRight, AlignJustify,
  Table as TableIcon, Image as ImageIcon
} from 'lucide-react';
import './Editor.css';

const MenuBar = ({ editor }) => {
  if (!editor) {
    return null;
  }

  const addImage = useCallback(() => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = (event) => {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          editor.chain().focus().setImage({ src: e.target.result }).run();
        };
        reader.readAsDataURL(file);
      }
    };
    input.click();
  }, [editor]);

  const insertTable = () => {
    editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run();
  };

  const preventFocusLoss = (e) => {
    e.preventDefault();
  };

  return (
    <div className="editor-toolbar">
      <div className="toolbar-group">
        <button type="button" onMouseDown={preventFocusLoss} onClick={() => editor.chain().focus().toggleBold().run()} className={`toolbar-btn ${editor.isActive('bold') ? 'active' : ''}`} title="Bold"><Bold size={16} /></button>
        <button type="button" onMouseDown={preventFocusLoss} onClick={() => editor.chain().focus().toggleItalic().run()} className={`toolbar-btn ${editor.isActive('italic') ? 'active' : ''}`} title="Italic"><Italic size={16} /></button>
        <button type="button" onMouseDown={preventFocusLoss} onClick={() => editor.chain().focus().toggleUnderline().run()} className={`toolbar-btn ${editor.isActive('underline') ? 'active' : ''}`} title="Underline"><UnderlineIcon size={16} /></button>
      </div>

      <div className="toolbar-group">
        <button type="button" onMouseDown={preventFocusLoss} onClick={() => editor.chain().focus().toggleBulletList().run()} className={`toolbar-btn ${editor.isActive('bulletList') ? 'active' : ''}`} title="Bullet List"><List size={16} /></button>
        <button type="button" onMouseDown={preventFocusLoss} onClick={() => editor.chain().focus().toggleOrderedList().run()} className={`toolbar-btn ${editor.isActive('orderedList') ? 'active' : ''}`} title="Numbered List"><ListOrdered size={16} /></button>
      </div>

      <div className="toolbar-group">
        <button type="button" onMouseDown={preventFocusLoss} onClick={() => editor.chain().focus().setTextAlign('left').run()} className={`toolbar-btn ${editor.isActive({ textAlign: 'left' }) ? 'active' : ''}`}><AlignLeft size={16} /></button>
        <button type="button" onMouseDown={preventFocusLoss} onClick={() => editor.chain().focus().setTextAlign('center').run()} className={`toolbar-btn ${editor.isActive({ textAlign: 'center' }) ? 'active' : ''}`}><AlignCenter size={16} /></button>
        <button type="button" onMouseDown={preventFocusLoss} onClick={() => editor.chain().focus().setTextAlign('right').run()} className={`toolbar-btn ${editor.isActive({ textAlign: 'right' }) ? 'active' : ''}`}><AlignRight size={16} /></button>
        <button type="button" onMouseDown={preventFocusLoss} onClick={() => editor.chain().focus().setTextAlign('justify').run()} className={`toolbar-btn ${editor.isActive({ textAlign: 'justify' }) ? 'active' : ''}`}><AlignJustify size={16} /></button>
      </div>

      <div className="toolbar-group">
        <button type="button" onMouseDown={preventFocusLoss} onClick={insertTable} className="toolbar-btn" title="Insert Table"><TableIcon size={16} /></button>
        <button type="button" onMouseDown={preventFocusLoss} onClick={() => editor.chain().focus().addColumnBefore().run()} className="toolbar-btn tooltip-btn" title="Add Col Before">+Col</button>
        <button type="button" onMouseDown={preventFocusLoss} onClick={() => editor.chain().focus().deleteColumn().run()} className="toolbar-btn tooltip-btn" title="Del Col">-Col</button>
        <button type="button" onMouseDown={preventFocusLoss} onClick={() => editor.chain().focus().addRowBefore().run()} className="toolbar-btn tooltip-btn" title="Add Row Before">+Row</button>
        <button type="button" onMouseDown={preventFocusLoss} onClick={() => editor.chain().focus().deleteRow().run()} className="toolbar-btn tooltip-btn" title="Del Row">-Row</button>
        <button type="button" onMouseDown={preventFocusLoss} onClick={() => editor.chain().focus().deleteTable().run()} className="toolbar-btn tooltip-btn" title="Del Table">xTb</button>
      </div>

      <div className="toolbar-group">
        <button type="button" onMouseDown={preventFocusLoss} onClick={addImage} className="toolbar-btn" title="Insert Image"><ImageIcon size={16} /></button>
      </div>
    </div>
  );
};

const Editor = ({ value, onChange, placeholder }) => {
  // ImageResize replaces CustomImage and provides drag handles

  const editor = useEditor({
    extensions: [
      StarterKit,
      TextStyle,
      Color,
      FontFamily.configure({ types: ['textStyle'] }),
      Underline,
      TextAlign.configure({
        types: ['heading', 'paragraph', 'image'],
        alignments: ['left', 'center', 'right', 'justify'],
      }),
      Table.configure({ resizable: true }),
      TableRow,
      TableHeader,
      TableCell,
      ImageResize.configure({ allowBase64: true }),
    ],
    content: value,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  return (
    <div className="editor-container" style={{ position: 'relative' }}>
      <MenuBar editor={editor} />
      <EditorContent editor={editor} className="editor-content-area" />
    </div>
  );
};

export default Editor;
