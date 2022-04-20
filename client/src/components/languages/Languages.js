import { useState, useEffect } from 'react';
import { LanguageConsumer } from '../../providers/LanguageProvider';
import { Form, Pagination } from 'react-bootstrap';
import { MainBtn } from '../../styles/sharedStyles';
import Flash from '../shared/Flash';

const Languages = ({ getLanguages, addLanguage, languages, flash, setFlash, pagination }) => {
  const [pages, setPages] = useState([])
  const [language, setLanguage] = useState({ name: '' })

  useEffect( () => {
    getLanguages()
    renderPages()

    // returned function will be called on component unmount 
    return () => {
      setFlash(null)
    }
  }, [])

  const renderPages = () => {
    let items = []
    for (let num = 1; num <= pagination; num++) {
      items.push(
        <Pagination.Item key={num} onClick={() => getLanguages(num)}>
          {num}
        </Pagination.Item>
      )
    }
    setPages(items)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    addLanguage(language)
    setLanguage('')
  }

  return (
    <>
      { flash ?
          <Flash
            variant={flash.variant}
            msg={flash.msg}
          />
        :
        null
      }
      <h2>Add Language</h2>
        <Form onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Label>Language</Form.Label>
            <Form.Control
              type='text'
              // required
              name='name'
              value={language.name}
              onChange={(e) => setLanguage({ ...language, name: e.target.value })}
              placeholder='name'
            />
          </Form.Group>
          <MainBtn type='submit'>Submit</MainBtn>
        </Form>
      <hr />
      <h1>All My Languages</h1>
      <ul>
        { languages.map( l => 
          <li key={l.id}>{l.name}</li>
        )}
      </ul>
      <Pagination>{pages}</Pagination>
    </>
  )
}

const ConnectedLanguages = (props) => (
  <LanguageConsumer>
    { value => <Languages {...value} {...props} />}
  </LanguageConsumer>
)

export default ConnectedLanguages;