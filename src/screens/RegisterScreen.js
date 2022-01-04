import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import FormContainer from '../components/FormContainer'
import { register } from '../actions/userActions'
import {Web3} from 'web3'
import {getPublicKey,web3} from './LoginScreen'
import MetamaskAlertScreen from './MetamaskAlertScreen'



function RegisterScreen({ location, history }) {

    const [public_key, setPublickey] = useState('')
    const [email, setEmail] = useState('')
    const [username, setUsername] = useState('')
    const [message, setMessage] = useState('')
    const [metamaskInstalled,setMetamaskInstalled] = useState(true)

    const dispatch = useDispatch()

    window.onload= getPublicKey()

    const redirect = location.search ? location.search.split('=')[1] : '/'

    const userRegister = useSelector(state => state.userRegister)
    const { error, loading, userInfo } = userRegister

    useEffect(() => {
        if (userInfo) {
            history.push(redirect)
        }
    }, [history, userInfo, redirect])

    const submitHandler = (e) => {
        e.preventDefault()
        const public_address=document.getElementById('public_key').value
        try
        {
            if (!web3.utils.isAddress(public_address)) {
                setMessage('Invalid ethereum address..')
            } else {
                dispatch(register(public_address, email, username))
            }
        }
        catch
        {
            setMetamaskInstalled(false)
        }
    }

    return (
        <FormContainer>
            {message && <Message variant='danger'>{message}</Message>}
            {error && <Message variant='danger'>{error}</Message>}
            {loading && <Loader />}
            {! metamaskInstalled ? (<MetamaskAlertScreen/>) :
            (<FormContainer>
            <h1>Sign In</h1>
            <Form onSubmit={submitHandler}>

                <Form.Group controlId='username'>
                    <Form.Label>Username</Form.Label>
                    <Form.Control
                        required
                        type='username'
                        placeholder='Enter username..'
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    >
                    </Form.Control>
                </Form.Group>

                <Form.Group controlId='public_key'>
                    <Form.Label>Public Key</Form.Label>
                    <Form.Control
                        required
                        type='public_key'
                        placeholder='Enter ethereum public key..'
                        value={public_key}
                        onChange={(e) => setPublickey(e.target.value)}
                    >
                    </Form.Control>
                </Form.Group>

                <Form.Group controlId='email'>
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                        required
                        type='email'
                        placeholder='Enter email address..'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    >
                    </Form.Control>
                </Form.Group>

                <Button type='submit' variant='primary'>
                    Register
                </Button>

            </Form>

            <Row className='py-3'>
                <Col>
                    Have an Account? <Link
                        to={redirect ? `/login?redirect=${redirect}` : '/login'}>
                        Sign In
                        </Link>
                </Col>
            </Row>
            </FormContainer >)}
        </FormContainer >
    )
}

export default RegisterScreen