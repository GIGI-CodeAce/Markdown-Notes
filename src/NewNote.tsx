import { Col, Form as BootstrapForm, Row, Stack, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import CreatableReactSelect from 'react-select/creatable';

export function NewNote() {
    return (
        <Stack gap={4}>
            <Row>
                <Col>
                    <BootstrapForm.Group controlId="title">
                        <BootstrapForm.Label>Title</BootstrapForm.Label>
                        <BootstrapForm.Control required placeholder="Enter note title" />
                    </BootstrapForm.Group>
                </Col>
                <Col>
                    <BootstrapForm.Group controlId="tags">
                        <BootstrapForm.Label>Tags</BootstrapForm.Label>
                        <CreatableReactSelect isMulti placeholder="Add tags..." />
                    </BootstrapForm.Group>
                </Col>
            </Row>
            <Col>
                <BootstrapForm.Group controlId="markDown">
                    <BootstrapForm.Label>Body</BootstrapForm.Label>
                    <BootstrapForm.Control required as="textarea" rows={15} placeholder="Write your note here..." />
                </BootstrapForm.Group>
                <Stack direction="horizontal" gap={3} className="justify-content-end">
                    <Button type="submit" variant="primary">Save</Button>
                    <Link to=".."><Button type="button" variant="outline-secondary">Cancel</Button></Link>
                </Stack>
            </Col>
        </Stack>
    );
}
