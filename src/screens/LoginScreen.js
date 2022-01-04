import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import FormContainer from '../components/FormContainer'
import { login } from '../actions/userActions'
import MetamaskAlertScreen from './MetamaskAlertScreen'
// import {getPublicKey,sign_message,generateNonce} from '../metamask'
import $ from "jquery";
const Web3 = require("web3");

export var metamaskInstalled = true
export let web3;

export const getPublicKey = function()
{
  metamaskEnabled.then(
  () =>  
    {
      getMetamaskAccounts();
    }
  )
  .catch(
  () =>
    {
        metamaskInstalled = false
    }
  )
}

const generateNonce = function() 
{
  var text = "";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  for(var i = 0; i < 100; i++) 
  {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return web3.utils.sha3(text);
}

const metamaskEnabled = new Promise((resolve, reject) =>
{
  if (window.ethereum) 
  {
    web3 = new Web3(window.ethereum);
    window.ethereum.enable()
    .then(resolve())
    .catch(reject())
  }
  else
  {
    reject();
  }
});


function getMetamaskAccounts()
{
    web3.eth.getAccounts(
    (err, res) =>
    {
        if (err)
        {
            window.alert('Could not retrieve Metamask Account !!')
        }
        else
        {
            if (res.length > 0 )
            {
                const public_address=res[0]
                $("#public_key").val(public_address)
            }
            else
            {
                metamaskInstalled = false
            }
        }
    })
}



function LoginScreen({ location, history }) {
    const [public_key, setPublickey] = useState('')
    const dispatch = useDispatch()

    const redirect = location.search ? location.search.split('=')[1] : '/'

    const userLogin = useSelector(state => state.userLogin)
    const { error, loading, userInfo } = userLogin

    useEffect(() => {
        if (userInfo) {
            history.push(redirect)
        }
    }, [history, userInfo, redirect])

    const submitHandler = async(public_address) => {
        dispatch(login(public_address))
    }

    window.onload= getPublicKey()

    const metamaskLogin = (e) =>
    {
        e.preventDefault()
        try
        {
            const nonce = generateNonce()
            const public_address= document.getElementById('public_key').value
            sign_message(nonce,public_address)
        }
        catch
        {
            metamaskInstalled = false
        }
    }

    function validate_user(public_address, validation_address)
    {
        if (public_address.toLowerCase()===validation_address)
        {
            submitHandler(public_address)
        }
        else
        {
            window.alert("Authentication Failed !!")
        }
    }

    function recover_address(nonce, signature, public_address)
    {
        web3.eth.personal.ecRecover(nonce, signature,
        (err,result) =>
        {
            if (err)
            {
                window.alert('Failed to verify.. try again later..')
            }
            else
            {
                const validation_address=result
                validate_user(public_address, validation_address);
            }
        })
    }

    function sign_message(nonce,public_address)
    {
        web3.eth.personal.sign(nonce,public_address,
        (err,result) =>
        {
            if (err)
            {
                window.alert('Failed to sign message!!')
            }
            else
            {
                const signature=result
                recover_address(nonce,signature,public_address);
            }
        })
    }


    return (
            <FormContainer>
            {error && <Message variant='danger'>{error}</Message>}
            {loading && <Loader />}
            {!metamaskInstalled ? (<MetamaskAlertScreen/>) :
            (<FormContainer>
            <h1>Sign In</h1>
            <Form onSubmit={metamaskLogin}>

                <Form.Group controlId='public_key'>
                    <Form.Label>Public Key</Form.Label>
                    <Form.Control
                        type='public_key'
                        placeholder='Enter ethereum public key'
                        value={public_key}
                        onChange={(e) => setPublickey(e.target.value)}
                    >
                    </Form.Control>
                </Form.Group>
                
                <Button type='submit' variant='primary'>
                    Sign In
                </Button>
            </Form>
            <Row className='py-3'>
                <Col>
                    New Customer? <Link
                        to={redirect ? `/register?redirect=${redirect}` : '/register'}>
                        Register
                        </Link>
                </Col>
            </Row>
            </FormContainer>) 
            }
        </FormContainer>
    )
}

export default LoginScreen