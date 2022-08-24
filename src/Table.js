import React from 'react'
import { useState } from 'react'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'

export default function Table({ data, updateData }) {

  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [height, setHeight] = useState('');

  const nameChange = (event) => {
    setName(event.target.value);
  };
  const heightChange = (event) => {
    setHeight(event.target.value);
  };
  const ageChange = (event) => {
    setAge(event.target.value);
  };

  const removePerson = (event) => {
    console.log(event.target);
    const newData = data.filter(
      d => d.name !== event.target.name
    );
    updateData(newData);
  }

  const addPerson = () => {
    const newPerson = {
      age: age,
      height: height,
      name: name
    }
    updateData([...data, newPerson]);
    resetForm();
  }

  const resetForm = () => {
    setName("");
    setAge('');
    setHeight('');
  }

  const renderRows = () => {
    return (
      data.map(student => {
        return (
          <Row key={student.name} style={{ marginTop: "10px" }}>
            <Col xs={3} style={{ textAlign: 'center' }}>{student.name}</Col>
            <Col xs={3} style={{ textAlign: 'center' }}>{student.age}</Col>
            <Col xs={3} style={{ textAlign: 'center' }}>{student.height}</Col>
            <Col xs={3} style={{ textAlign: 'center' }}>
              <Button
                className={'remove-button'}
                variant={'danger'}
                type={'button'}
                style={{ width: '100%' }}
                name={student.name}
                onClick={(e) => removePerson(e)}
              >Remove</Button>
            </Col>
          </Row>
        )
      })
    )
  }

  return (
    <div>
      <Row>
        <Col xs={3}>
          <Form.Control className={'input'} placeholder={'Name'} name={'name'} value={name} onChange={nameChange} />
        </Col>
        <Col xs={3}>
          <Form.Control className={'input'} placeholder={'Age'} name={'hieght'} value={age} onChange={ageChange} />
        </Col>
        <Col xs={3}>
          <Form.Control className={'input'} placeholder={'Height'} name={'height'} value={height} onChange={heightChange} />
        </Col>
        <Col xs={3}>
          <Button variant={'primary'} type={'button'} style={{ width: '100%' }} onClick={addPerson}>
            Add
          </Button>
        </Col>
      </Row>
      {renderRows()}
    </div>
  )
}
