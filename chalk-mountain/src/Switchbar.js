import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Form from 'react-bootstrap/Form';

export default function Switchbar(){
    return(
        <div className="switchbar">
            <ButtonGroup className="switch" aria-label="First group">
                <Button>All</Button> <Button>In-Service</Button> <Button>Out-of-Service</Button>{' '}
            </ButtonGroup>
            <ButtonGroup className="search" aria-label="Second group">
            <Form className="d-flex">
                <Form.Control
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
                />
            {/* <Button variant="outline-success">Search</Button> */}
            </Form>
        </ButtonGroup>
        </div>
        
    )
}
