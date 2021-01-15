import React from "react";
import * as db from "../firestore";

const DEFAULT_LIST = {
  name: "",
  description: "",
  image: null,
}

function CreateList({ user }) {
  const [list, setList] = React.useState(DEFAULT_LIST);
  function handleChange(event) {
    const { name, value, files } = event.target;
    if (files) {
      const image = files;
      setList(prevState => ({ ...prevState, image }));
    } else {
      setList(prevState => ({ ...prevState, [name]: value }));
    }
    
  }
  async function handleCreateList() {
    await db.createList(list, user);
    setList(DEFAULT_LIST)
    console.log(list)
  }
  return (
    <div className="flex flex-col text-center w-full mb-12">
      <h1 className="text-2xl font-medium title-font mb-4 text-white tracking-widest">
        WELCOME, {user.displayName.toUpperCase()}!
      </h1>
      <p className="lg:w-2/3 mx-auto mb-12 leading-relaxed text-base">
        To get started, create a task with a name
      </p>
      <div className="lg:w-2/6 mx-auto md:w-1/2 bg-gray-800 rounded-lg p-8 flex flex-col md:ml-auto w-full mt-10 md:mt-0">
        <input
          className="bg-gray-900 rounded border text-white border-gray-900 focus:outline-none focus:border-green-500 text-base px-4 py-2 mb-4"
          placeholder="Add task name"
          type="text"
          name="name"
          onChange={handleChange}
          value={list.name}
          required
        />
        <textarea
          className="bg-gray-900 rounded border text-white border-gray-900 focus:outline-none focus:border-green-500 text-base px-4 py-2 mb-4"
          placeholder="Add short description"
          type="text"
          name="description"
          onChange={handleChange}
          value={list.description}
        />
        {/* <input
          className="bg-gray-900 rounded border text-white border-gray-900 focus:outline-none focus:border-green-500 text-base px-4 py-2 mb-4"
          placeholder="Add list name"
          type="file"
          name="image"
          onChange={handleChange}
        /> */}
        {list.image && (
          <img className="mb-4" src={URL.createObjectURL(list.image)}/>
        )}
        <button 
          onClick={handleCreateList}
          className="text-white bg-green-500 border-0 py-2 px-8 focus:outline-none hover:bg-green-600 rounded text-lg">
          Create Task
        </button>
        <p className="text-xs text-gray-600 mt-3">*Task name required</p>
      </div>
    </div>
  );
}

export default CreateList;
