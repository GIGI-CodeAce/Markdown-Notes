// import "bootstrap/dist/css/bootstrap.min.css";
import { Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect, useMemo } from "react";
import { Container } from 'react-bootstrap';
import { NewNote } from './NewNote';
import { useLocalStorage } from './useLocalStorageHook';
import {nanoid} from 'nanoid'

export type Note = {
  id: string,
} & NoteData

export type rawNote ={
  id: string,
}& rawNoteData

export type rawNoteData ={
  title: string,
  markdown: string,
  tagIds: string[],
}

export type NoteData ={
  title: string,
  markdown: string,
  tags: Tag[],
}

export type Tag = {
  id: string,
  label: string,
}

function App() {
  const [notes, setNotes] = useLocalStorage<rawNote[]>("NOTES", []);
  const [tags, setTags] = useLocalStorage<Tag[]>("TAGS", []);

  const notesWithTags = useMemo(() => {
    return notes.map(note => {
      return { ...note, tags: tags.filter(tag => note.tagIds.includes(tag.id)) };
    });
  }, [notes, tags]);

  function onCreateNote( {tags, ...data}: NoteData){
    setNotes(prevNotes =>{
      return [...prevNotes,{...data, id: nanoid(), tagIds: tags.map(tag => tag.id)}]
    })
  }

  return (
    <Container className="my-4">
      <Routes>    
        <Route path='/' element={<h1 className='m-2 underline'>Home</h1>}/>
        <Route path='/new' element={<NewNote onSubmit={onCreateNote}/>}/>
        <Route path='/:id'>
          <Route index element={<h1>Show</h1>}/>
          <Route path='edit' element={<h1>Edit</h1>}/>
        </Route>
        <Route path='*' element={<Navigate to="/"/> }/>
      </Routes>
    </Container>
  );
}

export default App;
