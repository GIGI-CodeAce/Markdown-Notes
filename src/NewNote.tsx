import { FormEvent, useRef, useState } from "react";
import { Col, Form as BootstrapForm, Form, Row, Stack, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { NoteData, Tag } from "./App";
import CreatableReactSelect from 'react-select/creatable';

type NoteFormProps = {
  onSubmit: (data: NoteData) => void;
};

export function NewNote({ onSubmit }: NoteFormProps) {
  const titleref = useRef<HTMLInputElement>(null);
  const markdownRef = useRef<HTMLTextAreaElement>(null);
  const [selectedTags, setSelectedTags] = useState<Tag[]>([]);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();

    onSubmit({
      title: titleref.current!.value,
      markdown: markdownRef.current!.value,
      tags: selectedTags,
    });
  }

  return (
    <Form onSubmit={handleSubmit}>
      <Stack gap={4}>
        <Row>
          <Col>
            <BootstrapForm.Group controlId="title">
              <BootstrapForm.Label>Title</BootstrapForm.Label>
              <BootstrapForm.Control ref={titleref} required placeholder="Enter note title" />
            </BootstrapForm.Group>
          </Col>
          <Col>
            <BootstrapForm.Group controlId="tags">
              <BootstrapForm.Label>Tags</BootstrapForm.Label>
              <CreatableReactSelect
                value={selectedTags.map(tag => {
                  return { label: tag.label, value: tag.id };
                })}
                onChange={tags => setSelectedTags(tags.map(tag => {
                  return { label: tag.label, id: tag.value };
                }))}
                isMulti
                placeholder="Add tags..."
              />
            </BootstrapForm.Group>
          </Col>
        </Row>
        <Col>
          <BootstrapForm.Group controlId="markDown">
            <BootstrapForm.Label>Body</BootstrapForm.Label>
            <BootstrapForm.Control required as="textarea" ref={markdownRef} rows={15} placeholder="Write your note here..." />
          </BootstrapForm.Group>
          <Stack direction="horizontal" gap={3} className="justify-content-end">
            <Button type="submit" variant="primary">Save</Button>
            <Link to=".."><Button type="button" variant="outline-secondary">Cancel</Button></Link>
          </Stack>
        </Col>
      </Stack>
    </Form>
  );
}