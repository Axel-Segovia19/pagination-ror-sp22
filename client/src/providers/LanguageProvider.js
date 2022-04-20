import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AuthConsumer } from './AuthProvider';

export const LanguageContext = React.createContext();
export const LanguageConsumer = LanguageContext.Consumer;

const LanguageProvider = ({ children, user }) => {
  const [languages, setLanguages] = useState([])
  const [pagination, setPagination] = useState(1)
  const [headers, setHeader] = useState({})
  const [flash, setFlash] = useState(null)

  const navigate = useNavigate()

  const getLanguages = (page = 1) => {
    axios.get(`/api/users/${user.id}/languages?page=${page}`)
      .then( res => {
        const { headers, data } = res 
        const totalPages = Math.ceil(headers['x-total'] / headers['x-per-page'])
        setLanguages(data)
        setPagination(totalPages)
        setHeader(headers)
      })
      .catch( err => {
        console.log(err)
        setFlash({ variant: 'danger', msg: err.response.data.errors[0] })
      })
  }

  const addLanguage = (language) => {
    axios.post(`/api/users/${user.id}/languages`, { language })
      .then(res => {
        const { data, headers } = res
        setLanguages([...languages, data])
        setHeader(headers)
        setFlash({ variant: 'success', msg: 'Language Created!' })
      })
      .catch( err => {
        console.log(err)
        setFlash({ variant: 'danger', msg: 'field ' + err.response.data.errors.name[0] })
      })
  }

  const editLanguage = (id, language) => {
    axios.put(`/api/users/${user.id}/languages/${id}`, { language })
      .then( res => {
        const { data, headers } = res
        const newUpdatedLanguages = languages.map( l => {
          if (l.id === id) {
            return data
          }
          return l
        })
        setLanguages(newUpdatedLanguages)
        setHeader(headers)
        setFlash({ variant: 'success', msg: 'Language Updated!' })
      })
      .catch( err => {
        console.log(err)
        setFlash({ variant: 'danger', msg: err.response.data.errors[0] })
      })
  }

  const deleteLanguage = (id) => {
    axios.delete(`/api/users/${user.id}/languages/${id}`)
      .then(res => {
        const { data, headers } = res
        setLanguages(languages.filter( l => l.id !== id ))
        setHeader(headers)
        setFlash({ variant: 'success', msg: 'Language Deleted!' })
      })
      .catch( err => {
        console.log(err)
        setFlash({ variant: 'danger', msg: err.response.data.errors[0] })
      })
  }
 
  return (
    <LanguageContext.Provider value={{
      languages,
      pagination,
      headers,
      flash,
      setFlash,
      getLanguages,
      addLanguage,
      editLanguage,
      deleteLanguage,
    }}>
      { children }
    </LanguageContext.Provider>
  )
}

const ConnectedLanguageProvider = (props) => (
  <AuthConsumer>
    { value => <LanguageProvider {...value} {...props} />}
  </AuthConsumer>
)

export default ConnectedLanguageProvider;