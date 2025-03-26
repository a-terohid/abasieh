"use client"

import { useMemo, useState } from "react";
import { createEditor, Transforms } from "slate";
import { Editable, Slate, withReact } from "slate-react";

const Test = () => {
    const editor = useMemo(() => withReact(createEditor()), []);
  
    const [value, setValue] = useState([
      {
        type: "paragraph",
        children: [{ text: "متن اولیه." }],
      },
    ]);
  
    const onChange = (newValue:any) => {
      setValue(newValue);
    };
  
    const insertImage = (url: string) => {
      const image = { type: "image", url, children: [{ text: "" }] };
      Transforms.insertNodes(editor, image);
    };
  
    const handleImageUpload = async (event : any) => {
      const file = event.target.files[0];
      const formData = new FormData();
      formData.append("image", file);
      
      const res = await fetch("/api/upload-image", {
        method: "POST",
        body: formData,
      });
      
      const data = await res.json();
      if (data.url) {
        insertImage(data.url);
      }
    };
  
    const renderElement = (props:any) => {
      const { element } = props;
      if (element.type === "image") {
        return <img src={element.url} alt="uploaded" {...props.attributes} />;
      }
      return <p {...props.attributes}>{props.children}</p>;
    };
  
    return (
      <Slate editor={editor} initialValue={value} onChange={onChange}>
        <input type="file" onChange={handleImageUpload} />
        <Editable
          renderElement={renderElement}
          placeholder="متن خود را وارد کنید..."
        />
      </Slate>
    );
  };

export default Test;