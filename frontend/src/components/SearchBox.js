import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import css from './css/Nav.css'

const SearchBox = ({ history }) => {
  const [keyword, setKeyword] = useState('')

  const submitHandler = (e) => {
    e.preventDefault()
    if (keyword.trim()) {
      history.push(`/search/${keyword}`)
    } else {
      history.push('/')
    }
  }

  return (
    <Form onSubmit={submitHandler} inline>
      <Form.Control
        type='text'
        name='q'
        onChange={(e) => setKeyword(e.target.value)}
        placeholder='Search here...'
        className='mr-sm-2 ml-sm-5 search-form'
      ></Form.Control>
      <Button type='submit' variant='outline-danger' className='p-2 search-btn'>
      <i className="fas fa-search"></i> search
      </Button>
    </Form>
  )
}

export default SearchBox
